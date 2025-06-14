import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router";
import AvailableFoodCard from "./AvailableFoodCard";
import { MdOutlineEventAvailable, MdSearch } from "react-icons/md";

const AvailableFoods = () => {
  const initialData = useLoaderData();
  const [displayData, setDisplayData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (initialData && initialData.length > 0) {
      setDisplayData([...initialData]);
    }
  }, [initialData]);

  useEffect(() => {
    if (!initialData || initialData.length === 0) return;

    let results = [...initialData];
    
    // Improved search that handles more cases
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      results = results.filter(food => {
        if (!food || !food.foodName) return false;
        
        // Check different variations of the food name
        const foodNameLower = food.foodName.toLowerCase();
        return (
          foodNameLower.includes(searchLower) || // "apple juice" matches "apple juice"
          foodNameLower.startsWith(searchLower) || // "app" matches "apple juice"
          foodNameLower.split(' ').some(word => word.startsWith(searchLower)) // "juice" matches "apple juice"
        );
      });
    }
    
    // Sorting
    results.sort((a, b) => {
      const dateA = a?.dateTime ? new Date(a.dateTime) : new Date(0);
      const dateB = b?.dateTime ? new Date(b.dateTime) : new Date(0);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
    
    setDisplayData(results);
  }, [initialData, searchTerm, sortOrder]);

  // ... rest of your component code remains the same ...

  return (
    <div className="py-10">
      {/* ... other JSX ... */}
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
            {/* Debug output - remove in production */}
            {searchTerm && (
              <div className="mt-4 text-sm text-gray-500">
                <p>Searching for: "{searchTerm}"</p>
                <p>Available food names: {initialData.map(f => f.foodName).join(', ')}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableFoods;