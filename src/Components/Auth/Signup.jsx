import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({
        manufacturerName: '',
        licenseNumber: '',
        email: '',
        phone: '',
        Address: '',
        License: '',
        password: '',
        confirmPassword: '',
        termsAccepted: false
    });

    const [errors, setErrors] = useState({
        manufacturerName: '',
        licenseNumber: '',
        email: '',
        phone: '',
        Address: '',
        License: '',
        password: '',
        confirmPassword: '',
        termsAccepted: ''
    });

    // Validate a single field
    const validateField = (name, value) => {
        let errorMessage = '';

        switch (name) {
            case 'manufacturerName':
                if (!value.trim()) {
                    errorMessage = 'Manufacturer name is required';
                } else if (value.trim().length < 3) {
                    errorMessage = 'Name must be at least 3 characters';
                }
                break;

            case 'licenseNumber':
                if (!value.trim()) {
                    errorMessage = 'License number is required';
                } else if (!/^[A-Za-z0-9-]+$/.test(value)) {
                    errorMessage = 'License number should contain only letters, numbers and hyphens';
                }
                break;

            case 'email':
                if (!value.trim()) {
                    errorMessage = 'Email is required';
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    errorMessage = 'Please enter a valid email address';
                }
                break;

            case 'phone':
                if (!value.trim()) {
                    errorMessage = 'Phone number is required';
                } else if (!/^\+?[0-9\s-()]{10,15}$/.test(value)) {
                    errorMessage = 'Please enter a valid phone number';
                }
                break;

            case 'Address':
                if (!value.trim()) {
                    errorMessage = 'Address is required';
                } else if (value.trim().length < 5) {
                    errorMessage = 'Please enter a complete address';
                }
                break;

            case 'License':
                if (!value) {
                    errorMessage = 'Upload License/Certificate is required';
                }
                break;

            case 'password':
                if (!value) {
                    errorMessage = 'Password is required';
                } else if (value.length < 8) {
                    errorMessage = 'Password must be at least 8 characters';
                } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(value)) {
                    errorMessage = 'Password must include uppercase, lowercase, and numbers';
                }
                break;

            case 'confirmPassword':
                if (!value) {
                    errorMessage = 'Please confirm your password';
                } else if (value !== formData.password) {
                    errorMessage = 'Passwords do not match';
                }
                break;

            case 'termsAccepted':
                if (!value) {
                    errorMessage = 'You must accept the terms and conditions';
                }
                break;

            default:
                break;
        }

        return errorMessage;
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;

        setFormData(prevData => ({
            ...prevData,
            [name]: newValue
        }));

        // Clear error when user starts typing
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: ''
        }));
    };

    // Validate on blur
    const handleBlur = (e) => {
        const { name, value, type, checked } = e.target;
        const fieldValue = type === 'checkbox' ? checked : value;
        const errorMessage = validateField(name, fieldValue);

        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: errorMessage
        }));
    };

    // Validate all fields
    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        // Validate each field
        Object.keys(formData).forEach(key => {
            const value = formData[key];
            const errorMessage = validateField(key, value);
            newErrors[key] = errorMessage;

            if (errorMessage) {
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Form is valid, proceed with submission
            console.log('Signup attempt with:', formData);
            // Here you would typically call an API to register the user
            alert('Form submitted successfully!');
        } else {
            console.log('Form has errors. Please correct them.');
        }
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
                    <form onSubmit={handleSubmit} noValidate>
                        {/* manufacturer information  */}
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2 font-bold">Manufacturer Information</label>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    name="manufacturerName"
                                    value={formData.manufacturerName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Manufacturer Name"
                                    className={`w-full px-4 py-2 border rounded-md focus:outline-none ${errors.manufacturerName ? 'border-red-500 focus:ring-red-500' : 'focus:ring-2 focus:ring-green-500'}`}
                                />
                                {errors.manufacturerName && <p className="text-red-500 text-sm mt-1">{errors.manufacturerName}</p>}
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="licenseNumber"
                                    value={formData.licenseNumber}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="License Number"
                                    className={`w-full px-4 py-2 border rounded-md focus:outline-none ${errors.licenseNumber ? 'border-red-500 focus:ring-red-500' : 'focus:ring-2 focus:ring-green-500'}`}
                                />
                                {errors.licenseNumber && <p className="text-red-500 text-sm mt-1">{errors.licenseNumber}</p>}
                            </div>
                        </div>

                        {/* contact information */}
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2 font-bold">Contact Information</label>
                            <div className="mb-3">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Email Address"
                                    className={`w-full px-4 py-2 border rounded-md focus:outline-none ${errors.email ? 'border-red-500 focus:ring-red-500' : 'focus:ring-2 focus:ring-green-500'}`}
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>
                            <div>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Phone Number"
                                    className={`w-full px-4 py-2 border rounded-md focus:outline-none ${errors.phone ? 'border-red-500 focus:ring-red-500' : 'focus:ring-2 focus:ring-green-500'}`}
                                />
                                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                            </div>
                        </div>

                        {/* address  */}
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2 font-bold">Manufacturer Address</label>
                            <div>
                                <input
                                    type="text"
                                    name="Address"
                                    value={formData.Address}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Street Address"
                                    className={`w-full px-4 py-2 border rounded-md focus:outline-none ${errors.Address ? 'border-red-500 focus:ring-red-500' : 'focus:ring-2 focus:ring-green-500'}`}
                                />
                                {errors.Address && <p className="text-red-500 text-sm mt-1">{errors.Address}</p>}
                            </div>
                        </div>

                        {/* License and certificate upload */}
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2 font-bold">License/Certificate</label>
                            <div className="mb-3">
                                <input
                                    type="file"
                                    name="License"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    className={`w-full px-4 py-2 border rounded-md focus:outline-none ${errors.License ? 'border-red-500 focus:ring-red-500' : 'focus:ring-2 focus:ring-green-500'}`}
                                />
                                <p className="text-gray-500 text-xs mt-1">Upload your manufacturing license or certificate (Must be a PDF)</p>
                                {errors.License && <p className="text-red-500 text-sm mt-1">{errors.License}</p>}
                            </div>
                        </div>

                        {/* Account security */}
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2 font-bold">Account Security</label>
                            <div className="mb-3">
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Password"
                                    className={`w-full px-4 py-2 border rounded-md focus:outline-none ${errors.password ? 'border-red-500 focus:ring-red-500' : 'focus:ring-2 focus:ring-green-500'}`}
                                />
                                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                            </div>
                            <div>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Confirm Password"
                                    className={`w-full px-4 py-2 border rounded-md focus:outline-none ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'focus:ring-2 focus:ring-green-500'}`}
                                />
                                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                            </div>
                        </div>

                        <div className="mb-6">
                            <div className="flex items-start">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    name="termsAccepted"
                                    checked={formData.termsAccepted}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`h-4 w-4 mt-1 focus:ring-green-500 border-gray-300 rounded ${errors.termsAccepted ? 'border-red-500' : 'text-green-600'}`}
                                />
                                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                                    I agree to the <a href="#" className="text-green-600 hover:underline">Terms of Service</a> and{' '}
                                    <a href="#" className="text-green-600 hover:underline">Privacy Policy</a>
                                </label>
                            </div>
                            {errors.termsAccepted && <p className="text-red-500 text-sm mt-1">{errors.termsAccepted}</p>}
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
                            We'll verify your license and Manufacturer information before activating your account.
                            This process will take 24 hours.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Signup;