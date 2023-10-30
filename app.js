require('dotenv').config();
require('express-async-errors');

const port = process.env.PORT || 9000;

//connecting db
const dbConnect = require('./db/connect');

const express = require('express');
const app = express();

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

//router access
const router = require('./routes/product');

//middleware
app.use(express.json());

// routes
app.get('/', (req, res) => {
  res.send('<h1>store api </h1><a href="/api/v1/products">products route</a>');
});

// router.get('/yo/yo');
// router.get('/api/v1/products');
app.use('/api/v1/products', router);

// router.get('/');
// app.get('/api/v1/products', (req, res) => {});
// app.post('/api/v1/products', (req, res) => {});

//product routes
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await dbConnect(process.env.MONGO_URI);
    console.log(`db connected`);
    app.listen(port, () => {
      console.log(`server is listening at port : ${port}`);
    });
  } catch (error) {
    // throw new Error(error);
    console.log(`cann't connect`);
  }
};
start();
