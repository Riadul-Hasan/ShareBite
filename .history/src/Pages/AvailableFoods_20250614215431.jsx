import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router";
import AvailableFoodCard from "./AvailableFoodCard";
import { MdOutlineEventAvailable, MdSearch } from "react-icons/md";

const AvailableFoods = () => {
  const initialData = useLoaderData();
  const [displayData, setDisplayData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [debugInfo, setDebugInfo] = useState("");

  useEffect(() => {
    // Initialize displayData with initialData
    if (initialData && initialData.length > 0) {
      setDisplayData([...initialData]);
      setDebugInfo(`Loaded ${initialData.length} items initially`);
    } else {
      setDebugInfo("No initial data loaded");
    }
  }, [initialData]);

  useEffect(() => {
    if (!initialData || initialData.length === 0) {
      setDebugInfo("No data available to search");
      return;
    }

    let results = [...initialData];
    let debugMessage = "";
    
    // Apply search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      debugMessage += `Searching for: "${searchLower}"\n`;
      
      results = results.filter(food => {
        if (!food || !food.foodName) {
          debugMessage += `Found item with missing foodName: ${JSON.stringify(food)}\n`;
          return false;
        }

        const foodNameLower = food.foodName.toLowerCase();
        const isMatch = foodNameLower.includes(searchLower);
        
        debugMessage += `Checking "${foodNameLower}" - ${isMatch ? "MATCH" : "no match"}\n`;
        return isMatch;
      });
    }
    
    // Apply sorting
    results.sort((a, b) => {
      const dateA = a?.dateTime ? new Date(a.dateTime) : new Date(0);
      const dateB = b?.dateTime ? new Date(b.dateTime) : new Date(0);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
    
    setDisplayData(results);
    setDebugInfo(prev => prev + "\n" + debugMessage + `Found ${results.length} matches`);
  }, [initialData, searchTerm, sortOrder]);

  const handleSort = () => {
    setSortOrder(prev => prev === "asc" ? "desc" : "asc");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (!initialData || initialData.length === 0) {
    return <div className="py-10 text-center">No available foods found</div>;
  }

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

      {/* Debug information - remove in production */}
      <div className="bg-gray-100 p-4 mb-6 rounded-lg text-xs whitespace-pre-wrap">
        <h3 className="font-bold mb-2">Debug Information:</h3>
        {debugInfo || "No debug information yet"}
      </div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayData.length > 0 ? (
          displayData.map((food) => (
            <AvailableFoodCard key={food._id} food={food} />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-lg text-gray-600">
              {searchTerm ? `No foods found matching "${searchTerm}"` : "No available foods"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableFoods;