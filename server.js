const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const path = require("path")
const expressLayouts = require("express-ejs-layouts")
require("dotenv").config()

const app = express()

// Import routes
const mainRoutes = require("./routes/mainRoutes")

// Set view engine
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.set("layout", "layout") // Set default layout
app.use(expressLayouts)

// Middleware
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Set default locals for all views
app.use((req, res, next) => {
  res.locals.page = "";
  next();
})

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/portfolio", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB connection error:", err))

// Routes
app.use("/", mainRoutes)

// Error handling middleware
app.use((req, res, next) => {
  res.status(404).render("404", { title: "Page Not Found" })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
