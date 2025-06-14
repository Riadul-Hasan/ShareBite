import React, { use, useState } from 'react';

import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../../Provider/AuthProvider';


const SingUp = () => {
     const { createUser,  setUser, googlePopUp } = use(AuthContext)
    const navigate = useNavigate()
    const [error, setError] = useState("")


    const handleGoogleSignIn = () => {
        googlePopUp()
            .then(() => {
                Swal.fire({
                    title: "Sign In Success",
                    icon: "success",
                    draggable: true
                });
                navigate("/")
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleRegister = (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form)
        const { email, password} = Object.fromEntries(formData.entries())
        // console.log(email, password, photoUrl, userProfile)



        if (password.length < 6) {
            setError("Password length should be 8 char or more...")
            return;
        }
        // if (!/[^A-Za-z0-9]/.test(password)) {
        //     setError("Password must have at least one special character");
        //     return;
        // }

        // if (!/^(?=.*[A-Z]).*$/.test(password)) {
        //     setError("Password must have an Uppercase letter")
        //     return;
        // }

        // if (!/^(?=.*[a-z]).*$/.test(password)) {
        //     setError("Password must have an Lowercase letter")
        //     return;
        // }



        createUser(email, password)
            .then(result => {
                const user = result.user
                setUser(user)
                console.log(user)
               
                navigate("/")

            })
            .catch(() => {
                // console.log(error)
                // Swal.fire({
                //     icon: "Register Failed! Try again",
                //     title: "Oops...",
                //     text: "Something went wrong!",

                // });
                Swal.fire({ icon: 'error', title: 'Register Failed!', text: 'Try again' });
            })

    }
    return (
          <div className=" min-h-[calc(100vh-320px)]  flex flex-col items-center justify-center px-4">

            <div className="card  bg-gradient-to-br from-green-50 to-cyan-100 rounded-2xl  w-full max-w-sm shrink-0  mx-auto mt-20 mb-20 ">
                <div className='p-4 rounded-t-2xl bg-gradient-to-r from-green-600 to-green-500'>
                    <h2 className='text-2xl font-bold text-center text-base-content'>Create Your Account</h2>
                    <p className='text-sm text-center text-base-content'>Join Us Today</p>
                </div>
                <form onSubmit={handleRegister} className="card-body">
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
                        {
                            error && <p className='text-xs font-semibold text-red-600'>{error}</p>
                        }

                        <button className="btn bg-gradient-to-r from-blue-500 to-cyan-600 text-white mt-4 border-none">Create Account</button>
                    </fieldset>
                </form>

                <div className="divider text-gray-600 text-xs px-4">Or Register With</div>


                <div className='text-center mb-4'>

                    <button onClick={handleGoogleSignIn} className="btn w-11/12 mx-auto p-2 border bg-white border-gray-200 hover:bg-gray-50 text-gray-700 flex items-center"><FcGoogle />
                        Sign In with Google</button>
                </div>

                <p className='text-center font-semibold pb-4 text-gray-700'>Already have an account? <Link to="/login" className='text-red-500 font-semibold'>Login Now</Link></p>
            </div>



        </div>
    );
};

export default SingUp;