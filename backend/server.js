const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const offersRouter = require("./routes/offersRouter");
const userRouter = require("./routes/usersRouter");
const ordersRouter = require("./routes/ordersRouter");
const adminsRouter = require("./routes/adminsRouter");
require("dotenv").config();
app.use(cors());
app.use(express.json());
const port = 4000;

app.use("/api/offers", offersRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/admins", adminsRouter);

app.listen(process.env.PORT || port, () => {
  console.log(`server is running ... port ${port}`);
});

mongoose.connect(process.env.database_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
