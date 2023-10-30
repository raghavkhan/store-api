//////////////////INFORMATION STARTS //////////////////////////////////////////////////////////////////////////
// const mongoose = require('mongoose');
// mongoose.set('strictQuery', true);
//with above mongoose.set , mongoose will filter out queries, that are not present in the schema.
// <version 6 => strictQuery was used
// >=version 6 && < version 6.0.10 => strict was used
// >=version 6.0.10 => strictQuery is used again which is by default strict
//////////////////INFORMATION ENDS //////////////////////////////////////////////////////////////////////////
//
const Product = require('../models/Product');

const getAllProductsStatic = async (req, res) => {
  console.log('getAllProductsStatic'.toUpperCase());
  // throw new Error('testing async errors');
  /// res.status(200).json({ msg: 'products testing route' });
  // const products = await Product.find({}).sort('name -price');
  // const products = await Product.find({}).select('name price');
  const products = await Product.find({ price: { $lt: 30 } })
    .sort('name -price')
    .select('name price');
  // .limit(14)
  // .skip(7);
  // const products = await Product.find({});
  res.status(200).json({ length: products.length, products });

  // const search = 'bl';
  // const products = await Product.find({
  //   name: { $regex: search, $options: 'i' },
  // });
};

const getAllProducts = async (req, res) => {
  console.log('getAllProducts'.toLocaleUpperCase());

  let { featured, company, name, sort, fields, numericFilters } = req.query; // select is used as fields
  const queryObject = {};
  if (featured) {
    queryObject['featured'] = featured === 'true' ? true : false;
  }
  if (company) {
    queryObject['company'] = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: 'i' }; // i here means case insensitive
  }
  if (numericFilters) {
    console.log(numericFilters);
    const operatorMap = {
      '>': '$gt',
      '<': '$lt',
      '>=': '$gte',
      '<=': '$lte',
      '=': '$eq',
    };
    const regEx = /\b(<|>|>=|=|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    console.log(filters);
    const options = ['price', 'rating'];
    filters = filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-');
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });

    // const numericFilterList = numericFilters.split(',');
    // const newList = numericFilterList.map((str) => {
    //   str.replace(/>/g, '$gt');
    //   str.replace(/</g, '$lt');
    //   str.replace(/>=/g, '$gte');
    //   str.replace(/<=/g, '$lte');
    // });
    // const list = newList.join(' ');
    // console.log(list);
  }

  console.log(queryObject);
  let result = Product.find(queryObject);
  // console.log('FIRST RESULT', result);//result will be Query without await we can't resolve it

  if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  } else {
    result = result.sort('createdAt');
  }

  if (fields) {
    const fieldList = fields.split(',').join(' ');
    result = result.select(fieldList);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result;

  // console.log(req.query);
  // const products = await Product.find(req.query);
  res.status(201).json({ nbHits: products.length, products });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};

// console.log(req.page);
// console.log(req.tags);
// console.log(req.numericFilters);
