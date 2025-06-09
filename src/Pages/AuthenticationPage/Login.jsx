import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";

const Login = () => {
  return (
    <div className=" py-10 min-h-[calc(100vh-320px)] flex bg-gradient-to-br from-indigo-50 to-orange-100 flex-col items-center justify-center px-4">
      <div className="card bg-white rounded-2xl p-4 w-full max-w-sm shrink-0  mx-auto mt-20 mb-10">
        <h2 className="text-2xl font-bold text-center text-gray-700 pt-4">
          Welcome Back
        </h2>

        <p className="text-center text-sm py-2 text-gray-700">
          Login to access your account
        </p>
        <form className="card-body">
          <fieldset className="fieldset">
            {/* email */}
            <label className="label">Email</label>
            <input
              required
              name="email"
              type="email"
              className="input rounded-lg"
              placeholder="Email"
            />
            {/* password */}
            <label className="label">Password</label>
            <input
              name="password"
              type="password"
              className="input rounded-lg"
              required
              placeholder="Password"
            />

            <Link
              className="link link-hover text-indigo-600"
              to="/forget-password"
            >
              Forgot password?
            </Link>

            {/* {
                            error && <p className='text-red-500 text-xs font-semibold'>{error}</p>
                        } */}
            <button className="btn btn-neutral mt-4 bg-gradient-to-r from-indigo-500 to-purple-600 border-none text-white hover:from-indigo-600 hover:to-purple-700 ">
              Login
            </button>
          </fieldset>
        </form>

        <div className="divider text-gray-600 text-xs p-4">OR</div>

        <div className="text-center mb-4">
          <button className="btn w-11/12 mx-auto p-2 border bg-white border-gray-200 hover:bg-gray-50 text-gray-700 flex items-center">
            <FcGoogle />
            Sign In with Google
          </button>
        </div>
        <p className="text-center font-semibold pb-4 text-gray-700">
          Dont have an account?{" "}
          <Link to="/signUp" className="text-red-500">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
