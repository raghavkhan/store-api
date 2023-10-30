const notFoundMiddleware = (req, res) => {
  console.log('NOT-FOUND-MIDDLWARE');
  res.status(404).send(`route doesn't exist`);
};

module.exports = notFoundMiddleware;

// const notFound = (req, res, next) => {
//   console.log('NOT-FOUND-MIDDLWARE');
//   console.log('not reached me ');
//   // next();
//   return res.status(404).send(`route doesn't exist`);
// const customError = new Error('This error is created by raghav!');
// throw customError;
// };

// module.exports = notFound;
