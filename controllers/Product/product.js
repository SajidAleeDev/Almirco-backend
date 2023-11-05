import { APP_URL } from "../../config/index.js";
import { Product } from "../../models/index.js";
import CustomErrorHandler from "../../services/CustomErrorHandler.js";
import { handleMultipartData } from "../../services/multer.js";
import JioSchema from "../../validators/Jio.js";
import fs from "fs";

const productController = {
  async store(req, res, next) {
    handleMultipartData(req, res, async (err) => {
      if (err) {
        return next(CustomErrorHandler.serverError(err.message));
      }

      const filePath = req.file.path;

      const { error } = JioSchema.productSchema.validate(req.body);
      if (error) {
        fs.unlink(`${appRoot}/${filePath}`, (err) => {
          if (err) {
            return next(CustomErrorHandler.serverError(err.message));
          }
        });

        return next(error);
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

export default productController;
