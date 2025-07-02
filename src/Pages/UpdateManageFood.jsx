import React, { use } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";

const UpdateManageFood = () => {
  const { user } = use(AuthContext);
  const singleFood = useLoaderData();
  const navigate = useNavigate();

  const handleUpdateFood = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const updatedTip = Object.fromEntries(formData.entries());

    // send token
    user.getIdToken().then((token) => {
      fetch(`https://food-sharing-server-khaki.vercel.app/addFood/${singleFood._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedTip),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.modifiedCount) {
            Swal.fire({
              title: "Food info Updated Successfully",
              icon: "success",
              draggable: true,
            });
          }
          navigate("/manageFoods");
        });
    });
  };

  return (
    <div className="bg-gradient-to-br from-red-50 via-amber-50 to-orange-50 py-16">
      <title>Update Food</title>
      <div className="max-w-2xl mx-auto   p-6 bg-white rounded-xl shadow-md border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Update existing food
        </h2>

        {/* Donor Info Section */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="font-medium text-gray-700 mb-3">My Information</h3>
          <div className="flex items-center space-x-4">
            <img
              src={user?.photoURL}
              referrerPolicy="no-referer"
              alt="User"
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <div>
              <p className="font-medium">{user?.displayName}</p>
              <p className="text-sm text-gray-600">{user?.email}</p>
              <p className="text-sm text-gray-600">Food Status: available</p>
            </div>
          </div>
        </div>

        {/* Food Form Fields */}
        <form onSubmit={handleUpdateFood}>
          <div className="space-y-4">
            {/* Food Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Food Name *
              </label>
              <input
                type="text"
                name="name"
                defaultValue={singleFood.name}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                placeholder="e.g., Fresh Apple Pie"
              />
            </div>

            {/* Food Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Food Image URL *
              </label>
              <input
                type="url"
                name="foodUrl"
                defaultValue={singleFood.foodUrl}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                placeholder="https://example.com/food-image.jpg"
              />
            </div>

            {/* Quantity and Expiry Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity *
                </label>
                <input
                  type="number"
                  min="1"
                  name="quantity"
                  defaultValue={singleFood.quantity}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                  placeholder="e.g., 5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date/Time *
                </label>
                <input
                  type="datetime-local"
                  name="dateTime"
                  defaultValue={singleFood.dateTime}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                />
              </div>
            </div>

            {/* Pickup Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pickup Location *
              </label>
              <input
                type="text"
                name="location"
                defaultValue={singleFood.location}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                placeholder="e.g., 123 Main St, City"
              />
            </div>
            {/* donor image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Donor Image *
              </label>
              <input
                type="text"
                name="donorImage"
                defaultValue={singleFood.donorImage}
                value={user?.photoURL}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                placeholder="e.g., 123 Main St, City"
              />
            </div>
            {/* donor name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Donor Name *
              </label>
              <input
                type="text"
                name="donorName"
                defaultValue={singleFood.donorName}
                value={user?.displayName}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                placeholder="e.g., 123 Main St, City"
              />
            </div>
            {/* donor email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Donor email *
              </label>
              <input
                type="text"
                name="donorEmail"
                value={user?.email}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                placeholder="e.g., 123 Main St, City"
              />
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Notes
              </label>
              <textarea
                rows="3"
                name="notes"
                defaultValue={singleFood.notes}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                placeholder="Any special instructions or details about the food"
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:bg-primary/90 text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-md active:scale-[0.98]"
            >
              Update Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateManageFood;
