import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import initRoutes from "./routes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

initRoutes(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
