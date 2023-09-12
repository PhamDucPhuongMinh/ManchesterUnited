import { createSlice } from "@reduxjs/toolkit";

export interface LoadingState {
  status: boolean;
  quantity: number;
}

const initialState: LoadingState = { status: false, quantity: 0 };

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (state, action: { payload: boolean }) => {
      if (action.payload) {
        state.status = true;
        state.quantity += 1;
      } else {
        state.quantity -= 1;
        if (state.quantity === 0) {
          state.status = false;
        }
      }
    },
  },
});

export const { setLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
