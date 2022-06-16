const Order = require("../models/orderModel");
class orders {
  async getAllOrders(req, res) {
    let orders;
    try {
      orders = await Order.find({ userId: req.query.id });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
    res.status(200).json({ message: orders });
  }

  async getOrder(req, res) {
    const id = req.params.id;
    let order;
    try {
      order = await Order.findOne({ userId: id });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
    res.status(200).json({ message: order });
  }

  async deleteOrder(req, res) {
    const id = req.params.id;
    let order;
    try {
      order = await Order.deleteOne({ _id: id });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
    res.status(200).json({ message: order });
  }

  async addOrder(req, res) {
    let order;
    try {
      order = await Order.create(req.body);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
    res.status(200).json({ message: "złożono zamówienie" });
  }

  async editOrder(req, res) {
    const order = req.body;
    const status = order.status;
    const id = req.params.id;
    try {
      const updateResult = await Order.updateOne(
        { _id: id },
        {
          status: status,
        }
      );
      res.status(200).json({ message: updateResult, auth: true });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Internal Server error Occured", auth: false });
    }
  }
}

module.exports = new orders();
