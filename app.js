const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const logoutRoute = require("./routes/logoutRoute");
const authRoutes = require("./routes/authRoutes");

const cors = require("cors");
dotenv.config({ path: "./config.env" });
const app = express();

const dbURI = process.env.DATABASE;
const port = process.env.PORT || 5000;

// let corsOptions = {
//   origin: ["http://localhost:5500", "http://localhost:3000"],
// };

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

mongoose
  .connect(dbURI)
  .then((result) => {
    app.listen(port);
    console.log("connected to mongodb and listening at port 5000");
  })
  .catch((err) => console.error(err));

app.use(userRoutes);
app.use(adminRoutes);
app.use(logoutRoute);
app.use(authRoutes);

if (process.env.NODE_ENV == "production") {
  app.use(express.static("Client/build"));
  const path = require("path");
  app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "Client", "build", "index.html"));
  });
}
