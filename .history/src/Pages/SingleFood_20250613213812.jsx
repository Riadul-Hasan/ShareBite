import React from 'react';
import { useLoaderData } from 'react-router';

const SingleFood = () => {
    const singleFood = useLoaderData()
    const {name, foodUrl, quantity, location, notes, dateTime, foodStatus}= singleFood
    console.log(singleFood)
    return (
        <div className="card bg-base-100  shadow-sm">
  <div className="card-body">
    <h2 className="text-3xl">{name}</h2>
    <p>{quantity}</p>
    <p>{location}</p>
    <p>{notes}</p>
    <p>Expiry date: {dateTime}</p>
    <p>{foodStatus}</p>
  </div>
  <figure>
    <img
      src={foodUrl}
      alt="Shoes" />
  </figure>
</div>
    );
};

export default SingleFood;