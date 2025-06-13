import React from 'react';
import { useLoaderData } from 'react-router';

const ManageMyFoods = () => {
    const data = useLoaderData()
    console.log(data)
    
    return (
        // <div>
        //   {
        //     data.map(singleData => <p>{singleData.name}</p>)
        //   }
        // </div>
         <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Manage My Foods</h1>
            
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* Table Header */}
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-3 px-4 text-left">Food Image</th>
                            <th className="py-3 px-4 text-left">Food Name</th>
                            <th className="py-3 px-4 text-left">Quantity</th>
                            <th className="py-3 px-4 text-left">Location</th>
                            <th className="py-3 px-4 text-left">Expiry Date</th>
                            <th className="py-3 px-4 text-left">Status</th>
                            <th className="py-3 px-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    
                    {/* Table Body */}
                    <tbody>
                        {foods.map(food => (
                            <tr key={food._id} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-4 px-4">
                                    <img 
                                        src={food.foodImage} 
                                        alt={food.foodName} 
                                        className="w-16 h-16 object-cover rounded"
                                        onError={(e) => e.target.src = '/placeholder-food.jpg'}
                                    />
                                </td>
                                <td className="py-4 px-4 font-medium">{food.foodName}</td>
                                <td className="py-4 px-4">{food.quantity}</td>
                                <td className="py-4 px-4">{food.pickupLocation}</td>
                                <td className="py-4 px-4">{new Date(food.expiredDateTime).toLocaleDateString()}</td>
                                <td className="py-4 px-4">
                                    <span className={`px-3 py-1 rounded-full text-sm ${
                                        food.foodStatus === 'available' 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-amber-100 text-amber-800'
                                    }`}>
                                        {food.foodStatus}
                                    </span>
                                </td>
                                <td className="py-4 px-4 flex space-x-2">
                                    <button 
                                        className="btn btn-sm btn-outline btn-primary"
                                        onClick={() => handleUpdate(food._id)}
                                    >
                                        Update
                                    </button>
                                    <button 
                                        className="btn btn-sm btn-outline btn-error"
                                        onClick={() => handleDelete(food._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageMyFoods;