import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router';

const SingUp = () => {
    return (
         <div className=" min-h-[calc(100vh-320px)] bg-gradient-to-br from-blue-50 to-cyan-100  flex flex-col items-center justify-center px-4">

            <div className="card  bg-white rounded-2xl  w-full max-w-sm shrink-0  mx-auto mt-20 mb-20 ">
                <div className='p-4 rounded-t-2xl bg-gradient-to-r from-blue-500 to-cyan-600'>
                    <h2 className='text-2xl font-bold text-center text-white'>Create Your Account</h2>
                    <p className='text-sm text-center text-white'>Join Us Today</p>
                </div>
                <form  className="card-body">
                    <fieldset className="fieldset ">
                        <label className="label font-semibold text-gray-500 ">Your Name</label>
                        <input name='name' required type="text" className="input mb-2" placeholder="Name" />
                        {/* email */}
                        <label className="label font-semibold text-gray-500">Email</label>
                        <input name='email' required type="email" className="input mb-2" placeholder="Email" />
                        {/* photo */}
                        <label className="label font-semibold text-gray-500 ">Photo Url</label>
                        <input name='photoUrl' required type="text" className="input mb-2" placeholder="Photo url" />
                        {/* password */}
                        <label className="label font-semibold text-gray-500 ">Password</label>
                        <input name='password' required type="password" className="input mb-2" placeholder="Password" />
                        {/* {
                            error && <p className='text-xs font-semibold text-red-600'>{error}</p>
                        } */}

                        <button className="btn bg-gradient-to-r from-blue-500 to-cyan-600 text-white mt-4 border-none">Create Account</button>
                    </fieldset>
                </form>

                <div className="divider text-gray-600 text-xs px-4">Or Register With</div>


                <div className='text-center mb-4'>

                    <button className="btn w-11/12 mx-auto p-2 border bg-white border-gray-200 hover:bg-gray-50 text-gray-700 flex items-center"><FcGoogle />
                        Sign In with Google</button>
                </div>

                <p className='text-center font-semibold pb-4 text-gray-700'>Already have an account? <Link to="/login" className='text-red-500 font-semibold'>Login Now</Link></p>
            </div>



        </div>
    );
};

export default SingUp;