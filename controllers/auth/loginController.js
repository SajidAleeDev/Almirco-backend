import { RefreshToken, User } from "../../models/index.js";
import JioSchema from "../../validators/Jio.js";
import CustomErrorHandler from "../../services/CustomErrorHandler.js";
import bcrypt from "bcrypt";
import jwtService from "../../services/JwtService.js";
import { JWT_REFRESH_SECRET } from "../../config/index.js";

const loginController = {
  async login(req, res, next) {
    const { error } = JioSchema.login.validate(req.body);
    if (error) {
      return next(error);
    }
    try {
      const user = await User.findOne({ email: req.body.email });

      if (!user) {
        return next(CustomErrorHandler.wrongCredentials());
      }
      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) {
        return next(CustomErrorHandler.wrongCredentials());
      }
      const access_token = jwtService.sign({ _id: user._id, role: user.role });
      const refresh_token = jwtService.sign(
        { _id: user._id, role: user.role },
        "1y",
        JWT_REFRESH_SECRET
      );
      await RefreshToken.create({ token: refresh_token });
      res.json({ access_token, refresh_token });
    } catch (err) {
      return next(err);
    }
  },
  async logout(req, res, next) {
    const { error } = JioSchema.refresh.validate(req.body);

    if (error) {
      return next(error);
    }

    try {
      await RefreshToken.deleteOne({ token: req.body.refresh_token });
    } catch (err) {
      return next(new Error("Something went wrong in the database"));
    }
    res.json({
      message: "Logout successful",
    });
  },
};

export default loginController;
