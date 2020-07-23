require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {
  const sql = `
    select "name",
          "price",
          "image",
          "shortDescription",
          "productId"
      from "products"
  `;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/products/:productId', (req, res, next) => {
  const id = req.params.productId;
  const sql = `
    select *
      from "products"
    where "productId" = $1
  `;
  const params = [id];
  db.query(sql, params)
    .then(result => {
      if (result.rows.length < 1) {
        next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
      } else {
        res.json(result.rows[0]);
      }
    })
    .catch(err => next(err));
});

app.get('/api/cart', (req, res, next) => {
  res.json({});
});

app.post('/api/cart', (req, res, next) => {
  if (!req.body.productId || req.body.productId <= 0) {
    return res.status(400).json({ error: 'invalid productId or no productId given' });
  }

  const sql = `
    select "price"
      from "products"
    where "productId" = $1
  `;

  const sql2 = `
    insert into "carts" ("cartId", "createdAt")
      values (default, default)
    returning "cartId"
  `;

  // const sql3 = `
  //   insert into "cartItems" ("cartId", "productId", "price")
  //     values ($1, $2, $3)
  //   returning "cartItemId"
  // `;

  const params = [parseInt(req.body.productId)];
  db.query(sql, params)
    .then(result => {
      if (result.rows.length < 1) {
        throw new ClientError('no products matching product id', 400);
      } else {
        return db.query(sql2)
          .then(result2 => { return { cartId: result2.rows[0].cartId, price: result.rows[0].price }; });
      }
    })
    .then(data => {
      // req.session.cartId = data.cartId;
      // return db.query(sql3)
      //   .then(result2 => { return { cartId: result2.rows[0].cartId, price: result.rows[0].price }; });
      // eslint-disable-next-line no-console
      console.log(data);
    })
    .catch(err => next(err));

});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
