require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const forumRoutes = require("./src/routes/forumRoutes");
const feedbackRoutes = require("./src/routes/feedbackRoutes");


const app = express();

// CORS
app.use(
  cors({
    origin: [process.env.CLIENT_URL || "http://localhost:9000"],
    credentials: true,
  })
);


// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/forum", forumRoutes);

// Sync database
sequelize
  .sync({ force: false })
  .then(() => console.log("Database terhubung"))
  .catch((err) => {
  console.error("Gagal terhubung ke database:", err);
  console.log("Cek DB_HOST:", process.env.DB_HOST);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});


console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_NAME:", process.env.DB_NAME);
