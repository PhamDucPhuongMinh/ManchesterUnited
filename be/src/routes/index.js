import express from "express";
import loginController from "../controllers/loginController";
import checkTokenMiddleware from "../middleware/checkTokenMiddleware";
import addPlayerController from "../controllers/addPlayerController";
import getPlayerController from "../controllers/getPlayersController";
import transferPlayerController from "../controllers/transferPlayerController";
import checkAdminController from "../controllers/checkAdminController";

const router = express.Router();

const initRoutes = (app) => {
  router.post("/login", loginController);
  router.post("/check-admin", checkTokenMiddleware, checkAdminController);
  router.get("/players", getPlayerController);
  router.post("/add-player", checkTokenMiddleware, addPlayerController);
  router.post(
    "/transfer-player",
    checkTokenMiddleware,
    transferPlayerController
  );

  return app.use("/", router);
};

export default initRoutes;
