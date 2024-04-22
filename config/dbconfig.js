const mongoose = require("mongoose");
require("dotenv").config();

(async function () {
  try {
    return await mongoose
      .connect(
        "mongodb+srv://vikasinfosense:iYzdnYINwqRecxNJ@bitest.eslqsy0.mongodb.net/",
        {
          useNewUrlParser: true,
        }
      )
      .then(() => {
        console.log("connection established");
      });
  } catch (error) {
    message.error(error.response?.data);
  }
})();
