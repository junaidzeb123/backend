import axios from "axios";

export const useCreateChat = async (accessToken,username) => {
    try {
        const URL = `${import.meta.env.VITE_BACKEND}/user/personalchat?user=${username}`;
        const response = await axios.post(URL,{},{
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
