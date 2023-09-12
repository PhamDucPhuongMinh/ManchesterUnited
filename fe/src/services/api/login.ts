import axiosInstance from "..";

const loginAPI = (data: { username: string; password: string }) => {
  return axiosInstance.post("/login", data);
};

export default loginAPI;
