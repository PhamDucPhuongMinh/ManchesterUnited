import axios from "axios";
import checkAdminAPI from "./api/check-admin";
import loginAPI from "./api/login";
import playersAPI from "./api/players";
import createPlayerAPI from "./api/create-player";
import updatePlayerAPI from "./api/update-player";
import deletePlayerAPI from "./api/delete-player";
import trophiesAPI from "./api/trophies";
import createTrophyAPI from "./api/create-trophy";
import updateTrophyAPI from "./api/update-trophy";
import deleteTrophyAPI from "./api/delete-trophy";

export {
  checkAdminAPI,
  loginAPI,
  playersAPI,
  createPlayerAPI,
  deletePlayerAPI,
  updatePlayerAPI,
  trophiesAPI,
  createTrophyAPI,
  updateTrophyAPI,
  deleteTrophyAPI,
};

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
});

export default axiosInstance;
