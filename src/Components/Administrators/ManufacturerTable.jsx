import React, { useEffect, useState } from 'react';
import api from '../../utils/axios';

const ManufacturerTable = () => {
    const [manufacturers, setManufacturers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        const fetchManufacturers = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('Unauthorized');

                const headers = {
                    Authorization: `Bearer ${token}`,
                };
                setLoading(true);

                const response = await api.get('/admin/manufactures', { headers });
                const data = response.data;

                // Combine approved and pending arrays into one
                const combined = [...data.approved, ...data.pending];
                setManufacturers(combined);
            } catch (err) {
                setError('Failed to load manufacturers data');
            } finally {
                setLoading(false);
            }
        };

        fetchManufacturers();
    }, []);

    // Filter manufacturers based on search term
    const filteredManufacturers = manufacturers.filter((m) =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.address.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="p-6">Loading...</div>;
    if (error) return <div className="p-6 text-red-600">{error}</div>;

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
                            <a
                                href="/admindashboard"
                                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded"
                            >
                                <i className="fas fa-th-large mr-3 text-gray-500"></i>
                                <span>Dashboard</span>
                            </a>
                        </li>
                        <li className="mb-2">
                            <a
                                href="/manufacturertable"
                                className="flex items-center px-4 py-3 text-gray-600 bg-gray-100 rounded"
                            >
                                <i className="fas fa-users mr-3 text-gray-500"></i>
                                <span>Manufacturers</span>
                            </a>
                        </li>
                        <li className="mb-2">
                            <a
                                href="/approvals"
                                className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded"
                            >
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
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">Manufacturers</h1>
                        <p className="text-gray-600">
                            Manage and view all registered manufacturers in the system
                        </p>
                    </div>

                    {/* Search input */}
                    <div
                        id="productsSection"
                        className="mb-8 bg-white rounded-lg shadow-sm overflow-hidden p-6"
                    >
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
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Manufacturer Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Email Address
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Address
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Mobile
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredManufacturers.length > 0 ? (
                                        filteredManufacturers.map((manufacturer) => (
                                            <tr key={manufacturer.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {manufacturer.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {manufacturer.email}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {manufacturer.address}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {manufacturer.mobile}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span
                                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${manufacturer.approved === 'approved'
                                                            ? 'bg-green-100 text-green-800'
                                                            : manufacturer.approved === 'pending'
                                                                ? 'bg-yellow-100 text-yellow-800'
                                                                : 'bg-gray-100 text-gray-800'
                                                            }`}
                                                    >
                                                        {manufacturer.approved.charAt(0).toUpperCase() +
                                                            manufacturer.approved.slice(1)}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="text-center py-4 text-gray-500 italic"
                                            >
                                                No manufacturers found.
                                            </td>
                                        </tr>
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

export default ManufacturerTable;
