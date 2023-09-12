import pool from "../../configs/connectDB";

const deletePlayerController = async (req, res) => {
  const { Id } = req.body;
  if (!Id) {
    res.status(200).json({
      result: false,
      msg: "You have not entered data or the data is incorrect.",
    });
  } else {
    try {
      const deletePlayer = await pool.execute(
        "DELETE FROM Players WHERE Id=?",
        [Id]
      );
      res.status(200).json({
        result: true,
        msg: "Successfully deleted player.",
      });
    } catch (error) {
      console.log(error);
      res.status(200).json({
        result: false,
        msg: "System error. Please try again.",
      });
    }
  }
};

export default deletePlayerController;
