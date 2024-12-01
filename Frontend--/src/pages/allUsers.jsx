
import React, { useContext, useEffect, useState } from 'react';
import AllChatsBox from '../components/AllUsersBox';
import { AuthContext } from '../Context/AuthProvider';
import LoadingComponents from '../components/LoadingComponent';
import { useAllUsers } from '../apis/user/UseAllUsers';

function UserList() {

    const { accessToken } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

    const [model, isModel] = useState(false);

    useEffect(() => {

        const res = useAllUsers(accessToken)
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
                    <AllChatsBox data={data} />
                }
            </div>
        </div>
    );
}


export default UserList;