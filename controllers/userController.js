const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SalesUsers } = require("../models/models");

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
      const token = generateJwt(id);
      return res.json({ token });
    } catch (e) {
      next(ApiError.badRequest(e.massage));
    }
  }
  async signin(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await SalesUsers.findOne({ where: { email } });
      if (!user) {
        return next(ApiError.internal("Пользователь не найден"));
      }
      let comparePassword = bcrypt.compareSync(password, user.password);
      if (!comparePassword) {
        return next(ApiError.internal("Неверный пароль"));
      }
      const token = generateJwt(id);
      return res.json({ token });
    } catch (e) {
      next(ApiError.badRequest(e.massage));
    }
  }

  async userCheck(req, res, next) {
    const user = req.user;
    try {
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.ACCES_TOKEN_SECRET,
        {
          expiresIn: "24h",
        }
      );
      return res.json({ token });
    } catch (e) {
      next(ApiError.badRequest(e.massage));
    }
  }
}

module.exports = new UserController();
