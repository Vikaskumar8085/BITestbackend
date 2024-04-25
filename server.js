const express = require("express");
const http = require("http");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const router = require("./routers");
require("dotenv").config();
require("./config/dbconfig");

const port = process.env.PORT || 8000;
const app = express();
// middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// middleware

// api middleware
app.use("/api", router);
// api Middleware

const path = require("path");
__dirname = path.resolve();
// render deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const server = http.createServer(app);
server.listen(port, () => {
  console.log("server started", port);
});
