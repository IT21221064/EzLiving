const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");
const port = process.env.PORT || 5000;
const itemRoutes = require("./routes/itemRoutes");

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/items", itemRoutes);

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
