import React from 'react';
import { useLoaderData } from 'react-router';

const MyFoodRequest = () => {
    const myRequest = useLoaderData()
    console.log(myRequest)
    return (
        <div>
            My food request
        </div>
    );
};

export default MyFoodRequest;