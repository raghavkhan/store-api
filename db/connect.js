const mongoose = require('mongoose');

const dbConnect = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  });
};

module.exports = dbConnect;
