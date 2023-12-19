import api from "./api";
import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();
const app = express();
// hi
app.use(helmet());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

app.use("/api", api);

const PORT = process.env.PORT || 4000;
app.listen(PORT, function () {
  console.log("Runing at " + PORT);
});
