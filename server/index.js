const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./config/database");
const formRoutes = require("./routes/formRoutes");

const app = express();
app.use(bodyParser.json());
app.use(cors());

sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });

app.use("/api", formRoutes);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
