import jwt from "jsonwebtoken";
import pool from "../configs/connectDB";

const detailPlayerController = async (req, res) => {
  const { Id } = req.body;
  if (!Id) {
    res.status(200).json({
      result: false,
      msg: "Bạn chưa nhập dữ liệu hoặc dữ liệu không đúng.",
    });
  }
  try {
    const getDetailPlayer = await pool.execute(
      "SELECT * FROM Players WHERE Id=?",
      [Id]
    );
  } catch (error) {
    console.log(error);
    res.status(200).json({
      result: false,
      msg: "Lỗi hệ thống. Vui lòng thử lại.",
    });
  }
};

export default detailPlayerController;
