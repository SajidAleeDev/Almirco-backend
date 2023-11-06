const { APP_URL } = require("../../config/index.js");
const { Product } = require("../../models/index.js");
const CustomErrorHandler = require("../../services/CustomErrorHandler.js");
const { handleMultipartData } = require("../../services/multer.js");
const JioSchema = require("../../validators/Jio.js");
const fs = require("fs");

const productController = {
  async store(req, res, next) {
    handleMultipartData(req, res, async (err) => {
      if (err) {
        fs.unlink(`${appRoot}/${filePath}`, (err) => {
          return next(CustomErrorHandler.serverError(err.message));
        });
        return next(err);
      }

      const filePath = req.file.path;

      const { error } = JioSchema.productSchema.validate(req.body);
      if (error) {
        if (err) {
          return next(CustomErrorHandler.serverError(err.message));
        }
      }
      const { name, price, size } = req.body;
      let document;
      try {
        document = await Product.create({
          name,
          price,
          size,
          image: `${APP_URL}/${filePath}`,
        });
      } catch (err) {
        return next(err);
      }

      res.status(201).json(document);
    });
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
};

module.exports = productController;
