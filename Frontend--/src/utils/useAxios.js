import axios from "axios";
import jwtDecode from "jwt-decode";
import { useApp } from "../../context/AppProvider";
// import generateNewTokens from "../auth0/generateNewTokens";

const useAxios = () => {
  const { idToken, logout, saveTokens } = useApp();

  const axiosTokenInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: { auth0jwt: `Bearer ${idToken}` },
  });

  axiosTokenInstance.interceptors.request.use(
    async (config) => {
      // Extract the Authorization header and token
      const authHeader = config.headers.auth0jwt;
      const token = authHeader && authHeader.split(" ")[1];

      if (token) {
        // Decode the JWT token using jwt-decode
        const decodedToken = jwtDecode(token);

        // Check if the token is expired
        if (decodedToken.exp < Date.now() / 1000) {
          const result = await generateNewTokens(logout);
          saveTokens(result.accessToken, result.idToken);
          config.headers["auth0jwt"] = `Bearer ${result.idToken}`;

          return config;
        } else {
          return config;
        }
      } else {
        // No token present, return the original request config
        return config;
      }
    },
    (error) => {
      // Handle request errors
      return Promise.reject(error);
    }
  );

  return axiosTokenInstance;
};

export default useAxios;
