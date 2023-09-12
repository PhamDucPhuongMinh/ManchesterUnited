import { createSlice } from "@reduxjs/toolkit";
import { PlayerType, TrophyType } from "../../types";

export interface DataType {
  isShowCreatePlayerForm: boolean;
  updatePlayerFormData: PlayerType | null;
  updateTrophyFormData: TrophyType | null;
}

const initialState: DataType = {
  isShowCreatePlayerForm: false,
  updatePlayerFormData: null,
  updateTrophyFormData: null,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setShowCreatePlayerForm: (state, action: { payload: boolean }) => {
      state.isShowCreatePlayerForm = action.payload;
    },
    setUpdatePlayerFormData: (
      state,
      action: { payload: PlayerType | null }
    ) => {
      state.updatePlayerFormData = action.payload;
    },
    setUpdateTrophyFormData: (
      state,
      action: { payload: TrophyType | null }
    ) => {
      state.updateTrophyFormData = action.payload;
    },
  },
});

export const {
  setShowCreatePlayerForm,
  setUpdatePlayerFormData,
  setUpdateTrophyFormData,
} = adminSlice.actions;

export default adminSlice.reducer;
