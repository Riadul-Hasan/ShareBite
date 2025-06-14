import React from 'react';
import { IoWarningOutline } from 'react-icons/io5';
import { Link } from 'react-router';

const ErrorPage = () => {
    return (
        <div className='bg-gradient-to-br from-green-50 to-green-200 flex justify-center items-center min-h-screen rounded-xl'>

            <title>Error Page</title>


            <div className="card max-w-md  container mx-auto bg-base-100 card-md shadow-sm ">
                <h2 className="text-center rounded-t-xl bg-gradient-to-r from-green-400 to-green-800 text-xl text-white font-semibold p-4">Opps! Page Not Found</h2>
                <div className="card-body flex justify-center items-center p-4">
                    <IoWarningOutline size={60} color='red' />
                    <p className='font-semibold '>We couldn't find the page you are looking for ! </p>
                    <p className='font-semibold '>No routes found</p>
                    <div className="justify-center card-actions">
                        <Link to="/" className="btn bg-gradient-to-r from-orange-400 to-amber-400 text-white  hover:animate-bounce mt-6">Back To Home</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;