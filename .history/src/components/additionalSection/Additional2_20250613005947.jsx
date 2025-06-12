import React from 'react';
import Food from "../../assets/food1.jpg"

const Additional2 = () => {
    return (
        <div
            className="hero min-h-screen "
            style={{
                backgroundImage: `url(${Food})`,
            }}
        >
            <div className="hero-overlay"></div>
            <div className="hero-content text-white lg:w-2/5 lg:p-10  text-center backdrop-blur-sm bg-white/10">
                <div className="">
                    {/* <h1 className="mb-5 text-5xl font-bold">Plant Trees, Save <span className='text-green-400'>Lives</span></h1> */}
                    <h1 className="mb-5 text-5xl font-bold">Share Meals, Spread <span className='text-orange-400'>Hope</span></h1>
                    <p className="mb-5 text-blue-200">
    Join our movement to rescue good food from going to waste. Connect with your community through the simple act of sharing what you have.
</p>
                    <div className='flex justify-around w-auto lg:w-3/5 mx-auto gap-1'>
                        <button className="btn btn-primary  text-gray-600 border-none ">Explore</button>
                        <button className="btn bg-transparent text-white">Learn More</button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Additional2;