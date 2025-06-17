import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';


const MyFoodRequest = () => {

     const { user } = use(AuthContext)

    const [myRequest, setMyRequest] = useState([])

    useEffect(() => {
        fetch(`https://food-sharing-server-khaki.vercel.app/myFoodRequest?requesterEmail=${user.email}`)
            .then(res => res.json())
            .then(data => setMyRequest(data))
    }, [user])


    return (
        <div>
            My food request
        </div>
    );
};

export default MyFoodRequest;