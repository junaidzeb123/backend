import axios from "axios";

export const useOnLogin = async (data) => {
  try {
    console.log(import.meta.env.VITE_BACKEND);

    const response = await axios.post(`${import.meta.env.VITE_BACKEND}auth/login`, data);
    console.log("Response: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Login error: ", error);
    throw error;
  }
};
