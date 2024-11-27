import axios from "axios";

// Define useOnLogin as a normal async function that handles login
export const useOnLogin = async (data) => {
  try {
    console.log("Login data: ", data);
    const response = await axios.post("http://localhost:3001/auth/login", data);
    console.log("Response: ", response.data);
    return response.data; // return the response if needed
  } catch (error) {
    console.error("Login error: ", error);
    throw error; // rethrow the error for error handling in your component
  }
};
