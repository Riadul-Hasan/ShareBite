import React from 'react';
import { useLoaderData } from 'react-router';

const SingleFood = () => {
    const singleFood = useLoaderData()
    const {name, foodUrl, quantity, location, notes, dateTime, foodStatus}= singleFood
    console.log(singleFood)
    return (
        <div>
            single food details
        </div>
    );
};

export default SingleFood;