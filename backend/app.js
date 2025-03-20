require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const connectToDB = require("./database/userDB");
const userRouter = require("./routes/userRouter");
const errorMiddleware = require("./middlewares/errorMiddleware");
const authRouter = require("./routes/authRouter");

const app = express();

const PORT = process.env.PORT || 2000;
const ENV = process.env.ENV;

app.use(
  cors({
    origin: ["http://localhost:5173", "*"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("App started working");
});

app.listen(PORT, () => {
  console.log(`App started working in ${PORT} in ${ENV} environment`);
  connectToDB();
});
