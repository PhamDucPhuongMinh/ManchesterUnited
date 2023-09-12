import axiosInstance from "..";

const checkAdminAPI = (token: string) => {
  return axiosInstance.post("/check-admin", null, {
    headers: {
      MU_Token: token,
    },
  });
};

export default checkAdminAPI;
