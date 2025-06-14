import React, { useState } from "react";
import { useLoaderData } from "react-router";
import AvailableFoodCard from "./AvailableFoodCard";
import { MdOutlineEventAvailable } from "react-icons/md";

const AvailableFoods = () => {
  const initialData = useLoaderData();
  const [sortOrder, setSortOrder] = useState("asc"); 
  const [searchTerm, setSearchTerm] = useState("");

  // Filter data based on search term
  const filteredData = initialData.filter(food => 
    food.foodName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Sort the filtered data
  const sortedData = [...filteredData].sort((a, b) => {
    const dateOfA = new Date(a.dateTime);
    const dateOfB = new Date(b.dateTime);
    return sortOrder === "asc" ? dateOfA - dateOfB : dateOfB - dateOfA;
  });

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

          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search foods..."
              className="px-4 py-2 rounded-lg border border-amber-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              onClick={handleSort}
              className="btn bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl border-none"
            >
              Sort: {sortOrder === "asc" ? "Oldest" : "Newest"}
            </button>
          </div>
        </div>
      </section>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedData.map((food) => (
          <AvailableFoodCard key={food._id} food={food} />
        ))}
      </div>
    </div>
  );
};

export default AvailableFoods;