import pool from "../../configs/connectDB";

const handleCheckData = (
  Name,
  Nation,
  DoB,
  DoJoining,
  DoDebuting,
  DebutMatch,
  Position,
  Avatar,
  ShirtNumber,
  Goals,
  CleanSheets,
  Aperrances
) => {
  if (!Name || typeof Name !== "string") {
    return false;
  }
  if (!Nation || typeof Nation !== "string") {
    return false;
  }
  if (!DoB || isNaN(Number(DoB))) {
    return false;
  }
  if (!DoJoining || isNaN(Number(DoJoining))) {
    return false;
  }
  if (DoDebuting && isNaN(Number(DoDebuting))) {
    return false;
  }
  if (DebutMatch && typeof DebutMatch !== "string") {
    return false;
  }
  if (!Position || typeof Position !== "string") {
    return false;
  }
  if (
    Position !== "Goalkeeper" &&
    Position !== "Defender" &&
    Position !== "Midfielder" &&
    Position !== "Forward"
  ) {
    return false;
  }
  if (!Avatar || typeof Avatar !== "string") {
    return false;
  }
  if (ShirtNumber && isNaN(Number(ShirtNumber))) {
    return false;
  }
  if (Goals && isNaN(Number(Goals))) {
    return false;
  }
  if (CleanSheets && isNaN(Number(Goals))) {
    return false;
  }
  if (Aperrances && isNaN(Number(Aperrances))) {
    return false;
  }
  return true;
};

const createPlayerController = async (req, res) => {
  try {
    const {
      Name,
      Nation,
      DoB,
      DoJoining,
      DoDebuting,
      DebutMatch,
      Position,
      Avatar,
      ShirtNumber,
      Goals,
      CleanSheets,
      Aperrances,
    } = req.body;
    if (
      !handleCheckData(
        Name,
        Nation,
        DoB,
        DoJoining,
        DoDebuting,
        DebutMatch,
        Position,
        Avatar,
        ShirtNumber,
        Goals,
        CleanSheets,
        Aperrances
      )
    ) {
      res.status(200).json({
        result: false,
        msg: "You have not entered data or the data is incorrect.",
      });
    } else {
      // check shirt number
      if (ShirtNumber) {
        const [checkShirtNumber] = await pool.execute(
          "SELECT * FROM Players WHERE ShirtNumber = ?",
          [ShirtNumber]
        );
        if (checkShirtNumber.length > 0) {
          return res.status(200).json({
            result: false,
            msg: `Shirt number ${ShirtNumber} belongs to ${checkShirtNumber[0].Name}`,
          });
        }
      }

      // store player to database
      const resultCreatePlayer = await pool.execute(
        "INSERT INTO Players(Name, Nation, DoB, DoJoining, DoDebuting, DebutMatch, Position, Avatar, ShirtNumber, Goals, CleanSheets, Aperrances) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
        [
          Name,
          Nation,
          DoB,
          DoJoining,
          DoDebuting || null,
          DebutMatch || null,
          Position,
          Avatar,
          ShirtNumber || null,
          Goals || null,
          CleanSheets || null,
          Aperrances || null,
        ]
      );
      res.status(200).json({
        result: true,
        msg: "Create successful player.",
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

export default createPlayerController;
