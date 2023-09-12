import axiosInstance from "..";

const trophiesAPI = () => {
  return axiosInstance.post("/trophies");
};

export default trophiesAPI;
