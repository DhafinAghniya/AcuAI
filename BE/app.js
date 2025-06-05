require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");

const app = express();

// CORS
app.use(
  cors({
    origin: "http://localhost:9000",
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Sync database
sequelize
  .sync({ force: false })
  .then(() => console.log("Database terhubung"))
  .catch((err) => console.error("Gagal terhubung ke database:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
