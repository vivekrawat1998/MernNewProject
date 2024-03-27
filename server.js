// const dotenv = require("dotenv");
// const result = dotenv.config({ path: '../backend/config/config.env' });
// if (result.error) {
//   console.error("Error loading environment variables:", result.error);
//   process.exit(1);
// }

const express = require("express");
const connectDatabase = require("./database/database");
const authRoute = require("./routes/authRoute")
const CategoryRoutes = require("./routes/CategoryRoutes")
const ProductRoutes = require("./routes/ProductRoutes")
const cors = require("cors")
const path = require("path")
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')))

// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", CategoryRoutes);
app.use("/api/v1/product", ProductRoutes);

// Load environment variables
console.log("Environment variables loaded successfully.");

// Connect to database
connectDatabase()
  .then(() => {
    console.log("Database connected successfully.");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error.message);
    process.exit(1);
  });

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Server
const PORT = process.env.PORT || 3000; 
console.log(PORT)
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Additional middleware
app.use((req, res, next) => {
  console.log('Cookies:', req.cookies);
  next();
});
