import axios from "axios";

export const useOnLogin = async (data) => {
  try {
    const response = await axios.post("http://localhost:3001/auth/login", data);
    console.log("Response: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Login error: ", error);
    throw error; 
  }
};
