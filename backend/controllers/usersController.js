const User = require("../models/userModel");
const bcrypt = require("bcrypt");

class users {
  async getUser(req, res) {
    const id = req.params.id;
    let myUser;
    try {
      myUser = await User.findOne({ _id: id });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
    res.status(201).json(myUser);
  }
  async getUsers(req, res) {
    let users;
    try {
      users = await User.find();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
    res.status(201).json(users);
  }
  async editUser(req, res) {
    const saltRounds = 10;
    const id = req.params.id;
    const password = req.body.password;
    const login = req.body.login;

    try {
      if (password.length > 0) {
        const hashedPwd = await bcrypt.hash(password, saltRounds);
        const updateResult = await User.updateOne(
          { _id: id },
          {
            login: login,
            password: hashedPwd,
          }
        );
      } else {
        const updateResult = await User.updateOne(
          { _id: id },
          {
            login: login,
          }
        );
      }
      res.status(200).json({ message: "poprawiono dane", auth: true });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Internal Server error Occured", auth: false });
    }
  }

  async registerUser(req, res) {
    const saltRounds = 10;
    try {
      const hashedPwd = await bcrypt.hash(req.body.password, saltRounds);
      const insertResult = await User.collection.insertOne(
        {
          login: req.body.login,
          password: hashedPwd,
        },
        { unigue: true }
      );
      res.status(200).json({ message: insertResult, auth: true });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Błąd w rejestracji - wprowadź inny login",
        auth: false,
      });
    }
  }
  async LoginUser(req, res) {
    try {
      const user = await User.findOne({ login: req.body.login });
      if (user) {
        const cmp = await bcrypt.compare(req.body.password, user.password);
        if (cmp) {
          //   ..... further code to maintain authentication like jwt or sessions
          res.status(200).json({
            message: user,
            auth: true,
          });
        } else {
          res
            .status(404)
            .json({ message: "Zły login bądź hasło.", auth: false });
        }
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Internal Server error Occured", auth: false });
    }
  }
}

module.exports = new users();
