const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const { errorHandler, notFound } = require('./middleware/error.js');

// SETUP
app.use(cors()); // allows cross-origin requests
dotenv.config({ path: "./server/config/.env" }); // loads environment variables from .env file

const app = express(); // create express server
const port = process.env.PORT || 5000; 

app.use(express.urlencoded({ extended: true })); // allows us to access req.body
app.use(express.json()); // allows us to access req.body in JSON format
app.use(cookieParser("secretcode")); // allows us to access req.cookies


// DATABASE CONNECTION
const DB = process.env.MONGO_URI;

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }).then(() => {console.log("connected");})
  .catch((err) => console.log(err));
// DATABASE CONNECTION DONE

// All ROUTES
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/data", require("./routes/dataRoutes"));
app.use("/api/news", require("./routes/newsRoutes"));
app.use("/api/stock",  require("./routes/stockRoutes"));


// Error Handling middlewares 
app.use(notFound); // if no route is found then this middleware will run
app.use(errorHandler); // if any error occurs in any route 

// is for hosting a website
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/../client/build/index.html"));
  });
}

// APP
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
