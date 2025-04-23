import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const UserRegistration = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Add your login logic here
        console.log('Login attempt with:', { email, password });

        // Simulate login process
        setTimeout(() => {
            setIsLoading(false);
            navigate("#");
        }, 1500);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden">
                {/* Card Header */}
                <div className="p-6 border-b">
                    <div className="flex items-center justify-center mb-4">
                        <div className="rounded-full bg-black-100 p-3">
                            {/* Lock icon */}
                            <i className="fas fa-pills text-black text-4xl"></i>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-center text-gray-800">Drug Manufacturer Verification System</h2>
                    <p class="text-lg font-bold text-center text-gray-800">User Registration</p>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Card Content */}

                    <div className="p-6 space-y-4">

                        {/* Name Input */}
                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Manufacturer Name</label>
                            <input
                                id="name"
                                type="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black-500 focus:border-black-500"
                            />
                        </div>

                        {/* email Input */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black-500 focus:border-black-500"
                            />
                        </div>

                        {/* Role*/}
                        <div className="space-y-2">
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                            <select
                                id="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black-500 focus:border-black-500"
                            >
                                <option value="">Select Role</option>
                                <option value="admin">Admin</option>
                                <option value="manufacturer">Manufacturer</option>
                            </select>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black-500 focus:border-black-500"
                            />
                        </div>

                        {/* Phone Input */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <input
                                id="phone"
                                type="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black-500 focus:border-black-500"
                            />
                        </div>
                    </div>

                    {/* Card Footer */}
                    <div className="px-6 pb-6">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center items-center py-2 px-4 border border-black rounded-md shadow-sm text-md font-medium hover:bg-black hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <i className="fas fa-spinner fa-spin text-white text-sm"></i>
                                    Registering...
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <i className="fas fa-sign-in-alt"></i>
                                    Register
                                </span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserRegistration
