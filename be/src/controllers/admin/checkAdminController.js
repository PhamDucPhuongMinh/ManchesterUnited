const checkAdminController = async (req, res) => {
  res.status(200).json({
    result: true,
    msg: "success",
  });
};

export default checkAdminController;
