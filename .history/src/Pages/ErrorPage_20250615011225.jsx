import React from 'react';
import { IoWarningOutline } from 'react-icons/io5';
import { Link } from 'react-router';

const ErrorPage = () => {
    return (
        <div className='bg-gradient-to-br from-amber-50 to-orange-50 flex justify-center items-center min-h-screen rounded-xl'>
    <title>Error Page</title>

    <div className="card max-w-md container mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        <h2 className="text-center rounded-t-xl bg-gradient-to-r from-amber-500 to-orange-600 text-xl text-white font-semibold p-4">
            Oops! Page Not Found
        </h2>
        <div className="card-body flex flex-col justify-center items-center p-6">
            <IoWarningOutline size={60} className="text-amber-600" />
            <p className='font-semibold text-gray-700 mt-4'>We couldn't find the page you're looking for!</p>
            <p className='font-semibold text-gray-600'>No food routes found</p>
            <div className="justify-center card-actions mt-6">
                <Link 
                    to="/" 
                    className="btn bg-gradient-to-r from-amber-400 to-orange-500 text-white hover:from-amber-500 hover:to-orange-600 hover:shadow-md transition-all"
                >
                    Back To Home
                </Link>
            </div>
        </div>
    </div>
</div>
    );
};

export default ErrorPage;