import React from 'react';
import Food from "../../assets/food1.jpg"

const Additional2 = () => {
    return (
        <div
            className="hero min-h-screen "
            style={{
                backgroundImage: `url(${})`,
            }}
        >
            <div className="hero-overlay"></div>
            <div className="hero-content text-white lg:w-2/5 lg:p-10  text-center backdrop-blur-sm bg-white/10">
                <div className="">
                    <h1 className="mb-5 text-5xl font-bold">Plant Trees, Save <span className='text-green-400'>Lives</span></h1>
                    <p className="mb-5 text-blue-200">
                        Our platform is designed to connect passionate gardeners and horticulturists with top gardening and landscaping opportunities. Discover, filter, and cultivate your dream garden with an easy and inspiring experience.                    </p>
                    <div className='flex justify-around w-auto lg:w-3/5 mx-auto '>
                        <button className="btn bg-gradient-to-r from-green-500  to-green-300 text-gray-600 border-none ">Explore Opportunities</button>
                        <button className="btn bg-transparent text-white">Learn More</button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Additional2;