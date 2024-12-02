import React, { useContext, useState, useSyncExternalStore } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import { creatGroupChat } from '../apis/chat/CreatGroupChat';
import axios, { AxiosError } from 'axios';
import LoadingComponents from "../components/LoadingComponent";


function GroupOverlay({ setIsModelOpen, users }) {

    const { accessToken } = useContext(AuthContext);
    const [selectedUser, setSelectedUsers] = useState([]);
    const { user } = useContext(AuthContext);
    const [groupName, setgroupName] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [preview, setPreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setProfilePic(file);
        const filePreview = URL.createObjectURL(file);
        setPreview(filePreview);
    };

    const onChangeHanlder = (event) => {
        const { value } = event.target;
        setgroupName(value);
    }

    const handleUserSelection = (userName, checked) => {
        if (checked) {
            setSelectedUsers([...selectedUser, userName]);
        } else {
            setSelectedUsers(selectedUser.filter(user => user !== userName));
        }
    }

    const submitHandler = async function (event) {
        event.preventDefault();
        if (groupName == "") {
            alert("Group Name can't be empty");
        } else if (selectedUser.length == 0) {
            alert("You must select atlreast one member.");
        } else if (!profilePic || profilePic == "") {
            alert("Please Upload group Pic.");

        } else {
            try {
                const data = new FormData();
                data.append("file", profilePic);
                data.append("upload_preset", "chatAppp");

                setIsLoading(true);
                const url = await axios.post("https://api.cloudinary.com/v1_1/demcb2nh0/image/upload", data)

                setIsLoading(false)
                console.log("uploaded to cloundinary", url, data);

                setIsLoading(true);
                await creatGroupChat(accessToken, selectedUser, groupName, url.data.url);
                setIsLoading(false)
                setIsModelOpen(false)
            } catch (error) {
                if (error instanceof AxiosError) alert(error.response.data.message)
                else alert("Some thing went wrong")
                console.log(error);

            }
        }
    }

    return (
        
        <>
            <div 
                id="crud-modal" tabIndex="1" aria-hidden="true" className="hide-scrollbar flex overflow-y-auto overflow-x-hidden fixed justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full" style={{
                    zIndex: 9999,
                    position: 'fixed',
                }}>
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow">
                        <div className="bg-gray-300 flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Create New Group
                            </h3>
                            <button onClick={() => setIsModelOpen(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600" data-modal-toggle="crud-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={submitHandler} className="bg-gray-300 p-4 md:p-5">
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <label htmlFor="name" className=" block mb-2 text-sm font-medium text-gray-900">Name</label>
                                    <input value={groupName} onChange={onChangeHanlder} type="text" name="name" id="name" className=" bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type Group name" required="" />
                                </div>
                            </div>

                            <label htmlFor="profilePic" className="">
                                <div className="flex flex-col items-center">
                                    {preview ? (
                                        <img
                                            src={preview}
                                            alt="Profile Preview"
                                            className="w-40 h-40 object-cover rounded-full border-2 border-gray-300 mb-4"
                                        />
                                    ) : (
                                        <div className="w-40 h-40 flex items-center justify-center bg-gray-100 rounded-full border-2 border-gray-300 mb-4">
                                            <span className="text-gray-400">No Image</span>
                                        </div>
                                    )}

                                    <input type="file" accept="image/*" id="profilePic" className="hidden" onChange={handleFileChange} />


                                </div>
                            </label>

                            {users.map((userItr) => {
                                if (userItr.userName !== user.userName) {
                                    return (
                                        <div key={userItr.id} className="bg-gray-600 text-white flex items-center justify-between mb-2 p-2 rounded hover:bg-gray-100 hover:text-gray-800">
                                            <label className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox h-5 w-5  rounded"
                                                    value={userItr.id}
                                                    checked={selectedUser.includes(userItr.id)}
                                                    onChange={(e) => handleUserSelection(userItr.id, e.target.checked)}
                                                />
                                                <span className="ml-2 text-sm ">{userItr.userName}</span>
                                            </label>
                                            <img src={userItr.pic || 'https://readymadeui.com/profile_2.webp'} className="w-8 h-8 rounded-full" />
                                        </div>
                                    );
                                }
                                return null;
                            })}

                            <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path>
                                </svg>
                                Create Group
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default GroupOverlay;
