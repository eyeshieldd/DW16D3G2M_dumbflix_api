const jwt = require("jsonwebtoken");
const { user } = require('../models');

exports.middleware = (req, res, next) => {
  let header, token;

  if (
    !(header = req.header("Authorization")) ||
    !(token = header.replace("Bearer ", ""))
  )
    return res.status(401).send({ message: "Access denied!" });

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);

    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send({ message: "Invalid token" });
  }
};

exports.authAdmin = async (req, res, next) => {
  try {
    const User = await user.findOne({
      where: {
        id: req.user.id
      }
    });
    console.log(User)
    if (User.role !== 1)
      return res.status(400).send({ message: 'Invalid Operation' });

    next();
  } catch (error) {
    res.status(400).send({ message: 'Invalid token' });
  }
};
