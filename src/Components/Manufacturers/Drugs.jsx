import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Drugs = () => {
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);
    const [drugData, setDrugData] = useState(null);
    const navigate = useNavigate();

    const toggleRegistrationForm = () => {
        setShowRegistrationForm(!showRegistrationForm);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Collect form data
        const formData = {
            drugName: e.target.drugName.value,
            category: e.target.category.value,
            dosageForm: e.target.dosageForm.value,
            batchNumber: e.target.strength.value,
            manufactureDate: e.target.manufactureDate.value,
            expiryDate: e.target.expiryDate.value,
            manufacturer: e.target.manufacturer.value,
            countryOfOrigin: e.target.countryOfOrigin.value,
            description: e.target.description.value,
            registrationDate: new Date().toISOString().split('T')[0] // Current date
        };

        // Store the drug data for QR code generation
        setDrugData(formData);

        // Here you would typically send the data to your backend API
        // console.log('Drug registered:', formData);
        // Navigate to QR code page
        navigate('/qrcode', { state: { drugData: formData } });
    };

    return (
        <div className="flex h-screen overflow-hidden">
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
                <div className="p-6 flex items-center space-x-3 border-b border-gray-200">
                    <i className="fas fa-pills text-green-600 text-2xl"></i>
                    <h1 className="text-xl font-bold text-green-600">DMVS</h1>
                </div>

                <nav className="mt-6 px-3">
                    <a href="/manufacturersdashboard"
                        className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-md mb-1">
                        <i className="fas fa-chart-line w-5 h-5 mr-3"></i>
                        <span className="font-medium">Dashboard</span>
                    </a>
                    <a href="/drugs" className="flex items-center px-4 py-3 text-green-600 bg-green-50 rounded-md mb-1 border-l-4 border-green-600">
                        <i className="fas fa-capsules w-5 h-5 mr-3"></i>
                        <span className="font-medium">Drug</span>
                    </a>
                    <a href="/batches" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-md">
                        <i className="fas fa-barcode w-5 h-5 mr-3"></i>
                        <span className="font-medium">Batches</span>
                    </a>
                </nav>
            </aside>

            <main className="flex-1 overflow-y-auto">
                <div className="flex justify-between items-center mb-8 p-6 border-b border-gray-200">
                    <h1 className="text-2xl font-bold text-gray-800">Manufacturer Dashboard</h1>
                    <div className="flex items-center">
                        <div className="relative">
                            <button id="profileButton"
                                className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold mr-3">
                                PM
                            </button>
                            <div id="profileDropdown"
                                className="hidden absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    <i className="fas fa-user mr-2"></i>Profile
                                </a>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    <i className="fas fa-cog mr-2"></i>Settings
                                </a>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    <i className="fas fa-bell mr-2"></i>Notifications
                                </a>

                                <a href="/Login.html" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                                    <i className="fas fa-sign-out-alt mr-2"></i>Logout
                                </a>
                            </div>
                        </div>
                        <div>
                            <span className="mr-4">Welcome,
                                <strong className="text-green-600">Pharma Manufacturer</strong>
                            </span>
                            <a href="logout.php"
                                className="bg-white text-green-800 px-4 py-2 rounded-md font-medium hover:bg-green-100">Logout</a>
                        </div>
                    </div>
                </div>
                {/* Products Table Section - shown when form is hidden */}
                {!showRegistrationForm && (
                    <div id="productsSection" className="mb-8 bg-white rounded-lg shadow-sm overflow-hidden p-6">
                        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                            <h2 className="text-lg font-semibold">Registered Drugs</h2>
                            <button
                                onClick={toggleRegistrationForm}
                                className="bg-green-500 text-white rounded-full px-4 py-2 hover:bg-green-700 transition-colors">
                                Add Drug
                            </button>
                            <div className="flex bg-gray-100 px-3 py-2 rounded-md">
                                <i className="fas fa-search text-gray-400 mr-2 mt-1"></i>
                                <input type="text" placeholder="Search products..."
                                    className="bg-transparent border-none focus:outline-none text-sm" />
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Drug Name</th>
                                        <th
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Category</th>
                                        <th
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Dosage Form</th>
                                        <th
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Registration Date</th>
                                        <th
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status</th>
                                        <th
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap">Amoxicillin</td>
                                        <td className="px-6 py-4 whitespace-nowrap">Antibiotic</td>
                                        <td className="px-6 py-4 whitespace-nowrap">Capsule</td>
                                        <td className="px-6 py-4 whitespace-nowrap">12 Jan 2025</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex space-x-2">
                                                <button className="text-gray-500 hover:text-gray-700 border border-gray-300 rounded px-2 py-1">
                                                    <i className="fas fa-eye mr-2"></i>
                                                    View
                                                </button>
                                                <button className="text-green-500 hover:text-green-700 border border-green-300 rounded px-2 py-1">
                                                    <i className="fas fa-pen mr-2"></i>
                                                    Edit
                                                </button>
                                                <button className="text-red-500 hover:text-red-700 border border-red-300 rounded px-2 py-1">
                                                    <i className="fas fa-trash mr-2"></i>
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap">Paracetamol</td>
                                        <td className="px-6 py-4 whitespace-nowrap">Analgesic</td>
                                        <td className="px-6 py-4 whitespace-nowrap">Tablet</td>
                                        <td className="px-6 py-4 whitespace-nowrap">23 Nov 2024</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex space-x-2">
                                                <button className="text-gray-500 hover:text-gray-700 border border-gray-300 rounded px-2 py-1">
                                                    <i className="fas fa-eye mr-2"></i>
                                                    View
                                                </button>
                                                <button className="text-green-500 hover:text-green-700 border border-green-300 rounded px-2 py-1">
                                                    <i className="fas fa-pen mr-2"></i>
                                                    Edit
                                                </button>
                                                <button className="text-red-500 hover:text-red-700 border border-red-300 rounded px-2 py-1">
                                                    <i className="fas fa-trash mr-2"></i>
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap">Ciprofloxacin</td>
                                        <td className="px-6 py-4 whitespace-nowrap">Antibiotic</td>
                                        <td className="px-6 py-4 whitespace-nowrap">Tablet</td>
                                        <td className="px-6 py-4 whitespace-nowrap">07 Feb 2025</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Expired</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex space-x-2">
                                                <button className="text-gray-500 hover:text-gray-700 border border-gray-300 rounded px-2 py-1">
                                                    <i className="fas fa-eye mr-2"></i>
                                                    View
                                                </button>
                                                <button className="text-green-500 hover:text-green-700 border border-green-300 rounded px-2 py-1">
                                                    <i className="fas fa-pen mr-2"></i>
                                                    Edit
                                                </button>
                                                <button className="text-red-500 hover:text-red-700 border border-red-300 rounded px-2 py-1">
                                                    <i className="fas fa-trash mr-2"></i>
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap">Metformin</td>
                                        <td className="px-6 py-4 whitespace-nowrap">Antidiabetic</td>
                                        <td className="px-6 py-4 whitespace-nowrap">Tablet</td>
                                        <td className="px-6 py-4 whitespace-nowrap">15 Dec 2024</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Expired</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex space-x-2">
                                                <button className="text-gray-500 hover:text-gray-700 border border-gray-300 rounded px-2 py-1">
                                                    <i className="fas fa-eye mr-2"></i>
                                                    View
                                                </button>
                                                <button className="text-green-500 hover:text-green-700 border border-green-300 rounded px-2 py-1">
                                                    <i className="fas fa-pen mr-2"></i>
                                                    Edit
                                                </button>
                                                <button className="text-red-500 hover:text-red-700 border border-red-300 rounded px-2 py-1">
                                                    <i className="fas fa-trash mr-2"></i>
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap">Diazepam</td>
                                        <td className="px-6 py-4 whitespace-nowrap">Sedative</td>
                                        <td className="px-6 py-4 whitespace-nowrap">Tablet</td>
                                        <td className="px-6 py-4 whitespace-nowrap">03 Sep 2024</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Expired</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex space-x-2">
                                                <button className="text-gray-500 hover:text-gray-700 border border-gray-300 rounded px-2 py-1">
                                                    <i className="fas fa-eye mr-2"></i>
                                                    View
                                                </button>
                                                <button className="text-green-500 hover:text-green-700 border border-green-300 rounded px-2 py-1">
                                                    <i className="fas fa-pen mr-2"></i>
                                                    Edit
                                                </button>
                                                <button className="text-red-500 hover:text-red-700 border border-red-300 rounded px-2 py-1">
                                                    <i className="fas fa-trash mr-2"></i>
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Drug Registration Form - shown when Add Drug is clicked */}
                {showRegistrationForm && (
                    <div id="registerForm" className="mb-8 bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                            <h2 className="text-3xl font-semibold">Register New Drug</h2>
                            <button
                                onClick={toggleRegistrationForm}
                                className="text-gray-500 hover:text-gray-700">
                                <i className="fas fa-times"></i>
                            </button>
                        </div>

                        <div className="p-6">
                            <form id="drugRegistrationForm" onSubmit={handleFormSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="drugName" className="block text-sm font-medium text-gray-700 mb-1">Drug Name
                                            *</label>
                                        <input type="text" id="drugName"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required />
                                    </div>

                                    <div>
                                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Drug
                                            Category *</label>
                                        <select id="category"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required>
                                            <option value="">Select category</option>
                                            <option value="antibiotic">Antibiotic</option>
                                            <option value="analgesic">Analgesic</option>
                                            <option value="antiviral">Antiviral</option>
                                            <option value="antidiabetic">Antidiabetic</option>
                                            <option value="antihistamine">Antihistamine</option>
                                            <option value="antihypertensive">Antihypertensive</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="dosageForm" className="block text-sm font-medium text-gray-700 mb-1">Dosage
                                            Form *</label>
                                        <select id="dosageForm"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required>
                                            <option value="">Select dosage form</option>
                                            <option value="tablet">Tablet</option>
                                            <option value="capsule">Capsule</option>
                                            <option value="syrup">Syrup</option>
                                            <option value="injection">Injection</option>
                                            <option value="cream">Cream</option>
                                            <option value="ointment">Ointment</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="strength" className="block text-sm font-medium text-gray-700 mb-1">Batch Number
                                            *</label>
                                        <input type="text" id="strength" placeholder="e.g. BTC202579"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required />
                                    </div>

                                    <div>
                                        <label htmlFor="manufactureDate"
                                            className="block text-sm font-medium text-gray-700 mb-1">Manufacturing Date
                                            *</label>
                                        <input type="date" id="manufactureDate"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required />
                                    </div>

                                    <div>
                                        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">Expiry
                                            Date *</label>
                                        <input type="date" id="expiryDate"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required />
                                    </div>

                                    <div>
                                        <label htmlFor="manufacturer"
                                            className="block text-sm font-medium text-gray-700 mb-1">Manufacturer *</label>
                                        <input type="text" id="manufacturer"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required />
                                    </div>

                                    <div>
                                        <label htmlFor="countryOfOrigin"
                                            className="block text-sm font-medium text-gray-700 mb-1">Country of Origin *</label>
                                        <input type="text" id="countryOfOrigin"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label htmlFor="description"
                                            className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                        <textarea id="description" rows="3"
                                            placeholder="Describe the drug?"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"></textarea>
                                    </div>
                                </div>

                                <div className="mt-8 flex justify-end">
                                    <button type="button"
                                        onClick={toggleRegistrationForm}
                                        className="mr-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                                        Cancel
                                    </button>
                                    <button type="submit"
                                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
                                        Register Drug
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};


export default Drugs;