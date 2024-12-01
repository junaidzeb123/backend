import axios from "axios";


export const useGetChatMessages = async (accessToken, chatId) => {

    const URL = `${import.meta.env.VITE_BACKEND}/user/messages?chatId=${chatId}`;
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