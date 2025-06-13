import React from 'react';
import { useLoaderData } from 'react-router';

const SingleFood = () => {
    const singleFood = useLoaderData()
    const {name, foodUrl, quantity, location, notes, dateTime, foodStatus}= singleFood
    console.log(singleFood)
    return (
//         <div className="card bg-base-100  shadow-sm">
//   <div className="card-body">
//     <h2 className="text-3xl">{name}</h2>
//     <p>{quantity}</p>
//     <p>{location}</p>
//     <p>{notes}</p>
//     <p>Expiry date: {dateTime}</p>
//     <p>{foodStatus}</p>
//   </div>
//   <figure>
//     <img
//       src={foodUrl}
//       alt="Shoes" />
//   </figure>
// </div>

<div className="card bg-white max-w-2xl mx-auto shadow-md rounded-lg overflow-hidden">
  <figure className="h-64">
    <img
      src={foodUrl || '/placeholder-food.jpg'}
      alt={name}
      className="w-full h-full object-cover"
      onError={(e) => e.target.src = '/placeholder-food.jpg'}
    />
  </figure>
  <div className="card-body p-6 space-y-3">
    <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
    
    <div className="flex items-center gap-2">
      <span className="font-medium">Quantity:</span>
      <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-sm">
        {quantity} available
      </span>
    </div>
    
    <div className="flex items-center gap-2">
      <span className="font-medium">Location:</span>
      <span>{location}</span>
    </div>
    
    {notes && (
      <div className="bg-gray-50 p-3 rounded">
        <p className="text-gray-600">{notes}</p>
      </div>
    )}
    
    <div className="flex items-center gap-2 text-red-600">
      <span className="font-medium">Expires:</span>
      <span>{dateTime}</span>
    </div>
    
    <div className={`badge ${foodStatus === 'available' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'} mt-2`}>
      Status: {foodStatus}
    </div>
  </div>
</div>
    );
};

export default SingleFood;