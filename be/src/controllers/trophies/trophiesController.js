import pool from "../../configs/connectDB";

const trophiesController = async (req, res) => {
  try {
    const [resultGetPlayers] = await pool.execute("SELECT * FROM Trophies");
    res.status(200).json({
      result: true,
      data: resultGetPlayers,
      msg: "Success",
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({
      result: false,
      msg: "System error. Please try again.",
    });
  }
};

export default trophiesController;
