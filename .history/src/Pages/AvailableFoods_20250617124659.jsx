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
    <div className="mb-10">
   <title>Available Foods</title>
      <section className="mb-10">
  <div className="flex flex-col sm:flex-row justify-between items-center bg-gradient-to-r from-amber-50 to-orange-50 p-4 sm:p-8 md:p-16 lg:p-18 gap-4">
    <div className="text-center sm:text-left">
      <h2 className="text-2xl md:text-3xl font-bold flex items-center justify-center sm:justify-start gap-2">
        <MdOutlineEventAvailable className="text-xl md:text-2xl" />
        Available Foods
      </h2>
      <p className="mt-2 md:mt-4 text-sm md:text-base text-center sm:text-left text-amber-700/80 max-w-2xl">
        Discover fresh meals shared by your community. Sort to find what
        needs to be claimed soonest.
      </p>
    </div>

    <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 w-full lg:w-70 mx-auto xs:w-auto">
      <button
        onClick={toggleLayout}
        className="btn bg-gradient-to-r from-amber-400 to-amber-600 hidden text-white rounded-xl border-none  lg:flex items-center justify-center gap-2 text-sm md:text-base px-3 md:px-4 py-2"
      >
        {layoutColumns === 3 ? (
          <>
            <MdViewAgenda className="text-lg" /> 2 Columns
          </>
        ) : (
          <>
            <MdGridOn className="text-lg" /> 3 Columns
          </>
        )}
      </button>
      <button
        onClick={toggleSortOrder}
        className="btn bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl border-none text-sm md:text-base px-3 md:px-4 py-2"
      >
        Sort by Expiry:{" "}
        {sortOrder === "asc" ? "Oldest First" : "Newest First"}
      </button>
    </div>
  </div>
</section>

      
      

      <div className="text-center py-6 px-4">
        <h5 className="text-lg font-semibold py-2">Search Food</h5>
  <input
    type="text"
    placeholder="Search food by name..."
    className="input w-full rounded-xl border-2 border-amber-400 hover:border-blue-400 focus:border-blue-400 focus:outline-none max-w-md bg-white"
    value={searchTerm}
    onChange={handleSearchChange}
  />
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