import express from "express";
import loginController from "../controllers/admin/loginController";
import checkTokenMiddleware from "../middleware/checkTokenMiddleware";
import createPlayerController from "../controllers/players/createPlayerController";
import checkAdminController from "../controllers/admin/checkAdminController";
import deletePlayerController from "../controllers/players/deletePlayerController";
import playersController from "../controllers/players/playersController";
import updatePlayerController from "../controllers/players/updatePlayerController";
import trophiesController from "../controllers/trophies/trophiesController";
import createTrophyController from "../controllers/trophies/createTrophyController";
import updateTrophyController from "../controllers/trophies/updateTrophyController";
import deleteTrophyController from "../controllers/trophies/deleteTrophyController";

const router = express.Router();

const handeSetTimeout = (req, res, next) => {
  setTimeout(() => {
    next();
  }, 1000);
};

const initRoutes = (app) => {
  router.post("/login", handeSetTimeout, loginController);
  router.post(
    "/check-admin",
    handeSetTimeout,
    checkTokenMiddleware,
    checkAdminController
  );

  // Player
  router.post("/players", handeSetTimeout, playersController);
  router.post(
    "/create-player",
    handeSetTimeout,
    checkTokenMiddleware,
    createPlayerController
  );
  router.post(
    "/update-player",
    handeSetTimeout,
    checkTokenMiddleware,
    updatePlayerController
  );
  router.post(
    "/delete-player",
    handeSetTimeout,
    checkTokenMiddleware,
    deletePlayerController
  );

  // Trophy
  router.post("/trophies", handeSetTimeout, trophiesController);
  router.post(
    "/create-trophy",
    handeSetTimeout,
    checkTokenMiddleware,
    createTrophyController
  );
  router.post(
    "/update-trophy",
    handeSetTimeout,
    checkTokenMiddleware,
    updateTrophyController
  );
  router.post(
    "/delete-trophy",
    handeSetTimeout,
    checkTokenMiddleware,
    deleteTrophyController
  );

  return app.use("/", router);
};

export default initRoutes;
