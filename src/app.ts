import express from "express";
import path from "path";
import bodyParser from "body-parser";
import router from "./routes/router";
import { pool } from "./db";
const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
