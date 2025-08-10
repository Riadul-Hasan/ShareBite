import React, { use, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../../Provider/AuthProvider';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { GiForkKnifeSpoon } from 'react-icons/gi';

const Login = () => {
    const { signInUser, setUser, googlePopUp } = use(AuthContext);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        setIsLoading(true);
        googlePopUp()
            .then(result => {
                const userNow = result.user;
                Swal.fire({
                    title: "Login Successful",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                    background: '#f8fafc',
                    backdrop: `
                        rgba(0,0,123,0.4)
                        url("/images/nyan-cat.gif")
                        left top
                        no-repeat
                    `
                });
                navigate("/");
                setUser(userNow);
            })
            .finally(() => setIsLoading(false));
    };

    const handleSignIn = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const email = e.target.email.value;
        const password = e.target.password.value;

        signInUser(email, password)
            .then(result => {
                setUser(result.user);
                Swal.fire({
                    title: "Welcome Back!",
                    text: "Login successful",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                    background: '#f8fafc'
                });
                navigate("/");
            })
            .catch(error => {
                console.log(error);
                setError("Wrong email or password");
                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: "Wrong email or password",
                    footer: '<Link to="/forget-password" class="text-blue-500 hover:underline">Forgot password?</Link>',
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
            className='min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-stone-900 dark:via-stone-800 dark:to-stone-700 flex flex-col items-center justify-center px-4 py-12'
        >
            <title>Login | Share Bite</title>

            {/* Floating food icons */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ y: 0, x: Math.random() * 100 }}
                        animate={{
                            y: [0, -100, -200, -300, -400],
                            x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50]
                        }}
                        transition={{
                            duration: 15 + Math.random() * 10,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute text-2xl opacity-20 dark:opacity-10"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: '100%',
                            color: ['#f59e0b', '#ef4444', '#10b981'][Math.floor(Math.random() * 3)]
                        }}
                    >
                        {['🍎', '🍕', '🥑', '🍓', '🥐', '🍋', '🍉', '🥨', '🍒', '🥞'][Math.floor(Math.random() * 10)]}
                    </motion.div>
                ))}
            </div>

            {/* Main card */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="relative bg-white dark:bg-stone-800 rounded-3xl shadow-xl dark:shadow-stone-900/50 w-full max-w-md overflow-hidden"
            >
                {/* Decorative elements */}
                <div className="absolute -top-16 -right-16 w-32 h-32 bg-amber-200 dark:bg-amber-800 rounded-full opacity-20 dark:opacity-10"></div>
                <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-purple-200 dark:bg-purple-800 rounded-full opacity-20 dark:opacity-10"></div>

                {/* Header */}
                <div className="bg-gradient-to-r from-amber-400 to-orange-500 dark:from-amber-600 dark:to-amber-700 p-6 text-center">
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="inline-block bg-white dark:bg-stone-800 p-3 rounded-full shadow-lg mb-2"
                    >
                        <GiForkKnifeSpoon className="text-amber-600 dark:text-amber-400 text-3xl" />
                    </motion.div>
                    <motion.h2
                        className='text-3xl font-bold text-white'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        Welcome Back
                    </motion.h2>
                    <motion.p
                        className='text-amber-100 dark:text-amber-200 mt-2'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        Login to continue sharing food
                    </motion.p>
                </div>

                {/* Form */}
                <motion.form
                    onSubmit={handleSignIn}
                    className="p-8 space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    {/* Email field */}
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="space-y-2"
                    >
                        <label className="block text-gray-700 dark:text-amber-100 font-medium">Email</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaEnvelope className="text-gray-400 dark:text-amber-300" />
                            </div>
                            <input
                                required
                                name='email'
                                type="email"
                                className="input pl-10 w-full rounded-lg border-gray-300 dark:border-stone-600 focus:border-amber-500 dark:focus:border-amber-400 focus:ring-amber-500 dark:focus:ring-amber-400 dark:bg-stone-700 dark:text-amber-100"
                                placeholder="your@email.com"
                            />
                        </div>
                    </motion.div>

                    {/* Password field */}
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="space-y-2"
                    >
                        <label className="block text-gray-700 dark:text-amber-100 font-medium">Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaLock className="text-gray-400 dark:text-amber-300" />
                            </div>
                            <input
                                name='password'
                                type="password"
                                className="input pl-10 w-full rounded-lg border-gray-300 dark:border-stone-600 focus:border-amber-500 dark:focus:border-amber-400 focus:ring-amber-500 dark:focus:ring-amber-400 dark:bg-stone-700 dark:text-amber-100"
                                required
                                placeholder="••••••••"
                            />
                        </div>
                        <motion.div
                            whileHover={{ x: 2 }}
                            className="text-right"
                        >
                            <Link className="text-sm text-amber-600 dark:text-amber-400 hover:underline" to="/forget-password">
                                Forgot password?
                            </Link>
                        </motion.div>
                    </motion.div>

                    {error && (
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className='text-red-500 dark:text-red-400 text-sm font-medium'
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
                            ? 'bg-gray-400 dark:bg-stone-600 cursor-not-allowed'
                            : 'bg-gradient-to-r from-amber-500 to-orange-500 dark:from-amber-600 dark:to-amber-700 hover:from-amber-600 hover:to-orange-600 dark:hover:from-amber-700 dark:hover:to-amber-800'
                            }`}
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </span>
                        ) : (
                            'Login'
                        )}
                    </motion.button>
                </motion.form>

                {/* Divider */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="px-8"
                >
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300 dark:border-stone-600"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white dark:bg-stone-800 text-gray-500 dark:text-amber-200">
                                Or continue with
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* Google login */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className='p-8 pt-6'
                >
                    <motion.button
                        onClick={handleGoogleSignIn}
                        disabled={isLoading}
                        whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium text-gray-700 dark:text-amber-100 bg-white dark:bg-stone-700 border border-gray-200 dark:border-stone-600 hover:bg-gray-50 dark:hover:bg-stone-600 shadow-sm"
                    >
                        <FcGoogle className="text-xl" />
                        Sign in with Google
                    </motion.button>
                </motion.div>

                {/* Sign up link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                    className="text-center pb-8"
                >
                    <p className="text-gray-600 dark:text-amber-200">
                        Don't have an account?{' '}
                        <Link
                            to="/signUp"
                            className="font-medium text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 hover:underline"
                        >
                            Register
                        </Link>
                    </p>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default Login;