import { Product } from "../../models/index.js";
import CustomErrorHandler from "../../services/CustomErrorHandler.js";
import JioSchema from "../../validators/Jio.js";

const productController = {
  async store(req, res, next) {
    const { error } = JioSchema.productSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    const { name, price, size, image } = req.body;
    let document;
    try {
      document = await Product.create({
        name,
        price,
        size,
        image,
      });
    } catch (err) {
      return next(err);
    }

    res.status(201).json(document);
  },
  async index(req, res, next) {
    let documents;
    // pagination mongoose-pagination
    try {
      documents = await Product.find()
        .select("-updatedAt -__v")
        .sort({ _id: -1 });
    } catch (err) {
      return next(CustomErrorHandler.serverError());
    }
    return res.json(documents);
  },

  async update(req, res, next) {
    const { error } = JioSchema.productSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    const { name, price, size, image } = req.body;
    let document;
    try {
      document = await Product.findOneAndUpdate(
        { _id: req.params.id },
        {
          name,
          price,
          size,
          image,
        },
        { new: true }
      );
    } catch (err) {
      return next(err);
    }

    res.status(201).json(document);
  },

  async search(req, res, next) {
    let documents;
    try {
      documents = await Product.find({
        $text: { $search: req.query.q },
      }).select("-updatedAt -__v");
    } catch (err) {
      return next(CustomErrorHandler.serverError());
    }
    return res.json(documents);
  },
};

export default productController;
