export const errorHandler = (err, req, res, next) => {
  console.error(`Error was : ${err} and the stack was : ${err.stack}`);
  res.status(500).send('An error has occurred');
  next();
};
