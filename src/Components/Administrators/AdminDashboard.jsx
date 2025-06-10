import React, { useEffect, useState } from 'react';
import api from '../../utils/axios';

const AdminDashboard = () => {
    const [approved, setApproved] = useState([]);
    const [pending, setPending] = useState([]);
    const [rejected, setRejected] = useState([]);
    const [counts, setCounts] = useState({
        approved_count: 0,
        pending_count: 0,
        rejected_count: 0,
        total: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('Unauthorized');

                const headers = {
                    Authorization: `Bearer ${token}`,
                };
                setLoading(true);

                const response = await api.get(`/admin/dashboard`, { headers });
                const data = response.data;
                console.log('Fetched Dashboard Data:', data);

                setApproved(data.approved);
                setPending(data.pending);
                setRejected(data.rejected);

                setCounts({
                    approved_count: data.approved_count,
                    pending_count: data.pending_count,
                    rejected_count: data.rejected_count,
                    total: data.total,
                });

            } catch (err) {
                console.error('Error fetching dashboard data:', err);
                setError('Failed to load dashboard data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className="p-6">Loading data...</div>;
    if (error) return <div className="p-6 text-red-600">{error}</div>;

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar navigation */}
            <div className="w-64 border-r border-gray-200 bg-white">
                <div className="p-4 border-b border-gray-200">
                    <h1 className="text-xl font-bold">DMVS Admin</h1>
                </div>
                <div className="p-4">
                    <ul>
                        <li className="mb-2">
                            <a href="/admindashboard" className="flex items-center px-4 py-3 text-gray-700 bg-gray-100 rounded">
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
                            <a href="/approval" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded">
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
                        <button className="p-1 rounded-full text-gray-400 hover:bg-gray-100 focus:outline-none mr-4">
                            <i className="fas fa-bell text-gray-600"></i>
                        </button>
                        <button className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center text-white">
                            AD
                        </button>
                    </div>
                </header>

                <main className="p-6">
                    {/* Dashboard header */}
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                        <p className="text-gray-600">Overview of the Drug Manufacturer Verification System</p>
                    </div>

                    {/* Stat cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-gray-600">Total Manufacturers</h3>
                            <h2 className="text-3xl font-bold">{counts.total}</h2>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-gray-600">Pending Approvals</h3>
                            <h2 className="text-3xl font-bold">{counts.pending_count}</h2>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-gray-600">Approved Manufacturers</h3>
                            <h2 className="text-3xl font-bold">{counts.approved_count}</h2>
                        </div>
                    </div>

                    {/* Pending Approvals Table */}
                    <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-lg font-bold">Pending Approvals</h3>
                            <p className="text-gray-500 text-sm">Manufacturers waiting for verification approval</p>
                        </div>
                        <table className="min-w-full divide-y divide-gray-200">
                            <tbody className="bg-white divide-y divide-gray-200">
                                {pending.map(manufacturer => (
                                    <tr key={manufacturer.id}>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200"></div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{manufacturer.name}</div>
                                                    <div className="text-sm text-gray-500">{manufacturer.email}</div>
                                                    <div className="text-sm text-gray-500">{manufacturer.mobile}</div>
                                                    <div className="text-sm text-gray-500">{manufacturer.address}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                                pending
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Approved Manufacturers Table */}
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-lg font-bold">Approved Manufacturers</h3>
                            <p className="text-gray-500 text-sm">Recently registered manufacturers in the system</p>
                        </div>
                        <table className="min-w-full divide-y divide-gray-200">
                            <tbody className="bg-white divide-y divide-gray-200">
                                {approved.map(manufacturer => (
                                    <tr key={manufacturer.id}>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200"></div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{manufacturer.name}</div>
                                                    <div className="text-sm text-gray-500">{manufacturer.email}</div>
                                                    <div className="text-sm text-gray-500">{manufacturer.mobile}</div>
                                                    <div className="text-sm text-gray-500">{manufacturer.address}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                approved
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
