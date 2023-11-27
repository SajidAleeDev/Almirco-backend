import JioSchema from "../../validators/Jio.js";
import { Order, Customer } from "../../models/index.js";

const DashboardOrdersController = {
  async index(req, res, next) {
    let documents;
    let documents2;

    try {
      documents = await Order.find().select("-updatedAt -__v -createdAt ");

      documents2 = await Customer.find().select("-updatedAt -__v -createdAt");
    } catch (err) {
      return next(CustomErrorHandler.serverError());
    }
    return res.json({
      orders: documents,
      customers: documents2,
    });
  },
  async order(req, res, next) {
    const { error } = JioSchema.orderSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    const {
      today,
      this_month,
      total,
      total_orders_qty,
      pending_orders_qty,
      processing_orders_qty,
      delivered_orders_qty,
    } = req.body;
    let document;
    try {
      document = await Order.create({
        today,
        this_month,
        total,
        total_orders_qty,
        pending_orders_qty,
        processing_orders_qty,
        delivered_orders_qty,
      });
    } catch (err) {
      return next(err);
    }
    res.status(201).json(document);
  },
  async customer(req, res, next) {
    const { error } = JioSchema.customerSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    const { name, phone, paymentMethod, Amount, OrderStatus } = req.body;
    let document;
    try {
      document = await Customer.create({
        name,
        phone,
        paymentMethod,
        Amount,
        OrderStatus,
      });
    } catch (err) {
      return next(err);
    }
    res.status(201).json(document);
  },
};

export default DashboardOrdersController;
