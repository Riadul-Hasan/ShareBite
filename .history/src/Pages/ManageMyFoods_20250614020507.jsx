import React from 'react';
import { useLoaderData } from 'react-router';

const ManageMyFoods = () => {
    const data = useLoaderData()
    console.log(data)
    return (
        <div>
            Manage foods
        </div>
    );
};

export default ManageMyFoods;