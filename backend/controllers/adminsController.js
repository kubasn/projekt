const bcrypt = require("bcrypt");
const Admin = require("../models/adminModel");

class admins {
  async getAdmin(req, res) {
    const id = req.params.id;
    let myAdmin;
    try {
      myAdmin = await Admin.findOne({ _id: id });
      console.log(myAdmin);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
    res.status(201).json(myAdmin);
  }

  async registerAdmin(req, res) {
    const saltRounds = 10;
    try {
      const hashedPwd = await bcrypt.hash(req.body.password, saltRounds);
      const insertResult = await Admin.collection.insertOne(
        {
          login: req.body.login,
          password: hashedPwd,
        },
        { unigue: true }
      );
      res.status(200).json({ message: insertResult, auth: true });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Internal Server error Occured", auth: false });
    }
  }
  async LoginAdmin(req, res) {
    try {
      const admin = await Admin.findOne({ login: req.body.login });

      if (admin) {
        const cmp = await bcrypt.compare(req.body.password, admin.password);
        if (cmp) {
          res.status(200).json({
            message: admin,
            auth: true,
          });
        } else {
          res
            .status(404)
            .json({ message: "Zły login bądź hasło.", auth: false });
        }
      } else {
        res.status(404).json({ message: "Zły login bądź hasło.", auth: false });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Internal Server error Occured", auth: false });
    }
  }
}

module.exports = new admins();
