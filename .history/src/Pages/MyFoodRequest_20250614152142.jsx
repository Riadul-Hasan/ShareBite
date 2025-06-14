import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';


const MyFoodRequest = () => {

     const { user } = use(AuthContext)

    const [myRequest, setMyRequest] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3000/myFoodRequest?requesterEmail=${user.email}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setMyRequest(data)
            })
    }, [user])


    return (
       
        <div className='container mx-auto mb-32'>
            <title>My Food Requests</title>
            <h2 className='text-3xl  text-center font-bold py-10  dark:text-base-content'>My Food Request</h2>


            <div className="avatar flex items-center justify-center">
                <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
                    <img src={user.photoURL} />
                </div>
            </div>

            <div className="text-center py-10">
                <p><span className='text-xl font-bold text-blue-500'>Username:</span> <span className='font-semibold'>{user.displayName}</span></p>
                <p><span className='text-xl font-bold text-blue-500'>Email:</span> <span className='font-semibold'>{user.email}</span></p>
            </div>

            {myRequest.length < 1 ? (
                <div className="text-center text-red-500 text-2xl p-10 bg-base-300 font-semibold py-20">
                    <p>No tips added yet.</p>
                </div>
            ) : (
                <div className="overflow-x-auto w-3/4 mx-auto py-16">
      <table className="table">
        <thead>
          <tr className="bg-base-300">
            <th>Food Image </th>
            <th>Name </th>
            <th>Pickup Location</th>
            {/* <th>Expiry Date</th> */}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {myRequest.map((request) => (
            <tr key={request._id}>
              <td>
                <img
                  src={request.foodImage}
                  className="w-12 h-12 object-cover rounded"
                 
                />
              </td>
              <td className="px-6 border border-base-300">
                <div className="flex items-center gap-3 lg:px-6 ">
                  <div className="lg:font-bold text-sm ">{request.donorName}</div>
                </div>
              </td>
              <td className="px-6 border border-base-300 ">{request.pickupLocation}</td>
              {/* <td className="px-6 border-b border-base-300">{food.dateTime}</td> */}
              <td className="flex gap-4 items-center p-6 px-6 border border-base-300">
                {request.expireDate}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
            )}
        </div>
    );
};

export default MyFoodRequest;