import React, { useContext, useEffect, useState } from 'react';
import AllChatsBox from '../components/AllChatsBox';
import { useMyChats } from '../apis/user/UseMyChats';
import { AuthContext } from '../Context/AuthProvider';
import LoadingComponents from '../components/LoadingComponent';

function AllChats() {

    const { accessToken } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);


    useEffect(() => {

        const res = useMyChats(accessToken)
            .then((resData) => {
                console.log("response", resData);
                setIsLoading(false);
                setData(resData);
            })
            .catch((err) => {
                console.log(err, accessToken);
                setIsLoading(false);
            });

    }, [accessToken])

    return (

        <div className="border-black border-9">
            <div className=" bg-blue-100 ">
                {isLoading ? <LoadingComponents /> :


                    <AllChatsBox data={data} isAllUsersPage={true} />}
            </div>

        </div>
    );
}

export default AllChats;
