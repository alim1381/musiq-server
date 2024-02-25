const express = require("express");
const authController = require("./src/controllers/auth.controller");
const app = express();
require("dotenv").config();

// graphql server setup
require("./src/configs/graphql.config").config(app);

// db connection
require("./src/configs/db.config").dbConnection();

//  Serve static files from the `public` folder
app.use(express.static("public"));

// json in body
app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`listen in port ${process.env.PORT}`);
});
