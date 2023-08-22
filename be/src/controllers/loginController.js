import jwt from "jsonwebtoken";

const userInfoController = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(200).json({
      result: false,
      msg: "Bạn chưa nhập dữ liệu hoặc dữ liệu không đúng.",
    });
  }
  if (username === "admin" && password === "admin") {
    var token = jwt.sign({ username: "admin" }, process.env.PRIVATE_KEY);
    res.status(200).json({
      result: true,
      msg: "Đăng nhập thành công.",
      data: {
        token,
      },
    });
  } else {
    res.status(200).json({
      result: false,
      msg: "Tên đăng nhập hoặc mật khẩu không đúng.",
    });
  }
};

export default userInfoController;
