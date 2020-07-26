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
  const sql = `
    select "c"."cartItemId",
          "c"."price",
          "p"."productId",
          "c"."quantity",
          "p"."image",
          "p"."name",
          "p"."shortDescription"
      from "cartItems" as "c"
      join "products" as "p" using ("productId")
    where "c"."cartId" = $1
  `;
  const params = [req.session.cartId];

  if (!req.session.cartId) {
    res.json([]);
  } else {
    db.query(sql, params)
      .then(result => {
        res.json(result.rows);
      })
      .catch(err => next(err));
  }
});

// app.post('/api/cart', (req, res, next) => {
//   if (!req.body.productId || req.body.productId <= 0) {
//     return res.status(400).json({ error: 'invalid productId or no productId given' });
//   }

//   const sql = `
//     select "price"
//       from "products"
//     where "productId" = $1
//   `;

//   const sql2 = `
//     insert into "carts" ("cartId", "createdAt")
//       values (default, default)
//     returning "cartId"
//   `;

//   const sql3 = `
//     insert into "cartItems" ("cartId", "productId", "price")
//       values ($1, $2, $3)
//     returning "cartItemId"
//   `;

//   const sql4 = `
//     select "c"."cartItemId",
//         "c"."price",
//         "p"."productId",
//         "p"."image",
//         "p"."name",
//         "p"."shortDescription"
//     from "cartItems" as "c"
//     join "products" as "p" using ("productId")
//     where "c"."cartItemId" = $1
//   `;

//   const params = [parseInt(req.body.productId)];
//   db.query(sql, params)
//     .then(result => {
//       if (result.rows.length < 1) {
//         throw new ClientError('no products matching product id', 400);
//       } else {
//         if (req.session.cartId) {
//           return { cartId: req.session.cartId, price: result.rows[0].price };
//         }
//         return db.query(sql2)
//           .then(result2 => { return { cartId: result2.rows[0].cartId, price: result.rows[0].price }; });
//       }
//     })
//     .then(data => {
//       req.session.cartId = data.cartId;
//       return db.query(sql3, [data.cartId, parseInt(req.body.productId), data.price])
//         .then(result => result.rows[0]);
//     })
//     .then(data => {
//       return db.query(sql4, [data.cartItemId])
//         .then(result => res.status(201).json(result.rows[0]));
//     })
//     .catch(err => next(err));

// });

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

  const sql3 = `
    insert into "cartItems" ("cartId", "productId", "price", "quantity")
      values ($1, $2, $3, $4)
    returning "cartItemId"
  `;

  const sql4 = `
    select "c"."cartItemId",
        "c"."price",
        "c"."quantity",
        "p"."productId",
        "p"."image",
        "p"."name",
        "p"."shortDescription"
    from "cartItems" as "c"
    join "products" as "p" using ("productId")
    where "c"."cartItemId" = $1
  `;

  const params = [parseInt(req.body.productId)];
  db.query(sql, params)
    .then(result => {
      if (result.rows.length < 1) {
        throw new ClientError('no products matching product id', 400);
      } else {
        if (req.session.cartId) {
          return { cartId: req.session.cartId, price: result.rows[0].price };
        }
        return db.query(sql2)
          .then(result2 => { return { cartId: result2.rows[0].cartId, price: result.rows[0].price }; });
      }
    })
    .then(data => {
      req.session.cartId = data.cartId;
      const findQuery = `select count(*) from "cartItems"
      where "productId" = $1 and "cartId"=$2`;
      return db.query(findQuery, [parseInt(req.body.productId), req.session.cartId])
        .then(result => result.rows[0])
        .then(count => {
          if (parseInt(count.count) === 0) {
            return db.query(sql3, [data.cartId, parseInt(req.body.productId), data.price, 1])
              .then(result => result.rows[0]);
          } else {
            const incrementQuery = `update "cartItems" set "quantity" =
              quantity + $2 where "productId" = $1 and "cartId"=$3
            returning "cartItemId"`;
            return db.query(incrementQuery, [parseInt(req.body.productId), 1, req.session.cartId])
              .then(result => result.rows[0]);
          }
        });
    })
    .then(data => {
      return db.query(sql4, [data.cartItemId])
        .then(result => res.status(201).json(result.rows[0]));
    })
    .catch(err => next(err));

});

app.post('/api/orders', (req, res, next) => {
  if (!req.session.cartId || !req.body.name || !req.body.creditCard || !req.body.shippingAddress) {
    return res.status(400).json({ error: 'No items in cart or missing name, creditCard, or shippingAddress' });
  }

  const sql = `
    insert into "orders" ("cartId","name", "creditCard", "shippingAddress" )
      values ($1, $2, $3, $4)
    returning *
  `;

  const params = [req.session.cartId, req.body.name, req.body.creditCard, req.body.shippingAddress];
  db.query(sql, params)
    .then(result => {
      delete req.session.cartId;
      return res.status(201).json(result.rows[0]);
    })
    .catch(err => next(err));

});

app.delete('/api/carts/:cartItemId', (req, res, next) => {
  if (!req.session.cartId) {
    return res.status(400).json({ error: 'No cart' });
  }

  const sql = `
    delete from "cartItems"
      where "cartItemId" = $1 and "cartId" = $2
  `;
  const findQuery = `select "quantity" from "cartItems"
      where "cartItemId" = $1 and "cartId"= $2`;

  const params = [req.params.cartItemId, req.session.cartId];
  db.query(findQuery, params)
    .then(result => {
      return result.rows[0];
    }).then(data => {
      if (data.quantity > 1) {
        const decrementQuery = `update "cartItems" set "quantity" =
        quantity - $2 where "cartItemId" = $1 and "cartId" = $3
        returning "cartItemId"`;
        db.query(decrementQuery, [req.params.cartItemId, 1, req.session.cartId])
          .then(result => res.status(201).json(result.rows[0]));
      } else if (data.quantity === 1) {
        db.query(sql, params)
          .then(result => {
            return res.status(204).json(result.rows[0]);
          })
          .catch(err => next(err));
      }
    })
    .catch(err => next(err));

});

app.delete('/api/carts/all/:cartItemId', (req, res, next) => {
  if (!req.session.cartId) {
    return res.status(400).json({ error: 'No cart' });
  }

  const sql = `
    delete from "cartItems"
      where "cartItemId" = $1 and "cartId" = $2
  `;

  const params = [req.params.cartItemId, req.session.cartId];
  db.query(sql, params)
    .then(result => {
      return res.status(204).json(result.rows[0]);
    })
    .catch(err => next(err));

});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl} `, 404));
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
