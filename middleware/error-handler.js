const errorHandler = async (err, req, res, next) => {
  console.log('ERROR-HANDLER-MIDDLEWARE');
  console.log(err.message);
  return res
    .status(500)
    .json({ msg: `Something went wrong. Please try again later` });
};

// const errorHandler = (err, req, res, next) => {
//   console.log('ERROR-HANDLER-MIDDLEWARE');
//   console.log(err.message);
//   return res
//     .status(500)
//     .json({ msg: `Something went wrong. Please try again later` });
// };

module.exports = errorHandler;
