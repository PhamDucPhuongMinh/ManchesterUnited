import pool from "../../configs/connectDB";

const updateTrophyController = async (req, res) => {
  try {
    const { Id, Name, TrophyImage, Summary, Description, WinnerTeamImage } =
      req.body;
    if (
      !Id ||
      !Name ||
      !TrophyImage ||
      !Summary ||
      !Description ||
      !WinnerTeamImage
    ) {
      res.status(200).json({
        result: false,
        msg: "You have not entered data or the data is incorrect.",
      });
    } else {
      // check trophy is existed
      const [checkTrophyExist] = await pool.execute(
        "SELECT * FROM Trophies WHERE Name = ? AND Id != ?",
        [Name, Id]
      );
      if (checkTrophyExist.length > 0) {
        res.status(200).json({
          result: false,
          msg: `${Name} trophy already exists.`,
        });
      } else {
        const resultUpdateTrophy = await pool.execute(
          "UPDATE Trophies SET Name=?, TrophyImage=?, Summary=?, Description=?, WinnerTeamImage=? WHERE Id = ?",
          [Name, TrophyImage, Summary, Description, WinnerTeamImage, Id]
        );
        res.status(200).json({
          result: true,
          msg: "Successfully updated trophy.",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(200).json({
      result: false,
      msg: "System error. Please try again.",
    });
  }
};

export default updateTrophyController;
