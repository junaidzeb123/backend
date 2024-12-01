import axios from "axios";


export const useAllUsers = async (accessToken) => {
    const URL = `${import.meta.env.VITE_BACKEND}/user/allUser`;

    try {
        const response = await axios.get(URL, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }

};