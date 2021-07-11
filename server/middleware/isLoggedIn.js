const protect = (req, res, next) => {
  req.user ? next() : res.sendStatus(401);
};

module.exports = protect;
