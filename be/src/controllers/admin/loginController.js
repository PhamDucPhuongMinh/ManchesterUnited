import jwt from "jsonwebtoken";

const userInfoController = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(200).json({
      result: false,
      msg: "You have not entered data or the data is incorrect.",
    });
  }
  if (username === "admin" && password === "admin") {
    var token = jwt.sign({ username: "admin" }, process.env.PRIVATE_KEY);
    res.status(200).json({
      result: true,
      msg: "Logged in successfully.",
      data: {
        token,
      },
    });
  } else {
    res.status(200).json({
      result: false,
      msg: "Username or password is incorrect.",
    });
  }
};

export default userInfoController;
