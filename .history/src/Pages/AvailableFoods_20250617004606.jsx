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
      {/* <section className="mb-10">
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
      </section> */}


<section className="mb-10">
  <div className="flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-amber-50 to-orange-50 p-4 md:p-16 lg:p-18 gap-4">
    <div className="md:text-left">
      <h2 className="text-3xl font-bold flex items-center justify-center md:justify-start gap-2">
        <MdOutlineEventAvailable />
        Available Foods
      </h2>
      <p className="mt-4 text-center md:text-left text-amber-700/80 max-w-2xl">
        Discover fresh meals shared by your community. Sort to find what needs to be claimed soonest.
      </p>
    </div>

    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
      <button
        onClick={toggleLayout}
        className="btn bg-gradient-to-r from-amber-400 to-amber-600 text-white rounded-xl border-none flex items-center justify-center gap-2 px-4 py-2"
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
        className="btn bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl border-none px-4 py-2"
      >
        Sort by Expiry: {sortOrder === "asc" ? "Oldest First" : "Newest First"}
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