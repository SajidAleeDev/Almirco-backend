import { User } from "../../models/index.js";
import CustomErrorHandler from "../../services/CustomErrorHandler.js";

const userController = {
  async me(req, res, next) {
    try {
      const user = await User.findOne({ _id: req.user._id }).select(
        "-password -updatedAt -__v  -createdAt"
      );
      if (!user) {
        return next(CustomErrorHandler.notFound());
      }
      res.json(user);
    } catch (err) {
      return next(err);
    }
  },
  async index(req, res, next) {
    try {
      const users = await User.find({}).select(
        "-password -updatedAt -__v -createdAt "
      );
      if (!users) {
        return next(CustomErrorHandler.notFound());
      }
      res.json(users);
    } catch (err) {
      return next(err);
    }
  },

  async ignore_user(req, res, next) {
    const { _id } = req.body;
    try {
      const user = await User.findOne({ _id: _id });
      if (!user) {
        return next(CustomErrorHandler.notFound());
      }
      user.$ignore = true;
      await user.save();
      res.json({
        message: "Now this user is not visible",
      });
    } catch (err) {
      return next(err);
    }
  },
};

export default userController;
