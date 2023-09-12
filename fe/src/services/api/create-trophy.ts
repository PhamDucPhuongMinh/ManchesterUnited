import axiosInstance from "..";
import { tokenLocalStorage } from "../../utils";

interface FormValuesType {
  Name: string;
  TrophyImage: string;
  Summary: string;
  Description: string;
  WinnerTeamImage: string;
}

const createTrophyAPI = (data: FormValuesType) => {
  return axiosInstance.post("/create-trophy", data, {
    headers: {
      MU_Token: localStorage.getItem(tokenLocalStorage),
    },
  });
};

export default createTrophyAPI;
