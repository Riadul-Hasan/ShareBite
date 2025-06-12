import React from 'react';

const FeatureCard = ({food}) => {
    const {foodImage, foodName, additionalNotes, donorEmail, expiredDateTime} = food
    return (
        <div className="card bg-base-100  shadow-sm">
  <figure>
    <img
      src={foodImage}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="text-xl">{foodName}</h2>
    <p>{additionalNotes}</p>
    <p>{donorEmail}</p>
    <p>{expiredDateTime}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">View Details</button>
    </div>
  </div>
</div>
    );
};

export default FeatureCard;