import jwt from "jsonwebtoken";
import pool from "../configs/connectDB";
// SELECT * FROM Players LIMIT 10 OFFSET 10
const getPlayerController = async (req, res) => {
  const { page, filter } = req.body;
  let pageParam = 1;
  let getPlayerIsPlaying = true;
  if (page && !isNaN(Number(page))) {
    pageParam = Number(page);
  }
  if (filter && filter === "all") {
    getPlayerIsPlaying = false;
  }
  try {
    const querySQL = getPlayerIsPlaying
      ? "SELECT Id, Name, ShirtNumber, Nation, isPlaying, Position, Avatar FROM Players WHERE isPlaying = true"
      : "SELECT Id, Name, ShirtNumber, Nation, isPlaying, Position, Avatar FROM Players";
    const [resultGetPlayer] = await pool.execute(querySQL);
    res.status(200).json({
      result: true,
      msg: "Success",
      data: resultGetPlayer,
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({
      result: false,
      msg: "Lỗi hệ thống. Vui lòng thử lại.",
    });
  }
};

export default getPlayerController;
