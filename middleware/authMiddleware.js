const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (req, res, next) {
  console.log ("AUTHORIZATION")
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    console.log ('from verifytoken all cookies', req.cookies)
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Не авторизован" });
    };
    jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
      if(err) return res.status(401).json({ message: "Не авторизован" });
      console.log("decode", decode);
      next();
    });
    // const decoded = jwt.verify(token, process.env.SECRET_KEY);
    // req.user = decoded;
    // next();
  } catch (e) {
    return res.status(401).json({ message: "Не авторизован" });
  }
};
