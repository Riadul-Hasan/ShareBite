import React from 'react';

const AvailableFoodCard = ({food}) => {
    const {name, foodUrl, quantity, location, notes, dateTime} = food;
    return (
<div className="card bg-white w-96 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">

  <figure className="relative h-48 overflow-hidden">
    <img
      src={foodUrl || '/placeholder-food.jpg'}
      alt={name}
      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
      onError={(e) => e.target.src = '/placeholder-food.jpg'}
    />

    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
      <h2 className="text-xl font-bold text-white">{name}</h2>
    </div>

    <div className="absolute top-4 right-4 bg-amber-500 text-white font-bold px-3 py-1 rounded-full text-sm shadow-md">
      {quantity} available
    </div>
  </figure>


  <div className="p-5 space-y-3">
    {/* Food Details */}
    <div className="flex items-center text-sm text-gray-600">
      <span className="font-medium mr-2">📍</span>
      <span>{location}</span>
    </div>
    
    <div className="flex items-center text-sm text-gray-600">
      <span className="font-medium mr-2">⏱️</span>
      <span>Expires: {new Date(dateTime).toLocaleDateString()}</span>
    </div>

    {notes && (
      <p className="text-sm text-gray-700 line-clamp-2">
        <span className="font-medium">🍴</span> {notes}
      </p>
    )}

    <div className="card-actions justify-end pt-3">
      <button className="btn btn-primary rounded-full px-6 bg-amber-500 border-amber-500 hover:bg-amber-600 text-white">
        View Details
      </button>
    </div>
  </div>
</div>
    );
};

export default AvailableFoodCard;