import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router";
import AvailableFoodCard from "./AvailableFoodCard";
import { MdOutlineEventAvailable, MdGridOn, MdViewAgenda } from "react-icons/md";

const AvailableFoods = () => {
  const initialData = useLoaderData();
  const [displayData, setDisplayData] = useState(initialData);
  const [sortOrder, setSortOrder] = useState("asc");
  const [layoutColumns, setLayoutColumns] = useState(3);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let processedData = [...initialData];
    // Apply search filter
    if (searchTerm.trim()) {
      processedData = processedData.filter(food =>
        food.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    processedData.sort((a, b) => {
      const dateOfA = new Date(a.dateTime);
      const dateOfB = new Date(b.dateTime);
      return sortOrder === "asc" ? dateOfA - dateOfB : dateOfB - dateOfA;
    });

    setDisplayData(processedData);
  }, [searchTerm, sortOrder, initialData]);

  const toggleLayout = () => {
    setLayoutColumns(prev => prev === 3 ? 2 : 3);
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === "asc" ? "desc" : "asc");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const gridClasses = `container mx-auto grid grid-cols-1 md:grid-cols-${
    layoutColumns === 3 ? '2 lg:grid-cols-3' : '2'
  } gap-6`;

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

          <div className="flex gap-4">
            <button
              onClick={toggleLayout}
              className="btn bg-gradient-to-r from-amber-400 to-amber-600 text-white rounded-xl border-none flex items-center gap-2"
            >
              {layoutColumns === 3 ? (
                <>
                  <MdViewAgenda /> 2 Columns
                </>
              ) : (
                <>
                  <MdGridOn /> 3 Columns
                </>
              )}
            </button>
            <button
              onClick={toggleSortOrder}
              className="btn bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl border-none"
            >
              Sort by Expiry:{" "}
              {sortOrder === "asc" ? "Oldest First" : "Newest First"}
            </button>
          </div>
        </div>
      </section>

      {/* <div className="text-center py-10 px-4">
        <input
          type="text"
          placeholder="Search food by name..."
          className="input input-bordered w-full max-w-md"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div> */}

      <div className="text-center py-10 px-4">
  <div className="relative inline-block w-full max-w-md">
    <input
      type="text"
      placeholder="Search food by name..."
      className="input input-bordered w-full pl-12 pr-4 py-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-300 transition-all duration-200 bg-white text-gray-700"
      value={searchTerm}
      onChange={handleSearchChange}
    />
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <svg 
        className="h-5 w-5 text-amber-500" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
        />
      </svg>
    </div>
    {searchTerm && (
      <button
        onClick={() => setSearchTerm('')}
        className="absolute inset-y-0 right-0 pr-3 flex items-center"
      >
        <svg 
          className="h-5 w-5 text-gray-400 hover:text-amber-600 transition-colors" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M6 18L18 6M6 6l12 12" 
          />
        </svg>
      </button>
    )}
  </div>
  {searchTerm && (
    <p className="mt-2 text-sm text-amber-600">
      Searching for: <span className="font-medium">"{searchTerm}"</span>
    </p>
  )}
</div>

      <div className={gridClasses}>
        {displayData.map((food) => (
          <AvailableFoodCard key={food._id} food={food} />
        ))}
      </div>

      {displayData.length === 0 && (
        <div className="text-center py-10">
          <p className="text-lg text-gray-500">
            {searchTerm.trim()
              ? `No foods found matching "${searchTerm}"`
              : "No available foods at the moment"}
          </p>
        </div>
      )}
    </div>
  );
};

export default AvailableFoods;