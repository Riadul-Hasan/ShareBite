import React from 'react';

const FeatureCard = ({food}) => {
    const {foodImage, foodName, additionalNotes, donorEmail, expiredDateTime,pickupLocation, quantity} = food
    return (
   <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
            {/* Image section */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={foodImage || '/placeholder-food.jpg'}
                    alt={foodName}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    onError={(e) => {
                        e.target.src = '/placeholder-food.jpg';
                    }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h2 className="text-xl font-bold text-white">{foodName}</h2>
                </div>
            </div>
            
            {/* Details section */}
            <div className="p-5 space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="font-medium text-gray-500">Expires:</span>
                    <span>{formatExpiryDate(expiredDateTime)}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="font-medium text-gray-500">Location:</span>
                    <span>{pickupLocation}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="font-medium text-gray-500">Donor:</span>
                    <span>{donorEmail}</span>
                </div>
                
                {additionalNotes && (
                    <p className="text-sm text-gray-600 pt-2 border-t border-gray-100">
                        {additionalNotes}
                    </p>
                )}
                
                {/* Footer with quantity and button */}
                <div className="flex justify-between items-center pt-3">
                    <span className="bg-primary/10 text-primary font-medium py-1 px-3 rounded-full text-sm">
                        {quantity} available
                    </span>
                    <button className="bg-primary text-white py-2 px-4 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FeatureCard;