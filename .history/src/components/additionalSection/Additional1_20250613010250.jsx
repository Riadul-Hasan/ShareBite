import React from 'react';
import CountUp from 'react-countup';
import { BsPersonWorkspace } from "react-icons/bs";
import { MdDoneAll } from "react-icons/md";
import { FcCustomerSupport, FcRating } from "react-icons/fc";
import { FaIndustry } from "react-icons/fa6";
import { GiAppleSeeds, GiGardeningShears } from 'react-icons/gi';
import { RiPlantFill } from 'react-icons/ri';




const Additional1 = () => {
    return (
        <div className='container mx-auto '>
            <h2 className='text-center text-4xl  font-bold text-base-content'>Our Valuable Info</h2>
            <div className="grid grid-cols-2 p-4 lg:p-0 lg:mt-12 lg:mb-16 lg:grid-cols-4 gap-6 pb-16">

                <div className="card bg-white px-8 border border-gray-300">
                    <div className="card-body flex justify-center items-center">
                        <div className='rounded-full mt-4 bg-blue-400 text-white w-20 h-20 mx-auto  flex justify-center items-center '>
                            <p className='font-bold text-2xl  text-center flex justify-center'><RiPlantFill size={30} />
                            </p>
                        </div>
                        <h2 className="text-4xl font-bold py-2 text-blue-400">
                            <CountUp start={0} end={300} delay={0} duration={10}>
                                {({ countUpRef }) => (
                                    <div>
                                        <span ref={countUpRef} />
                                    </div>
                                )}{" "}
                            </CountUp>
                            <span>+</span>
                        </h2>
                        <p className="font-semibold text-xl opacity-60  text-green-600">Plants Planted</p>
                    </div>
                </div>

                {/* 2nd one */}
                <div className="card bg-white px-8 border border-gray-300">
                    <div className="card-body flex justify-center items-center">
                        <div className='rounded-full mt-4 bg-yellow-400 text-white w-20 h-20 mx-auto text-centerp flex justify-center items-center '>
                            <p className='font-bold text-2xl  flex justify-center'><GiGardeningShears size={30} />
                            </p>
                        </div>
                        <h2 className="text-4xl font-bold py-2 text-yellow-500">
                            <CountUp start={0} end={150} delay={0} duration={10}>
                                {({ countUpRef }) => (
                                    <div>
                                        <span ref={countUpRef} />
                                    </div>
                                )}{" "}
                            </CountUp>
                            <span>+</span>
                        </h2>
                        <p className="font-semibold text-xl opacity-60 text-green-600">Gardens Maintained</p>
                    </div>
                </div>
                {/* 3rd one */}
                <div className="card bg-white px-8 border border-gray-300">
                    <div className="card-body flex justify-center items-center">
                        <div className='rounded-full mt-4 bg-green-400 text-white w-20 h-20 mx-auto text-centerp flex justify-center items-center '>
                            <p className='font-bold text-2xl flex justify-center'><GiAppleSeeds size={25} />
                            </p>
                        </div>
                        <h2 className="text-4xl font-bold py-2 text-green-600">
                            <CountUp start={0} end={500} delay={0} duration={10}>
                                {({ countUpRef }) => (
                                    <div>
                                        <span ref={countUpRef} />
                                    </div>
                                )}{" "}
                            </CountUp>
                            <span>+</span>
                        </h2>
                        <p className="font-semibold text-xl text-green-600 opacity-60"> Seeds Sown</p>
                    </div>
                </div>

                {/* 4th one */}
                <div className="card bg-white px-8 border border-gray-300">
                    <div className="card-body flex justify-center items-center">
                        <div className='rounded-full mt-4 bg-base-300 text-white w-20 h-20 mx-auto text-centerp flex justify-center items-center '>
                            <p className='font-bold text-2xl flex justify-center'><FcCustomerSupport size={35} />
                            </p>
                        </div>
                        <h2 className="text-4xl font-bold py-2 text-gray-600">
                            <CountUp start={0} end={200} delay={0} duration={10}>
                                {({ countUpRef }) => (
                                    <div>
                                        <span ref={countUpRef} />
                                    </div>
                                )}{" "}
                            </CountUp>
                            <span>+</span>
                        </h2>
                        <p className="font-semibold text-xl opacity-60 text-green-600">Happy Customers</p>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default Additional1;