const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const contactRouter = require("./src/routes/user.routes");
const connectDB = require("./src/database/connectDB");
const { frontendUrl } = require("./src/api/dotenv");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

// Allow requests only from your frontend
app.use(
  cors({
    origin: [
      "https://prabinshrestha-theta.vercel.app",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/contact", contactRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
