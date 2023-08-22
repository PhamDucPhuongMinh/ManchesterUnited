import checkAdminAPI from "./api/check-admin";
import loginAPI from "./api/login";

export { checkAdminAPI, loginAPI };

const apiUrl = process.env.REACT_APP_API_URL;
export default apiUrl;
