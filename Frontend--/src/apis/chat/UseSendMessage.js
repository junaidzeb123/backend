import axios from "axios";

export const useSendMessage = async (accessToken, chatId, text) => {
    try {
        
        const URL = `${import.meta.env.VITE_BACKEND}/user/sendMessage?chatId=${chatId}`;
        const response = await axios.post(URL, {
            text
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        }
        );
        return response.data;
    } catch (error) {
        console.error("Login error: ", error);
        throw error;
    }
};
