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

<div className='text-center py-6'>
    {/* You can open the modal using document.getElementById('ID').showModal() method */}
<button className="btn btn-secondary " onClick={()=>document.getElementById('my_modal_4').showModal()}>Request</button>
<dialog id="request_modal" className="modal">
  <div className="modal-box w-11/12 max-w-2xl">
    <h3 className="font-bold text-xl mb-6">Request This Food</h3>
    
    <div className="space-y-4">
      {/* Non-editable fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="label">
            <span className="label-text">Food Name</span>
          </label>
          <input 
            type="text" 
            value={name} 
            readOnly 
            className="input input-bordered w-full bg-gray-100"
          />
        </div>
        
        <div>
          <label className="label">
            <span className="label-text">Donator Name</span>
          </label>
          <input 
            type="text" 
            
            readOnly 
            className="input input-bordered w-full bg-gray-100"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="label">
            <span className="label-text">Pickup Location</span>
          </label>
          <input 
            type="text" 
            value={location} 
            readOnly 
            className="input input-bordered w-full bg-gray-100"
          />
        </div>
        
        <div>
          <label className="label">
            <span className="label-text">Expire Date</span>
          </label>
          <input 
            type="text" 
            value={new Date(dateTime).toLocaleDateString()} 
            readOnly 
            className="input input-bordered w-full bg-gray-100"
          />
        </div>
      </div>

      {/* Editable notes field */}
      <div>
        <label className="label">
          <span className="label-text">Additional Notes</span>
        </label>
        <textarea 
          value={notes} 
          onChange={(e) => setNotes(e.target.value)}
          className="textarea textarea-bordered w-full"
          placeholder="Any special requests or instructions"
        />
      </div>
    </div>

    <div className="modal-action mt-6">
      <form method="dialog" className="space-x-3">
        <button className="btn btn-ghost">Cancel</button>
        <button 
          className="btn btn-primary"
          onClick={handleRequest}
        >
          Submit Request
        </button>
      </form>
    </div>
  </div>
</dialog>
</div>
</div>
    );
};

export default SingleFood;