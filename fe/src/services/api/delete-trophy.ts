import axiosInstance from "..";
import { tokenLocalStorage } from "../../utils";

const deleteTrophyAPI = (Id: number) => {
  return axiosInstance.post(
    "/delete-trophy",
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

export default deleteTrophyAPI;
