const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const bodyParser = require("body-parser");

const AuthRouter = require("./Routers/AuthRoutes");
const ProductRoutes = require("./Routers/ProductRoutes");
const ensureAuthenticated = require("./Middlewares/Auth");

require("./config/db"); // MongoDB connection

// CORS Configuration
const allowedOrigins = ["https://deploy-mern-stack-authentication-ui.vercel.app"];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies and headers like Authorization
  })
);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/auth", AuthRouter);
app.use("/product", ensureAuthenticated, ProductRoutes);

app.get("/ping", (req, res) => {
  res.send("Server is running");
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
