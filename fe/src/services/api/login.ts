import apiUrl from "..";

const loginAPI = async (data: { username: string; password: string }) => {
  try {
    const api = await fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ ...data }),
    });
    return api.json();
  } catch (error) {
    console.log(error);
    return { result: false };
  }
};

export default loginAPI;
