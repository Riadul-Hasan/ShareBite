import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router";
import AvailableFoodCard from "./AvailableFoodCard";
import { MdOutlineEventAvailable, MdSearch } from "react-icons/md";

const AvailableFoods = () => {
  const initialData = useLoaderData();
  const [data, setData] = useState(initialData);
  const [displayData, setDisplayData] = useState(initialData);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  // Apply both search and sort whenever dependencies change
  useEffect(() => {
    let results = [...initialData];
    
    // Apply search filter
    if (searchTerm.trim()) {
      results = results.filter(food => 
        food.foodName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply sorting
    results.sort((a, b) => {
      const dateOfA = new Date(a.dateTime);
      const dateOfB = new Date(b.dateTime);
      return sortOrder === "asc" ? dateOfA - dateOfB : dateOfB - dateOfA;
    });
    
    setDisplayData(results);
  }, [initialData, searchTerm, sortOrder]);

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="py-10">
      <section className="mb-10">
        <div className="flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-amber-50 to-orange-50 p-4 md:p-16 lg:p-18 gap-4">
          <div>
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <MdOutlineEventAvailable />Available Foods
            </h2>
            <p className="mt-4 text-center md:text-left text-amber-700/80 max-w-2xl">
              Discover fresh meals shared by your community. Sort to find what
              needs to be claimed soonest.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search by food name..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <MdSearch className="absolute left-3 top-3 text-amber-500" />
            </div>

            <button
              onClick={handleSort}
              className="btn bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl border-none"
            >
              Sort by Expiry:{" "}
              {sortOrder === "asc" ? "Oldest First" : "Newest First"}
            </button>
          </div>
        </div>
      </section>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayData.map((food) => (
          <AvailableFoodCard key={food._id} food={food} />
        ))}
      </div>
    </div>
  );
};

export default AvailableFoods;