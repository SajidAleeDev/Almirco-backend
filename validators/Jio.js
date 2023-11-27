import Joi from "joi";

const JioSchema = {
  register: Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  }),
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  }),
  refresh: Joi.object({
    refresh_token: Joi.string().required(),
  }),
  productSchema: Joi.object({
    name: Joi.string().required(),
    category: Joi.string().required(),
    vandor: Joi.string().required(),
    Discount: Joi.string().required(),
    price: Joi.string().required(),
    discount_price: Joi.string().required(),
    product_tags: Joi.array()
      .items(
        Joi.object({
          tag: Joi.string().required(),
        })
      )
      .required(),
    product_description: Joi.string().required(),
    product_image: Joi.array()
      .items(
        Joi.object({
          url: Joi.string().required(),
        })
      )
      .required(),
  }),
  orderSchema: Joi.object({
    today: Joi.string().required(),
    this_month: Joi.string().required(),
    total: Joi.string().required(),
    total_orders_qty: Joi.number().required(),
    pending_orders_qty: Joi.number().required(),
    processing_orders_qty: Joi.number().required(),
    delivered_orders_qty: Joi.number().required(),
  }),
  customerSchema: Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    paymentMethod: Joi.string().required(),
    Amount: Joi.string().required(),
    OrderStatus: Joi.string()
      .required()
      .valid("Pending", "Cancelled", "Delivered"),
  }),
};

export default JioSchema;
