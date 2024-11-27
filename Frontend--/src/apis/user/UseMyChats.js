import axios from "axios";


export const useMyChats = async (accessToken) => {
    const URL = "http://localhost:3001/user/chatUsers";

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