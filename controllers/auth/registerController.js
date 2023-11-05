import { JWT_REFRESH_SECRET } from "../../config/index.js";
import User from "../../models/Users.js";
import { RefreshToken } from "../../models/index.js";
import CustomErrorHandler from "../../services/CustomErrorHandler.js";
import jwtService from "../../services/JwtService.js";
import JioSchema from "../../validators/Jio.js";
import bcrypt from "bcrypt";

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

export default regesterController;
