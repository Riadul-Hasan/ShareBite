import React, { use, useEffect, useState } from "react";
// import { Link, useLoaderData } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";
import { Link } from "react-router";

const ManageMyFoods = () => {
  // const initialData = useLoaderData();
  const {user} = use(AuthContext)
  // const [manageFood, setManageFood] = useState(initialData)
  const [myFood, setMyFood] = useState([])
  console.log(user);


  useEffect(() => {
        fetch(`http://localhost:3000/manageFoods?email=${user.email}`)
            .then(res => res.json())
            .then(data => setMyFood(data))
    }, [user])


  const handleDelete = (id) => {
        console.log(id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/addFood/${id}`, {
                    method: "DELETE",

                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Tips Deleted Successfully",
                                icon: "success"
                            });
                            // delete from ui
                            const remainingFood = myFood.filter(rem => rem._id !== id)
                            setMyFood(remainingFood)
                        }
                    })

            }
        });
    }

  return (
    <div className="bg-gradient-to-b from-orange-50 to-rose-100 min-h-[calc(100vh-250px)]  py-16">
     {myFood.length < 1 ? (
          <div className="text-center text-red-500 text-2xl p-10 bg-base-300 font-semibold py-20">
                    <p>No request added yet.</p>
                </div>
     ): (<div className="overflow-x-auto w-3/4 mx-auto pb-10 pt-4  bg-white">
      <table className="table">
        <thead>
          <tr className="bg-base-300">
            <th>Food Image </th>
            <th>Name </th>
            <th>Quantity</th>
            <th>Expiry Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {myFood.map((food) => (
            <tr key={food._id}>
              <td>
                <img
                  src={food.foodUrl}
                  className="w-12 h-12 object-cover rounded"
                 
                />
              </td>
              <td className="px-6 border border-base-300">
                <div className="flex items-center gap-3 lg:px-6 ">
                  <div className="lg:font-bold text-sm ">{food.name}</div>
                </div>
              </td>
              <td className="px-6 border border-base-300 ">{food.quantity}</td>
              <td className="px-6 border-b border-base-300">{food.dateTime}</td>
              <td className="flex gap-4 items-center p-6 px-6 border border-base-300">
                <Link to={`/updateFood/${food._id}`} className="btn btn-ghost bg-green-400  btn-xs">
                  Update
                </Link>
                <button onClick={() => handleDelete(food._id)} className="btn btn-secondary btn-xs">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>)}
     
      
    </div>
  );
};

export default ManageMyFoods;
