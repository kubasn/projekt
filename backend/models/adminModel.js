const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const AdminSchema = new mongoose.Schema({
  login: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;
