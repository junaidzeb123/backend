import axios from "axios";

export const creatGroupChat = async (accessToken, users, chatName, pic) => {
    try {
        const URL = `${import.meta.env.VITE_BACKEND_URL}/user/groupChat`;
        const response = await axios.post(URL, {
            users,
            chatName,
            pic
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
