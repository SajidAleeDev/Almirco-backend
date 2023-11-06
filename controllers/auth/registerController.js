const { JWT_REFRESH_SECRET } = require("../../config/index.js");
const User = require("../../models/Users.js");
const { RefreshToken } = require("../../models/index.js");
const CustomErrorHandler = require("../../services/CustomErrorHandler.js");
const jwtService = require("../../services/JwtService.js");
const JioSchema = require("../../validators/Jio.js");
const bcrypt = require("bcrypt");

const regesterController = {
  async register(req, res, next) {
    const { error } = JioSchema.register.validate(req.body);

    if (error) {
      return next(error);
    }
    try {
      const exist = await User.exists({ email: req.body.email });
      if (exist) {
        return next(
          CustomErrorHandler.alreadyExist("This email is already taken.")
        );
      }
    } catch (err) {
      return next(err);
    }
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    let access_token;
    let refresh_token;
    try {
      const result = await user.save();
      access_token = jwtService.sign({
        _id: result._id,
        role: result.role,
      });
      refresh_token = jwtService.sign(
        {
          _id: result._id,
          role: result.role,
        },
        "1y",
        JWT_REFRESH_SECRET
      );
      await RefreshToken.create({ token: refresh_token });
    } catch (err) {
      return next(err);
    }

    return res.json({
      access_token,
      refresh_token,
    });
  },
};

module.exports = regesterController;
