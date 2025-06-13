import React from 'react';
import { useLoaderData } from 'react-router';

const ManageMyFoods = () => {
    const data = useLoaderData()
    console.log(data)
    
    return (
        <div>
           <h2>{data.name}</h2>
        </div>
    );
};

export default ManageMyFoods;