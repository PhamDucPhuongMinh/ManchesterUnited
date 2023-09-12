import { RootState } from "./store";

// LOADING
export const getLoadingSelector = (state: RootState) => state.loading.status;

// ADMIN
export const getIsShowCreatePlayerFormSelector = (state: RootState) =>
  state.admin.isShowCreatePlayerForm;
export const getUpdatePlayerFormDataSelector = (state: RootState) =>
  state.admin.updatePlayerFormData;
export const getUpdateTrophyFormDataSelector = (state: RootState) =>
  state.admin.updateTrophyFormData;
