const express = require("express");
const morgan = require("morgan"); //morgan is a Node. js and Express middleware to log HTTP requests and errors, and simplifies the process.
const cors = require("cors");
const fileUpload = require("express-fileupload");
const app = express();
var path = require("path");
const mongoose = require("mongoose");

const consumerRouter = require("./routes/consumerRoute");
const deliveryAgentRouter = require("./routes/deliveryAgentRoute");
const shopRouter = require("./routes/shopRoute");
const employeeRouter = require("./routes/employeeRoute");
const itemRouter = require("./routes/itemRoute");

app.use(cors());
app.use(morgan("tiny"));
app.use(fileUpload());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const connectDB = require("./database/connection");

app.use("/consumer", consumerRouter);
app.use("/deliveryAgent", deliveryAgentRouter);
app.use("/shop", shopRouter);
app.use("/employee", employeeRouter);
app.use("/item", itemRouter);

const db = mongoose.connection;

db.once("open", () => {
  console.log("DB connected");
});

app.listen(5000, () =>
  connectDB()
    .then(() => console.log("Server is running in Port 5000"))
    .catch(() =>
      console.log("Server is running but database connection failed")
    )
);
