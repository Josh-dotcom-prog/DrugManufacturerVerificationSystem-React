import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your login logic here
        console.log('Login attempt with:', { email, password, rememberMe });
    };

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="max-w-md mx-auto mb-8">
                <div className="flex">
                    <Link to="/login" className="w-1/2 py-3 font-medium text-center border-b-2 border-green-600 text-green-600">
                        Login
                    </Link>
                    <Link to="/signup" className="w-1/2 py-3 font-medium text-center border-b-2 border-gray-200 text-gray-500">
                        Sign Up
                    </Link>
                </div>
            </div>

            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-green-700 text-white py-4 px-6">
                    <h2 className="text-xl font-semibold">Manufacturer Login</h2>
                    <p className="text-sm text-green-100">Access your verification dashboard</p>
                </div>
                <div className="p-6">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="fas fa-envelope text-gray-400"></i>
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="company@example.com"
                                    className="w-full pl-10 px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                                />
                            </div>
                        </div>
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-2">
                                <label htmlFor="password" className="block text-gray-700 font-medium">
                                    Password
                                </label>
                                <a href="#" className="text-sm text-green-600 hover:underline">
                                    Forgot Password?
                                </a>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="fas fa-lock text-gray-400"></i>
                                </div>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-10 px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                                />
                            </div>
                        </div>
                        <div className="flex items-center mb-6">
                            <input
                                type="checkbox"
                                id="remember"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                                Remember me
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        >
                            Log In
                        </button>
                    </form>
                    <div className="mt-4 text-center text-gray-500 text-sm">
                        <p>
                            Don't have a manufacturer account?{' '}
                            <Link to="/signup" className="text-green-600 hover:underline">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Login;