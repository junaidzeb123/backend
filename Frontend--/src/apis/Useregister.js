import axios from "axios";

export const Useregister = async (data) => {
    const URL = "http://localhost:3001/auth/register";


    // const URL = "https://res.cloudinary.com/v1_1/demcb2nh0/image/upload/";
    // try {

    //     const res = await axios.post(URL, data, {
    //         headers: {
    //             "Content-Type": "multipart/form-data",
    //         }

    //     });
    //     const uploadedImageUrl = res.data.secure_url;
    //     console.log('Uploaded Image URL:', uploadedImageUrl);
    // } catch (error) {

    //     console.log(error);
    // }

    try {
       return await axios.post(URL, data);

    } catch (error) {
        throw error;
    }


};