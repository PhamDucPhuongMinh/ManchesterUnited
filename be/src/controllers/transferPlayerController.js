import jwt from "jsonwebtoken";
import pool from "../configs/connectDB";

const handleCheckData = (Id, LeavingTime, LeavingTo, ExitPrice) => {
  if (!Id || isNaN(Number(Id))) {
    return false;
  }
  if (!LeavingTime || isNaN(Number(LeavingTime))) {
    return false;
  }
  if (!LeavingTo || typeof LeavingTo !== "string") {
    return false;
  }
  if (!ExitPrice || isNaN(Number(ExitPrice))) {
    return false;
  }
  return true;
};

const transferPlayerController = async (req, res) => {
  const { Id, LeavingTime, LeavingTo, ExitPrice } = req.body;
  if (!handleCheckData(Id, LeavingTime, LeavingTo, ExitPrice)) {
    res.status(200).json({
      result: false,
      msg: "Bạn chưa nhập dữ liệu hoặc dữ liệu không đúng.",
    });
  } else {
    console.log(LeavingTime, LeavingTo, ExitPrice, Id);
    try {
      const resultUpdate = await pool.execute(
        "UPDATE Players SET LeavingTime=?, LeavingTo=?, ExitPrice=?, isPlaying=false WHERE Id=?",
        [LeavingTime, LeavingTo, ExitPrice, Id]
      );
      res.status(200).json({
        result: true,
        msg: "Chuyển nhượng cầu thủ thành công.",
      });
    } catch (error) {
      console.log(error);
      res.status(200).json({
        result: false,
        msg: "Lỗi hệ thống. Vui lòng thử lại.",
      });
    }
  }
};

export default transferPlayerController;
