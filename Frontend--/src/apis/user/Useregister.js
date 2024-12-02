import axios from "axios";

export const Useregister = async (data) => {
    const URL = `${import.meta.env.VITE_BACKEND}/auth/register`;


 

    try {
       return await axios.post(URL, data);

    } catch (error) {
        throw error;
    }


};