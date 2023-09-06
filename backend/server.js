const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");
const port = process.env.PORT || 5000;
const itemRoutes = require("./routes/itemRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const userRoutes = require("./routes/userRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");

const adminRoutes = require("./routes/adminRoutes");
const stripe = require("./routes/stripe");
const paymentRoutes = require("./routes/paymentRoute")


connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/items", itemRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes); // Use cart routes with the "/api/cart" base path
app.use("/api/users", userRoutes);

app.use("/api/review",reviewRoutes);
app.use("/api/feedback",feedbackRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/stripe",stripe);
app.use("/api/payment", paymentRoutes)




app.use("/uploads", express.static("uploads"));


app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
