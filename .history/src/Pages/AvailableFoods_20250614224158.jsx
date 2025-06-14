import React, { useState } from "react";
import { useLoaderData } from "react-router";
import AvailableFoodCard from "./AvailableFoodCard";
import { MdOutlineEventAvailable } from "react-icons/md";

const AvailableFoods = () => {
  const initialData = useLoaderData();
  const [data, setData] = useState(initialData);
  const [sortOrder, setSortOrder] = useState("asc"); 

  const handleSort = () => {
    const sortedData = [...data].sort((a, b) => {
      const dateOfA = new Date(a.dateTime);
      const dateOfB = new Date(b.dateTime);
      return sortOrder === "asc" ? dateOfA - dateOfB : dateOfB - dateOfA;
    });
    setData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="py-10">
      <section className="mb-10">
        <div className="flex justify-between items-center bg-gradient-to-r from-amber-50 to-orange-50 p-4 md:p-16 lg:p-18">
          <div>
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <MdOutlineEventAvailable />Available Foods
            </h2>
            <p className="mt-4 text-center md:text-left text-amber-700/80 max-w-2xl">
              Discover fresh meals shared by your community. Sort to find what
              needs to be claimed soonest.
            </p>
          </div>

          <button
            onClick={handleSort}
            className="btn bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl border-none"
          >
            Sort by Expiry:{" "}
            {sortOrder === "asc" ? "Oldest First" : "Newest First"}
          </button>
        </div>
      </section>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((food) => (
          <div key={food._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            {/* Food Header */}
            <div className="p-4 bg-amber-100 border-b border-amber-200">
              <h3 className="text-xl font-bold text-gray-800">{food.foodName}</h3>
              <p className="text-sm text-gray-600 mt-1">{food.quantity} available</p>
            </div>
            
            {/* Food Details */}
            <div className="p-4">
              <div className="flex items-center gap-2 text-gray-700 mb-2">
                <span className="font-medium">Location:</span>
                <span>{food.pickupLocation}</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-700 mb-2">
                <span className="font-medium">Expires:</span>
                <span className="text-amber-600">{food.expireDate}</span>
              </div>
              
              {food.additionalNotes && (
                <div className="text-gray-600 italic mt-3">
                  "{food.additionalNotes}"
                </div>
              )}
            </div>
            
            {/* View Details Button */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <button className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableFoods;