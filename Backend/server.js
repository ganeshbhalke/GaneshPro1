const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:4200",
    "https://ganesh-pro1-kupp.vercel.app",
    "https://ganesh-pro1-2xnm.vercel.app",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

// ⭐⭐⭐ YE LINE MISSING HAI ⭐⭐⭐
app.options("*", cors(corsOptions));

app.use(express.json());

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server Running On Port ${PORT}`);
});