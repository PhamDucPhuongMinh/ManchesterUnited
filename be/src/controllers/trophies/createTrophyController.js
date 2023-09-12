import pool from "../../configs/connectDB";

const createTrophyController = async (req, res) => {
  try {
    const { Name, TrophyImage, Summary, Description, WinnerTeamImage } =
      req.body;
    if (!Name || !TrophyImage || !Summary || !Description || !WinnerTeamImage) {
      res.status(200).json({
        result: false,
        msg: "You have not entered data or the data is incorrect.",
      });
    } else {
      // check trophy is existed
      const [checkTrophyExist] = await pool.execute(
        "SELECT * FROM Trophies WHERE Name = ?",
        [Name]
      );
      if (checkTrophyExist.length > 0) {
        res.status(200).json({
          result: false,
          msg: `${Name} trophy already exists.`,
        });
      } else {
        const resultCreateTrophy = await pool.execute(
          "INSERT INTO Trophies(Name, TrophyImage, Summary, Description, WinnerTeamImage) VALUES (?,?,?,?,?)",
          [Name, TrophyImage, Summary, Description, WinnerTeamImage]
        );
        res.status(200).json({
          result: true,
          msg: "Create successful trophy.",
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

export default createTrophyController;
