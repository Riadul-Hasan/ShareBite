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

              <div className="overflow-x-auto w-4xl mx-auto">
            <table className="table w-full">
                {/* Table Header */}
                <thead>
                    <tr className="bg-gray-100">
                        <th>Image</th>
                        <th>Food Name</th>
                        <th>Quantity</th>
                        <th>Expiry Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                
                {/* Table Body */}
                <tbody>
                    {data.map(singleData => (
                        <tr key={singleData._id} className="hover:bg-gray-50">
                            {/* Food Image */}
                            <td>
                                <img 
                                    src={singleData.foodUrl} 
                                    alt={singleData.name}
                                    className="w-12 h-12 object-cover rounded"
                                    onError={(e) => e.target.src = '/placeholder-food.jpg'}
                                />
                            </td>
                            
                            {/* Food Name */}
                            <td className="font-medium">{singleData.name}</td>
                            
                            {/* Quantity */}
                            <td>{singleData.quantity}</td>
                            
                            {/* Expiry Date */}
                            <td>{new Date(singleData.dateTime).toLocaleDateString()}</td>
                            
                            {/* Action Buttons */}
                            <td>
                                <div className="flex gap-2">
                                    <button className="btn btn-xs btn-outline btn-primary">
                                        Update
                                    </button>
                                    <button className="btn btn-xs btn-outline btn-error">
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        
    );
};

export default ManageMyFoods;