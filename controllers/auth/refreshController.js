const { JWT_REFRESH_SECRET } = require("../../config/index.js");
const { RefreshToken, User } = require("../../models/index.js");
const CustomErrorHandler = require("../../services/CustomErrorHandler.js");
const jwtService = require("../../services/JwtService.js");
const JioSchema = require("../../validators/Jio.js");

const refreshController = {
  async refresh(req, res, next) {
    const { error } = JioSchema.refresh.validate(req.body);

    if (error) {
      return next(error);
    }

    let refreshtoken;
    try {
      refreshtoken = await RefreshToken.findOne({
        token: req.body.refresh_token,
      });
      if (!refreshtoken) {
        return next(CustomErrorHandler.unAuthorized("Invalid refresh token"));
      }

      let userId;
      try {
        const { _id } = await jwtService.verify(
          refreshtoken.token,
          JWT_REFRESH_SECRET
        );
        userId = _id;
      } catch (err) {
        return next(CustomErrorHandler.unAuthorized("Invalid refresh token"));
      }

      const user = await User.findOne({ _id: userId });
      if (!user) {
        return next(CustomErrorHandler.unAuthorized("No user found!"));
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
      return next(new Error("Something went wrong " + err.message));
    }
  },
};

module.exports = refreshController;
