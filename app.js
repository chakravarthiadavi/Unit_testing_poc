require("dotenv").config();
const express = require("express");

const app = express();

app.use(express.json());
// require("./config/connection").connect();

// var MongoClient = require('mongodb').MongoClient;
// const url = "mongodb://localhost:27017/demo";
// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     console.log("Database created!");
//     db.close();
//   });


const loginRoute = require("./modules/login/routes/loginRoute");
const userRoute = require("./modules/user/routes/userRoutes");
const auth = require("./middleware/auth");

app.post("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome");
});

app.use("/login", loginRoute);
app.use("/register", userRoute);

module.exports = app;