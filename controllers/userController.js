const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SalesUsers } = require("../models/models");
require('dotenv').config()

const generateJwt = (id) => {
  return jwt.sign({ id: id }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};
class UserController {
  async signup(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(ApiError.badRequest("Некоректный логин или пароль"));
      }
      const condidate = await SalesUsers.findOne({ where: { email: email } });
      if (condidate) {
        return next(
          ApiError.badRequest("Такой логин уже есть , придумайте новый")
        );
      }
      const hashedPassword = await bcrypt.hash(password, 5);
      const user = await SalesUsers.create({
        email: email,
        password: hashedPassword,
      });
      const token = generateJwt(user.id); // fixed here from "id" to "user.id"
      console.log("token", token)
      return res.json({ token });
    } catch (e) {
      next(ApiError.badRequest(e.message)); // fixed typo
    }
  }
  async signin(req, res, next) {
    try {
      console.log ("signin");
      const { email, password } = req.body;
      console.log ("email, password", email, password);
      const user = await SalesUsers.findOne({ where: { email } });
      if (!user) {
        return next(ApiError.badRequest("Пользователь не найден")); //here better badRequest
      }
      let comparePassword = bcrypt.compareSync(password, user.password);
      if (!comparePassword) {
        return next(ApiError.badRequest("Неверный пароль")); //here better badRequest
      }
      const token = generateJwt(user.id);// fixed here from "id" to "user.id"
      //set cookies
      // const cookies = new Cookies(req, res); cookies.set('token', token, { maxAge: 5 * 24 * 60 * 60 * 1000, httpOnly: true, })
      res.cookie('token', token, {
          maxAge: 5 * 24 * 60 * 60 * 1000, 
          httpOnly: true,
          sameSite: 'None',
          // secure: true,
      });
      console.log('from usersController res.cookie', res.cookie);
      return res.json({ token });
    } catch (e) {
      next(ApiError.badRequest(e.message));// fixed typo
    }
  }

  async logout(req, res) {
    try {
      console.log ("res.cookie from logout", res.cookie);
      res.cookie('token', '', {
          maxAge: -1, // Immediate expiry
          httpOnly: true,
          sameSite: 'None',
          secure: true,
      });
      return res.status(200).json({ msg: 'Logged out successfully' });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
};



}

module.exports = new UserController();
