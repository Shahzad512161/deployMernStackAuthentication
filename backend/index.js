const express = require("express");
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const AuthRouter = require('./Routers/AuthRoutes');
const ProductRoutes = require('./Routers/ProductRoutes');
const ensureAuthenticated = require("./Middlewares/Auth")
require("./config/db"); // Assuming this file connects to your MongoDB database
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use('/auth', AuthRouter);
app.use('/product',ensureAuthenticated, ProductRoutes);
app.get("/ping", (req, res) => {
  res.send("server is running");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});