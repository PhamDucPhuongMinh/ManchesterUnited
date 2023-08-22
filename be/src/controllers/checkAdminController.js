import jwt from "jsonwebtoken";
import pool from "../configs/connectDB";

const checkAdminController = async (req, res) => {
  res.status(200).json({
    result: true,
    msg: "success",
  });
};

export default checkAdminController;
