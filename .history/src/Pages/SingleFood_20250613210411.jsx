import React from 'react';
import { useLoaderData } from 'react-router';

const SingleFood = () => {
    const singleFood = useLoaderData()
    return (
        <div>
            single food details
        </div>
    );
};

export default SingleFood;