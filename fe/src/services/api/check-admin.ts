import apiUrl from "..";

const checkAdminAPI = async (token: string) => {
  try {
    const api = await fetch(`${apiUrl}/check-admin`, {
      method: "POST",
      headers: {
        MU_Token: token,
      },
    });
    return api.json();
  } catch (error) {
    console.log(error);
    return { result: false };
  }
};

export default checkAdminAPI;
