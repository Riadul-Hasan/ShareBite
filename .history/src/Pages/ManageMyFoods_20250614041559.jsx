import React from "react";
import { Link, useLoaderData } from "react-router";

const ManageMyFoods = () => {
  const data = useLoaderData();
  console.log(data);

  return (
    <div className="overflow-x-auto w-3/4 mx-auto py-16">
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
          {data.map((food) => (
            <tr key={food._id}>
              <td>
                <img
                  src={food.foodUrl}
                  className="w-12 h-12 object-cover rounded"
                  onError={(e) => (e.target.src = "/placeholder-food.jpg")}
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
                <Link className="btn btn-ghost bg-green-400  btn-xs">
                  Update
                </Link>
                <button className="btn btn-secondary btn-xs">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageMyFoods;
