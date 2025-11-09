const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const contactRouter = require("./src/routes/user.routes");
const connectDB = require("./src/database/connectDB");

const PROD_ORIGIN = process.env.BASEURL;

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

const allowedOrigins = ["http://localhost:3000", "http://localhost:5173"];

if (PROD_ORIGIN) {
  allowedOrigins.push(PROD_ORIGIN);
}

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World! API is running.");
});

app.use("/contact", contactRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});