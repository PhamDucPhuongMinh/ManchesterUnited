import axiosInstance from "..";
import { tokenLocalStorage } from "../../utils";

const deletePlayerAPI = (Id: number) => {
  return axiosInstance.post(
    "/delete-player",
    {
      Id,
    },
    {
      headers: {
        MU_Token: localStorage.getItem(tokenLocalStorage),
      },
    }
  );
};

export default deletePlayerAPI;
