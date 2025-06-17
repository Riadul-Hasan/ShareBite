import React, { use, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';

const SingleFood = () => {
    const singleFood = useLoaderData();
    const { user } = use(AuthContext);
    const navigate = useNavigate()
    const { _id, name, foodUrl, quantity, location, notes, dateTime, foodStatus, donorName, email } = singleFood;
    const [additionalNotes, setAdditionalNotes] = useState('');

    const handleRequest = (e) => {
        e.preventDefault();
        const requestData = {
            foodId: _id,
            foodName: name,
            foodImage: foodUrl,
            quantity,
            pickupLocation: location,
            expireDate: dateTime,
            email,
            donorName,
            requesterEmail: user.email,
            requestDate: new Date().toISOString(),
            additionalNotes,
            foodStatus: 'requested'
        };
        console.log("Request Data:", requestData);
        document.getElementById('request_modal').close();

          // api req
                fetch("https://food-sharing-server-khaki.vercel.app/myRequest", {
                  method: "POST", 
                  headers: {
                    "content-type": "application/json"
                  },
                  body: JSON.stringify(requestData)
                })
               .then(result => result.json())
               .then(data =>{
                // console.log(data)
                 if (data.insertedId) {
                            Swal.fire({
                                title: "Food Successfully added",
                                icon: "success",
                                draggable: true
                            });
                            navigate("/myFoodRequest")
                        }
               })
    };

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
                <button 
                    className="btn btn-primary px-8 py-3 text-lg"
                    onClick={() => document.getElementById('request_modal').showModal()}
                    disabled={foodStatus !== 'available'}
                >
                    {foodStatus === 'available' ? 'Request Food' : 'Already Requested'}
                </button>
                
                <dialog id="request_modal" className="modal">
                    <div className="modal-box w-11/12 max-w-2xl">
                        <h3 className="font-bold text-2xl mb-6 text-gray-800">Food Request Form</h3>
                        
                        <form onSubmit={handleRequest}>
                            <div className="space-y-4">
                                <div className="flex justify-center">
                                    <img 
                                        src={foodUrl} 
                                        alt={name} 
                                        className="h-32 object-cover rounded-lg"
                                    />
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="label">
                                            <span className="label-text font-medium">Food Name</span>
                                        </label>
                                        <input 
                                            type="text" 
                                            name="foodName"
                                            defaultValue={name} 
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
                                            name="quantity"
                                            defaultValue={quantity} 
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
                                            name="pickupLocation"
                                            defaultValue={location} 
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
                                            name="expireDate"
                                            defaultValue={new Date(dateTime).toLocaleDateString()} 
                                            readOnly 
                                            className="input input-bordered w-full bg-gray-50"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="label">
                                            <span className="label-text font-medium">Request Date</span>
                                        </label>
                                        <input 
                                            type="text" 
                                            name="requestDate"
                                            defaultValue={new Date().toLocaleDateString()} 
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
                                            name="donorName"
                                            defaultValue={donorName} 
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
                                            name="email"
                                            defaultValue={email} 
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
                                            name="requesterEmail"
                                            defaultValue={user?.email} 
                                            readOnly 
                                            className="input input-bordered w-full bg-gray-50"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text font-medium">Additional Notes</span>
                                    </label>
                                    <textarea 
                                        name="additionalNotes"
                                        value={additionalNotes}
                                        onChange={(e) => setAdditionalNotes(e.target.value)}
                                        className="textarea textarea-bordered w-full" 
                                        placeholder="Any special requests or pickup instructions"
                                    />
                                </div>
                            </div>

                            <div className="modal-action mt-6">
                                <button 
                                    type="button"
                                    className="btn btn-ghost"
                                    onClick={() => document.getElementById('request_modal').close()}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn rounded-full px-6 bg-gradient-to-r from-amber-500 to-amber-600 border-none hover:from-amber-600 hover:to-amber-700 text-white ">
                                    Submit Request
                                </button>
                            </div>
                        </form>
                    </div>
                    
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </div>
        </div>
    );
};

export default SingleFood;