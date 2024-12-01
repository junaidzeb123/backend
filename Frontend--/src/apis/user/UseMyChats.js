import axios from "axios";


export const useMyChats = async (accessToken) => {
    const URL = `${import.meta.env.VITE_BACKEND}/user/chatUsers`;

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