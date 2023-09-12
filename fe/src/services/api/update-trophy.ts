import axiosInstance from "..";
import { tokenLocalStorage } from "../../utils";

interface DataType {
  Id: number;
  Name: string;
  TrophyImage: string;
  Summary: string;
  Description: string;
  WinnerTeamImage: string;
}

const updateTrophyAPI = (data: DataType) => {
  return axiosInstance.post("/update-trophy", data, {
    headers: {
      MU_Token: localStorage.getItem(tokenLocalStorage),
    },
  });
};

export default updateTrophyAPI;
