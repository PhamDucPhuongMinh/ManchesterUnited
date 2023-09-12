import pool from "../../configs/connectDB";

const handleCheckData = (
  Id,
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
  if (!Id || isNaN(Number(Id))) {
    return false;
  }
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
  if (CleanSheets && isNaN(Number(CleanSheets))) {
    return false;
  }
  if (Aperrances && isNaN(Number(Aperrances))) {
    return false;
  }
  return true;
};

const updatePlayerController = async (req, res) => {
  try {
    const {
      Id,
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
        Id,
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
          "SELECT * FROM Players WHERE ShirtNumber = ? AND Id != ?",
          [ShirtNumber, Id]
        );
        if (checkShirtNumber.length > 0) {
          return res.status(200).json({
            result: false,
            msg: `Shirt number ${ShirtNumber} belong to ${checkShirtNumber[0].Name}`,
          });
        }
      }
      // update player to database
      const resultUpdatePlayer = await pool.execute(
        "UPDATE Players SET Name=?, Nation=?, DoB=?, DoJoining=?, DoDebuting=?, DebutMatch=?, Position=?, Avatar=?, ShirtNumber=?, Goals=?, CleanSheets=?, Aperrances=? WHERE Id = ?",
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
          Id,
        ]
      );
      res.status(200).json({
        result: true,
        msg: "Successfully updated player.",
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

export default updatePlayerController;
