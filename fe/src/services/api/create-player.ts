import axiosInstance from "..";
import { tokenLocalStorage } from "../../utils";

interface FormValuesType {
  Avatar: string;
  DoB: number;
  DoJoining: number;
  DoDebuting: number;
  DebutMatch: string | null;
  Name: string;
  Nation: string;
  Position: string;
  ShirtNumber: number | null;
}

const createPlayerAPI = (data: FormValuesType) => {
  return axiosInstance.post("/create-player", data, {
    headers: {
      MU_Token: localStorage.getItem(tokenLocalStorage),
    },
  });
};

export default createPlayerAPI;
