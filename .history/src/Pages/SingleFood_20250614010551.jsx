import React, { use } from 'react';
import { useLoaderData } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';

const SingleFood = () => {
    const singleFood = useLoaderData()
    const {user} = use(AuthContext)
    const {name, foodUrl, quantity, location, notes, dateTime, foodStatus, donorName, donorEmail}= singleFood
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
<div className="text-center py-6">
  <button 
    className="btn btn-primary px-8 py-3 text-lg"
    onClick={() => document.getElementById('request_modal').showModal()}
  >
    Request Food
  </button>
  
  <dialog id="request_modal" className="modal">
    <div className="modal-box w-11/12 max-w-2xl">
      <h3 className="font-bold text-2xl mb-6 text-gray-800">Food Request Form</h3>
      
      <div className="space-y-4">
        {/* Food Image Preview */}
        <div className="flex justify-center">
          <img 
            src={foodUrl} 
            alt={name} 
            className="h-32 object-cover rounded-lg"
          />
        </div>
        
        {/* Non-editable fields in two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">
              <span className="label-text font-medium">Food Name</span>
            </label>
            <input 
              type="text" 
              value={name} 
              readOnly 
              className="input input-bordered w-full bg-gray-50"
            />
          </div>
          
          <div>
            <label className="label">
              <span className="label-text font-medium">Quantity</span>
            </label>
            <input 
              type="text" 
              value={quantity} 
              readOnly 
              className="input input-bordered w-full bg-gray-50"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">
              <span className="label-text font-medium">Pickup Location</span>
            </label>
            <input 
              type="text" 
              value={location} 
              readOnly 
              className="input input-bordered w-full bg-gray-50"
            />
          </div>
          
          <div>
            <label className="label">
              <span className="label-text font-medium">Expiry Date</span>
            </label>
            <input 
              type="text" 
              value={new Date(dateTime).toLocaleDateString()} 
              readOnly 
              className="input input-bordered w-full bg-gray-50"
            />
          </div>
          {/* request date or current */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Expiry Date</span>
            </label>
            <input 
              type="text" 
              value={new Date().toLocaleDateString()} 
              readOnly 
              className="input input-bordered w-full bg-gray-50"
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text font-medium">Donor Name</span>
            </label>
            <input 
              type="text" 
              value={donorName} 
              readOnly 
              className="input input-bordered w-full bg-gray-50"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">
              <span className="label-text font-medium">Donor Email</span>
            </label>
            <input 
              type="text" 
              value={donorEmail} 
              readOnly 
              className="input input-bordered w-full bg-gray-50"
            />
          </div>
          
          <div>
            <label className="label">
              <span className="label-text font-medium">Your Email</span>
            </label>
            <input 
              type="text" 
              value={user?.email} 
              readOnly 
              className="input input-bordered w-full bg-gray-50"
            />
          </div>
        </div>

        {/* Editable Additional Notes */}
        <div>
          <label className="label">
            <span className="label-text font-medium">Additional Notes</span>
          </label>
          <textarea 
            className="textarea textarea-bordered w-full" 
            placeholder="Any special requests or pickup instructions"
          />
        </div>
      </div>

      <div className="modal-action mt-6">
        <form method="dialog" className="flex gap-3">
          <button className="btn btn-ghost">Cancel</button>
          <button className="btn btn-primary px-6">
            Submit Request
          </button>
        </form>
      </div>
    </div>
    
    {/* Click outside to close */}
    <form method="dialog" className="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</div>
</div>
</div>
    );
};

export default SingleFood;