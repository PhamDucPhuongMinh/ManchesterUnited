import axiosInstance from "..";

const playersAPI = (filter?: string, page?: string) => {
  const data: { filter?: string; page?: string } = {};
  if (filter) {
    data.filter = filter;
  }
  if (page) {
    data.page = page;
  }
  return axiosInstance.post("/players", data);
};

export default playersAPI;
