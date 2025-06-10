import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/axios';

const Approvals = () => {
    const [manufacturers, setManufacturers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch manufacturers data from backend
        api
            .get('http://0.0.0.0:8000/admin/approvals')
            .then((response) => {
                // Get only pending manufacturers from the response
                setManufacturers(response.data.pending || []);
            })
            .catch((error) => {
                console.error('Error fetching manufacturers:', error);
            });
    }, []);

    const handleViewManufacturer = (id) => {
        // Navigate to manufacturer details page with ID
        navigate(`/manufacturerdetails/${id}`);
    };

    // Filter manufacturers based on search term
    const filteredManufacturers = manufacturers.filter((m) =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar navigation */}
            <div className="w-64 border-r border-gray-200 bg-white">
                <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <h1 className="text-xl font-bold">DMVS Admin</h1>
                    </div>
                </div>
                <div className="p-4">
                    <ul>
                        <li className="mb-2">
                            <a href="/admindashboard" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded">
                                <i className="fas fa-th-large mr-3 text-gray-500"></i>
                                <span>Dashboard</span>
                            </a>
                        </li>
                        <li className="mb-2">
                            <a href="/manufacturertable" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded">
                                <i className="fas fa-users mr-3 text-gray-500"></i>
                                <span>Manufacturers</span>
                            </a>
                        </li>
                        <li className="mb-2">
                            <a href="/approvals" className="flex items-center px-4 py-3 text-gray-600 bg-gray-100 rounded">
                                <i className="fas fa-check-circle mr-3 text-gray-500"></i>
                                <span>Approvals</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 overflow-y-auto">
                <header className="bg-white shadow-sm">
                    <div className="flex justify-end items-center p-4">
                        <div className="relative">
                            <button className="p-1 rounded-full text-gray-400 hover:bg-gray-100 focus:outline-none mr-4">
                                <i className="fas fa-bell text-gray-600"></i>
                            </button>
                        </div>
                        <div className="flex items-center">
                            <button className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center text-white">
                                AD
                            </button>
                        </div>
                    </div>
                </header>

                <main className="p-6">
                    {/* Dashboard header */}
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">Approvals</h1>
                        <p className="text-gray-600">Review and manage pending manufacturer approval requests</p>
                    </div>

                    {/* Manufacturers Table Section */}
                    <div id="productsSection" className="mb-8 bg-white rounded-lg shadow-sm overflow-hidden p-6">
                        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                            <div className="flex bg-gray-100 px-3 py-2 rounded-md">
                                <i className="fas fa-search text-gray-400 mr-2 mt-1"></i>
                                <input
                                    type="text"
                                    placeholder="Search manufacturer..."
                                    className="bg-transparent border-none focus:outline-none text-sm"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manufacturer Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email Address</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredManufacturers.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-4 whitespace-nowrap text-center text-gray-500">
                                                No pending manufacturers found.
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredManufacturers.map((manufacturer) => (
                                            <tr key={manufacturer.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">{manufacturer.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{manufacturer.email}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{manufacturer.address}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{manufacturer.mobile}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() => handleViewManufacturer(manufacturer.id)}
                                                            className="text-gray-500 hover:text-gray-700 border border-gray-300 rounded px-2 py-1"
                                                        >
                                                            <i className="fas fa-eye mr-2"></i>
                                                            View
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Approvals;
