export const handleNotFound = (req, res, next) => {
  if (!req.error) {
    return res.status(404).send('Not Found');
  }

  next();
};
