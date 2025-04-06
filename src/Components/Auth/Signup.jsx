import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({
        companyName: '',
        licenseNumber: '',
        email: '',
        phone: '',
        streetAddress: '',
        city: '',
        state: '',
        postalCode: '',
        district: '',
        password: '',
        confirmPassword: '',
        termsAccepted: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your signup logic here
        console.log('Signup attempt with:', formData);
    };

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="max-w-md mx-auto mb-8">
                <div className="flex">
                    <Link to="/login" className="w-1/2 py-3 font-medium text-center border-b-2 border-gray-200 text-gray-500">
                        Login
                    </Link>
                    <Link to="/signup" className="w-1/2 py-3 font-medium text-center border-b-2 border-green-600 text-green-600">
                        Sign Up
                    </Link>
                </div>
            </div>

            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-green-700 text-white py-4 px-6">
                    <h2 className="text-xl font-semibold">Manufacturer Registration</h2>
                    <p className="text-sm text-green-100">Join our verification platform</p>
                </div>
                <div className="p-6">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2 font-bold">Company Information</label>
                            <input
                                type="text"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                placeholder="Company Name"
                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none mb-3"
                            />
                            <input
                                type="text"
                                name="licenseNumber"
                                value={formData.licenseNumber}
                                onChange={handleChange}
                                placeholder="Pharmaceutical License Number"
                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2 font-bold">Contact Information</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email Address"
                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none mb-3"
                            />
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Phone Number"
                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2 font-bold">Company Address</label>
                            <input
                                type="text"
                                name="streetAddress"
                                value={formData.streetAddress}
                                onChange={handleChange}
                                placeholder="Street Address"
                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none mb-3"
                            />
                            <div className="grid grid-cols-2 gap-3">
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="City"
                                    className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                                />
                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    placeholder="State/Province"
                                    className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3 mt-3">
                                <input
                                    type="text"
                                    name="postalCode"
                                    value={formData.postalCode}
                                    onChange={handleChange}
                                    placeholder="Postal Code"
                                    className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                                />
                                <select
                                    name="district"
                                    value={formData.district}
                                    onChange={handleChange}
                                    className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none bg-white"
                                >
                                    <option value="" disabled>District</option>
                                    <option value="kla">Kampala</option>
                                    <option value="msk">Masaka</option>
                                    <option value="jja">Jinja</option>
                                    <option value="srt">Soroti</option>
                                </select>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2 font-bold">Account Security</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none mb-3"
                            />
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm Password"
                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                            />
                        </div>

                        <div className="mb-6">
                            <div className="flex items-start">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    name="termsAccepted"
                                    checked={formData.termsAccepted}
                                    onChange={handleChange}
                                    className="h-4 w-4 mt-1 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                />
                                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                                    I agree to the <a href="#" className="text-green-600 hover:underline">Terms of Service</a> and{' '}
                                    <a href="#" className="text-green-600 hover:underline">Privacy Policy</a>
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        >
                            Create Account
                        </button>
                    </form>

                    <div className="mt-4 text-center text-gray-500 text-sm">
                        <p>
                            Already registered?{' '}
                            <Link to="/login" className="text-green-600 hover:underline">
                                Log in
                            </Link>
                        </p>
                    </div>

                    <div className="mt-6 bg-green-50 p-4 rounded-md border border-green-200">
                        <h3 className="font-medium text-green-800 mb-2 flex items-center">
                            <i className="fas fa-info-circle mr-2"></i> Verification Process
                        </h3>
                        <p className="text-sm text-green-700">
                            After signing up, we'll verify your pharmaceutical license and company information before activating your account.
                            This process typically takes 1-2 business days.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Signup;