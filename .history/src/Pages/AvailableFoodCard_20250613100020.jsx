import React from 'react';

const AvailableFoodCard = ({food}) => {
    const {name, foodUrl, quantity, location, notes, dateTime} = food;
    return (
        <div className="card bg-base-100 w-96 shadow-sm">
  <figure>
    <img
      src={foodUrl}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{name}</h2>
    <p>{notes}</p>
    <p>{location}</p>
    <p>{quantity}</p>
    <p>{dateTime}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">View Details</button>
    </div>
  </div>
</div>
    );
};

export default AvailableFoodCard;