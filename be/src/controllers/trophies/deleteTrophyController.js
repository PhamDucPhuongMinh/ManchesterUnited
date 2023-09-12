import pool from "../../configs/connectDB";

const deleteTrophyController = async (req, res) => {
  try {
    const { Id } = req.body;
    if (!Id) {
      res.status(200).json({
        result: false,
        msg: "You have not entered data or the data is incorrect.",
      });
    } else {
      const deleteTrophy = await pool.execute(
        "DELETE FROM Trophies WHERE Id=?",
        [Id]
      );
      res.status(200).json({
        result: true,
        msg: "Successfully deleted trophy.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(200).json({
      result: false,
      msg: "System error. Please try again.",
    });
  }
};

export default deleteTrophyController;
