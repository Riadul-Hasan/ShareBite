import React from 'react';
import { useLoaderData } from 'react-router';

const SingleFood = () => {
    const singleFood = useLoaderData()
    const {name, foodUrl, quantity, location, notes, dateTime, foodStatus}= singleFood
    console.log(singleFood)
    return (

<div className='py-16'>
    <div className="card bg-white max-w-2xl mx-auto shadow-md rounded-lg overflow-hidden">
  <figure className="h-64">
    <img
      src={foodUrl}
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
      <span>{new Date(dateTime).toLocaleDateString()}</span>
    </div>
    
    <div className={`badge ${foodStatus === 'available' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'} mt-2`}>
      Status: {foodStatus}
    </div>
  </div>
</div>

{/* You can open the modal using document.getElementById('ID').showModal() method */}
<button className="btn btn-secondary " onClick={()=>document.getElementById('my_modal_4').showModal()}>open modal</button>
<dialog id="my_modal_4" className="modal">
  <div className="modal-box w-11/12 max-w-5xl">
    <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">Click the button below to close</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
</div>
    );
};

export default SingleFood;