const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

//enable CORS for all domains
app.use(cors({ origin: "*" }));

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
