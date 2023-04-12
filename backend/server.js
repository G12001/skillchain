const express = require("express");
const mongoose = require("mongoose");
const AdminRoute = require("./routes/AdminRoute");
const CompanyRoute = require("./routes/CompanyRoute");
const UserRoute = require("./routes/UserRoute");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

app.use("/api/v1/admin", AdminRoute);
app.use("/api/v1/company", CompanyRoute);
app.use("/api/v1/user", UserRoute);

app.listen(process.env.PORT, () => {
  console.log("Server started on port 5000");
});
