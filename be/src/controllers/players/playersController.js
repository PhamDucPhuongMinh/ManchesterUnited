import pool from "../../configs/connectDB";

const playersController = async (req, res) => {
  try {
    const { filter } = req.body;
    let sqlQuery = "SELECT * FROM Players";
    if (filter === "legend") {
      sqlQuery = "SELECT * FROM Players WHERE ShirtNumber IS NULL";
    } else {
      sqlQuery = "SELECT * FROM Players WHERE ShirtNumber";
    }
    const [resultGetPlayers] = await pool.execute(sqlQuery);
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

export default playersController;
