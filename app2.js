require("dotenv").config({ path: "./config/config.env" });
const express = require("express");
const morgan = require("morgan");

const connectDB = require("./config/db");
const productRouter = require("./router/products");
const authRouter = require("./router/auth");
const userRouter = require("./router/users");
const orderRouter = require("./router/orders");
const formRouter = require("./router/forms");
const errorHandler = require("./controller/errors");

connectDB();
const app = express();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));

// Mount Routers
app.use("/api/v1/products", productRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/forms", formRouter);

app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server up on port ${port}...`));
