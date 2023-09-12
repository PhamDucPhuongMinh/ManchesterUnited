import axiosInstance from "..";
import { tokenLocalStorage } from "../../utils";

interface DataType {
  Id: number;
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

const updatePlayerAPI = (data: DataType) => {
  return axiosInstance.post("/update-player", data, {
    headers: {
      MU_Token: localStorage.getItem(tokenLocalStorage),
    },
  });
};

export default updatePlayerAPI;
