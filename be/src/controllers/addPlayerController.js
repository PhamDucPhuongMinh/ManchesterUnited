import jwt from "jsonwebtoken";
import pool from "../configs/connectDB";

const handleCheckData = (
  Name,
  ShirtNumber,
  Nation,
  DateOfBirth,
  JoinFrom,
  JoiningTime,
  Position,
  Avatar,
  EntryPrice
) => {
  if (!Name || typeof Name !== "string") {
    return false;
  }
  if (!Number || isNaN(Number(ShirtNumber))) {
    return false;
  }
  if (!Nation || typeof Nation !== "string") {
    return false;
  }
  if (!DateOfBirth || isNaN(Number(DateOfBirth))) {
    return false;
  }
  if (!JoinFrom || typeof JoinFrom !== "string") {
    return false;
  }
  if (!JoiningTime || isNaN(Number(JoiningTime))) {
    return false;
  }
  if (!Position || typeof Position !== "string") {
    return false;
  }
  if (!Avatar || typeof Avatar !== "string") {
    return false;
  }
  if (!EntryPrice || isNaN(Number(EntryPrice))) {
    return false;
  }
  return true;
};

const addPlayerController = async (req, res) => {
  const {
    Name,
    ShirtNumber,
    Nation,
    DateOfBirth,
    JoinFrom,
    JoiningTime,
    Position,
    Avatar,
    EntryPrice,
  } = req.body;
  if (
    !handleCheckData(
      Name,
      ShirtNumber,
      Nation,
      DateOfBirth,
      JoinFrom,
      JoiningTime,
      Position,
      Avatar,
      EntryPrice
    )
  ) {
    res.status(200).json({
      result: false,
      msg: "Bạn chưa nhập dữ liệu hoặc dữ liệu không đúng.",
    });
  } else {
    try {
      const resultAddPlayer = await pool.execute(
        "INSERT INTO Players(Name, ShirtNumber, Nation, isPlaying, JoiningTime, DateOfBirth, JoinFrom, LeavingTime, LeavingTo, Position, Avatar, EntryPrice, ExitPrice) VALUES (?,?,?,true,?,?,?,0,'',?,?,?,null)",
        [
          Name,
          ShirtNumber,
          Nation,
          JoiningTime,
          DateOfBirth,
          JoinFrom,
          Position,
          Avatar,
          EntryPrice,
        ]
      );
      res.status(200).json({
        result: true,
        msg: "Thêm cầu thủ thành công.",
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

export default addPlayerController;
