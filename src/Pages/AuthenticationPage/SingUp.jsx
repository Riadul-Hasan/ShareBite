import React, { use, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../../Provider/AuthProvider';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaEnvelope, FaImage } from 'react-icons/fa';
import { GiCook, GiMeal } from 'react-icons/gi';

const SingUp = () => {
    const { createUser, setUser, updateUser, googlePopUp } = use(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleSignIn = () => {
        setIsLoading(true);
        googlePopUp()
            .then(() => {
                Swal.fire({
                    title: "Sign Up Success",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                    background: '#f8fafc'
                });
                navigate("/");
            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Sign Up Failed",
                    text: "Google sign in failed. Please try again.",
                    background: '#f8fafc'
                });
            })
            .finally(() => setIsLoading(false));
    };

    const handleRegister = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        const form = e.target;
        const formData = new FormData(form);
        const { email, password, name, photoUrl } = Object.fromEntries(formData.entries());

        // Password validation
        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            setIsLoading(false);
            return;
        }

        if (!/^(?=.*[A-Z]).*$/.test(password)) {
            setError("Password must contain at least one uppercase letter");
            setIsLoading(false);
            return;
        }

        if (!/^(?=.*[a-z]).*$/.test(password)) {
            setError("Password must contain at least one lowercase letter");
            setIsLoading(false);
            return;
        }

        createUser(email, password)
            .then(result => {
                const user = result.user;
                return updateUser({ displayName: name, photoURL: photoUrl })
                    .then(() => {
                        setUser({ ...user, displayName: name, photoURL: photoUrl });
                        Swal.fire({
                            title: "Account Created!",
                            text: "Your account has been created successfully",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 1500,
                            background: '#f8fafc'
                        });
                        navigate("/");
                    });
            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Registration Failed",
                    text: error.message || "Something went wrong! Please try again.",
                    background: '#f8fafc'
                });
            })
            .finally(() => setIsLoading(false));
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-[calc(100vh-320px)] bg-gradient-to-br from-amber-50 via-orange-50 to-rose-100 dark:from-stone-900 dark:via-stone-800 dark:to-stone-950 flex items-center justify-center px-4 py-8"
        >
            <title>Sign Up | Share Bite</title>

            {/* Horizontal registration container */}
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col md:flex-row bg-white dark:bg-stone-800 rounded-2xl shadow-2xl dark:shadow-stone-900/50 w-full max-w-4xl overflow-hidden"
            >
                {/* Left side - Visual */}
                <motion.div
                    initial={{ x: -20 }}
                    animate={{ x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="w-full md:w-2/5 bg-gradient-to-br from-amber-400 to-orange-500 dark:from-amber-600 dark:to-orange-700 p-8 flex flex-col justify-center"
                >
                    <div className="text-center">
                        <motion.div
                            whileHover={{ rotate: 15 }}
                            className="bg-white dark:bg-stone-800 p-4 rounded-full shadow-lg w-20 h-20 flex items-center justify-center mx-auto mb-6"
                        >
                            <GiCook className="text-amber-600 dark:text-amber-400 text-3xl" />
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-3xl font-bold text-white mb-2"
                        >
                            Welcome Aboard!
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-amber-100 dark:text-amber-200"
                        >
                            Join our food sharing community today
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="mt-8 hidden md:block"
                    >
                        <div className="flex justify-center space-x-4">
                            <motion.div
                                animate={{
                                    y: [0, -10, 0],
                                    rotate: [0, 5, -5, 0]
                                }}
                                transition={{
                                    duration: 6,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="text-4xl"
                            >
                                🍎
                            </motion.div>
                            <motion.div
                                animate={{
                                    y: [0, -15, 0],
                                    rotate: [0, -5, 5, 0]
                                }}
                                transition={{
                                    duration: 7,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="text-4xl"
                            >
                                🍕
                            </motion.div>
                            <motion.div
                                animate={{
                                    y: [0, -10, 0],
                                    rotate: [0, 8, -8, 0]
                                }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="text-4xl"
                            >
                                🥑
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Right side - Form */}
                <motion.div
                    initial={{ x: 20 }}
                    animate={{ x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="w-full md:w-3/5 p-8 md:p-10"
                >
                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-2xl font-bold text-gray-800 dark:text-orange-100 mb-6"
                    >
                        Create Your Account
                    </motion.h2>

                    <form onSubmit={handleRegister} className="space-y-4">
                        {/* Name field */}
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="space-y-1"
                        >
                            <label className="block text-sm font-medium text-gray-700 dark:text-orange-200">Full Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser className="text-gray-400 dark:text-orange-400" />
                                </div>
                                <input
                                    name="name"
                                    type="text"
                                    required
                                    className="input pl-10 w-full rounded-lg border-gray-300 dark:border-stone-600 focus:border-amber-500 dark:focus:border-amber-600 focus:ring-amber-500 dark:focus:ring-amber-600 bg-white dark:bg-stone-700 text-gray-900 dark:text-orange-100 placeholder-gray-400 dark:placeholder-orange-300"
                                    placeholder="Your name"
                                />
                            </div>
                        </motion.div>

                        {/* Email field */}
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="space-y-1"
                        >
                            <label className="block text-sm font-medium text-gray-700 dark:text-orange-200">Email</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaEnvelope className="text-gray-400 dark:text-orange-400" />
                                </div>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    className="input pl-10 w-full rounded-lg border-gray-300 dark:border-stone-600 focus:border-amber-500 dark:focus:border-amber-600 focus:ring-amber-500 dark:focus:ring-amber-600 bg-white dark:bg-stone-700 text-gray-900 dark:text-orange-100 placeholder-gray-400 dark:placeholder-orange-300"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </motion.div>

                        {/* Photo URL field */}
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="space-y-1"
                        >
                            <label className="block text-sm font-medium text-gray-700 dark:text-orange-200">Photo URL</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaImage className="text-gray-400 dark:text-orange-400" />
                                </div>
                                <input
                                    name="photoUrl"
                                    type="text"
                                    required
                                    className="input pl-10 w-full rounded-lg border-gray-300 dark:border-stone-600 focus:border-amber-500 dark:focus:border-amber-600 focus:ring-amber-500 dark:focus:ring-amber-600 bg-white dark:bg-stone-700 text-gray-900 dark:text-orange-100 placeholder-gray-400 dark:placeholder-orange-300"
                                    placeholder="https://example.com/photo.jpg"
                                />
                            </div>
                        </motion.div>

                        {/* Password field */}
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="space-y-1"
                        >
                            <label className="block text-sm font-medium text-gray-700 dark:text-orange-200">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaLock className="text-gray-400 dark:text-orange-400" />
                                </div>
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    className="input pl-10 w-full rounded-lg border-gray-300 dark:border-stone-600 focus:border-amber-500 dark:focus:border-amber-600 focus:ring-amber-500 dark:focus:ring-amber-600 bg-white dark:bg-stone-700 text-gray-900 dark:text-orange-100 placeholder-gray-400 dark:placeholder-orange-300"
                                    placeholder="••••••••"
                                />
                            </div>
                            <p className="text-xs text-gray-500 dark:text-orange-400 mt-1">
                                Must be 6+ characters with uppercase and lowercase letters
                            </p>
                        </motion.div>

                        {error && (
                            <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-500 dark:text-red-400 text-xs font-medium"
                            >
                                {error}
                            </motion.p>
                        )}

                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`w-full py-3 px-4 rounded-lg font-medium text-white shadow-md ${isLoading
                                ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                                : 'bg-gradient-to-r from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-700 hover:from-amber-600 hover:to-orange-600 dark:hover:from-amber-700 dark:hover:to-orange-800'
                                }`}
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating Account...
                                </span>
                            ) : (
                                'Create Account'
                            )}
                        </motion.button>
                    </form>

                    {/* Divider */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                        className="my-6"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200 dark:border-stone-600"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white dark:bg-stone-800 text-gray-500 dark:text-orange-300">
                                    Or sign up with
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Google sign up */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        <motion.button
                            onClick={handleGoogleSignIn}
                            disabled={isLoading}
                            whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-medium text-gray-700 dark:text-orange-100 bg-white dark:bg-stone-700 border border-gray-200 dark:border-stone-600 hover:bg-gray-50 dark:hover:bg-stone-600 shadow-sm"
                        >
                            <FcGoogle className="text-xl" />
                            Sign up with Google
                        </motion.button>
                    </motion.div>

                    {/* Login link */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1 }}
                        className="text-center mt-6"
                    >
                        <p className="text-sm text-gray-600 dark:text-orange-300">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="font-medium text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-500 hover:underline"
                            >
                                Login Now
                            </Link>
                        </p>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default SingUp;