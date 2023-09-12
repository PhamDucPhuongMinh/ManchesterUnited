import jwt from "jsonwebtoken";

const checkTokenMiddleware = async (req, res, next) => {
  const token = req.headers["mu_token"];
  if (!token) {
    res.status(403).json({
      result: false,
      msg: "You do not have permission to perform this action.",
    });
  } else {
    try {
      var decoded = jwt.verify(token, process.env.PRIVATE_KEY);
      next();
    } catch (err) {
      res.status(403).json({
        result: false,
        msg: "You do not have permission to perform this action.",
      });
    }
  }
};

export default checkTokenMiddleware;
