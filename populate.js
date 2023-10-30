// require('dotenv').config()

// const connectDB = require('./db/connect')
// const Product = require('./models/product')

// const jsonProducts = require('./products.json')

// const start = async () => {
//   try {
//     await connectDB(process.env.MONGO_URI)
//     await Product.deleteMany()
//     await Product.create(jsonProducts)
//     console.log('Success!!!!')
//     process.exit(0)
//   } catch (error) {
//     console.log(error)
//     process.exit(1)
//   }
// }

// start()

require('dotenv').config();
const connectDB = require('./db/connect');
const jsonProducts = require('./products.json');
const Product = require('./models/Product');

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.create(jsonProducts);
    console.log('second connection completed');
    process.exit(0);
  } catch (error) {
    console.log(`Error connecting to the database: ${error}`);
    process.exit(1);
  }
};
start();
