# boardcart
A full stack Node.js and React.js e-commerce shopping cart app for a board shop.

## Live Site
Try the live site here: https://boardcart.brandonktran.com/

#### Desktop
<img src="server/public/gifs/desktop.gif" style="display:inline-block;" width="47%"> &nbsp; &nbsp; <img src="server/public/gifs/desktop2.gif" style="display:inline-block;" width="47%">

#### iPad
<img src="server/public/gifs/ipadLandscape.gif" style="display:inline-block;" width="47%"> &nbsp; &nbsp; <img src="server/public/gifs/ipadPortrait.gif" style="display:inline-block;" width="35%">

#### iPhone 6/7/8
<img src="server/public/gifs/iPhoneLandscape.gif" style="display:inline-block;" width="47%"> &nbsp; &nbsp; <img src="server/public/gifs/iphonePortrait.gif" style="display:inline-block;" width="35%">

## Technologies Used
React.js <br>
Node.js<br/>
Express.js<br/>
PostgresQL </br>
Bootstrap<br/>
Webpack<br/> 
Babel<br/>
HTML <br/>
CSS <br/>
AWS EC2<br/>


## Main Features
1. User can view products. <br/>
2. User can view the detail of a product. <br/>
3. User can add products to a cart. <br/>
4. User can view the products in a cart. <br/>
5. User can place an order for a cart. <br/>

<br/>
Front-end functionality and interface built with React.js. Back-end API built using Express.js and Node.js to handle client requests and data. Data stored and retrieved from PostgresQL database.


## Development
### System Requirements
Node.js 10 or higher <br>
NPM 6 or higher <br>
PostgreSQL 10 or higher <br>
Express.js 4 or higher

### Getting Started
Clone the repository.
```console
git clone https://github.com/brandonktran/boardcart.git
cd boardcart
```

Install all dependencies with NPM.
```console
npm install
```

Start PostgreSQL server
```console
sudo service postgresql start
```

Create the database
```console
createdb boardcart
```

Copy .env.example and update with your PostgresQL credentials
```console
cp .env.example .env
```

Import the schema
```console
npm run db:import
```

Start the project.
```console
npm run dev
```
Then view the application by going to http://localhost:3000 in your browser.
