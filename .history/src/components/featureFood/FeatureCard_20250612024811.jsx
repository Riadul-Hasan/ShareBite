import React from 'react';

const FeatureCard = ({food}) => {
    const {foodImage, foodName} = food
    return (
        <div className="card bg-base-100  shadow-sm">
  <figure>
    <img
      src={foodImage}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="text-xl">{foodName}</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">View Details</button>
    </div>
  </div>
</div>
    );
};

export default FeatureCard;