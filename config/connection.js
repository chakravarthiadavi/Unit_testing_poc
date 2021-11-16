const mongoose = require("mongoose");

const { MONGO_URI } = process.env;
exports.connect = () => {
  console.log("callingggggggg")

  // try {
    // Connecting to the database
    mongoose
      .connect(MONGO_URI, {
        useNewUrlParser: true
      })
      .then(() => {
        console.log("Successfully connected to database");
      })
      .catch((error) => {
        console.log("database connection failed.");
        console.error(error);
        process.exit(1);
      });
  // } catch (err) {
  //   console.log("err=====>", err);
  //   return err;
  // }

};