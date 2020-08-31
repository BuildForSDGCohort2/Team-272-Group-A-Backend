exports.errorHandler = function (res, error) {
  res.send(500).send({ error });
};
