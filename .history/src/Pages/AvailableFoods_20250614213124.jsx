
import React, { useState } from "react";
import { useLoaderData } from "react-router";
import AvailableFoodCard from "./AvailableFoodCard";
import { MdOutlineEventAvailable } from "react-icons/md";


const AvailableFoods = () => {
  const initialData = useLoaderData();
  const [data, setData] = useState(initialData);
  const [sortOrder, setSortOrder] = useState("asc"); 
  const [searchTerm, setSearchTerm] = useState('');
const [searchResults, setSearchResults] = useState([]);


const handleSearch = async () => {
  const response = await fetch(`/api/foods/search?q=${encodeURIComponent(searchTerm)}`);
  const data = await response.json();
  setSearchResults(data);
};

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

     
<input 
  type="text" 
  placeholder="Search by food name..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  onKeyUp={handleSearch} // Or add a search button
/>
      <section className="mb-10">
        <div className="flex justify-between items-center bg-gradient-to-r from-amber-50 to-orange-50  p-4 md:p-16 lg:p-18">
          <div>
            <h2 className="text-3xl font-bold flex items-center gap-2"><MdOutlineEventAvailable />Available Foods</h2>
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
          <AvailableFoodCard key={food._id} food={food} />
        ))}
      </div>
    </div>
  );
};

export default AvailableFoods;
