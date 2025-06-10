import React, { useEffect, useState } from 'react';
import api from '../../utils/axios';

const ManufacturersDashboard = () => {
    const [stats, setStats] = useState({ total: 0, active_count: 0, expired_count: 0 });
    const [activeDrugs, setActiveDrugs] = useState([]);
    const [expiredDrugs, setExpiredDrugs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('Unauthorized');

                const headers = {
                    Authorization: `Bearer ${token}`,
                };

                // 1. Fetch dashboard stats
                const dashboardRes = await api.get('/drug/dashboard', { headers });
                const dashboardData = dashboardRes.data;
                console.log('Fetched Dashboard Data:', dashboardData);

                // Set stats from dashboard response
                setStats({
                    total: dashboardData.total,
                    active_count: dashboardData.active_count,
                    expired_count: dashboardData.expired_count
                });

                // 2. Fetch all drugs to get detailed information
                const drugsRes = await api.get('/drug/drugs', { headers });
                const allDrugs = drugsRes.data;
                console.log('Fetched All Drugs:', allDrugs);

                // Function to check if drug is expired
                const isExpired = (expiryDate) => {
                    const today = new Date();
                    const expiry = new Date(expiryDate);
                    return expiry < today;
                };

                // Separate drugs into active and expired based on expiry date
                const activeDrugs = allDrugs.filter(drug => !isExpired(drug.expiry_date));
                const expiredDrugs = allDrugs.filter(drug => isExpired(drug.expiry_date));

                setActiveDrugs(activeDrugs);
                setExpiredDrugs(expiredDrugs);

                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Failed to load dashboard data.');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className="p-6 text-gray-600">Loading dashboard...</div>;
    if (error) return <div className="p-6 text-red-600">{error}</div>;

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
                <div className="p-6 flex items-center space-x-3 border-b border-gray-200">
                    <i className="fas fa-pills text-green-600 text-2xl"></i>
                    <h1 className="text-xl font-bold text-green-600">DMVS</h1>
                </div>

                <nav className="mt-6 px-3">
                    <a href="/manufacturersdashboard"
                        className="flex items-center px-4 py-3 text-green-600 bg-green-50 rounded-md mb-1 border-l-4 border-green-600">
                        <i className="fas fa-chart-line w-5 h-5 mr-3"></i>
                        <span className="font-medium">Dashboard</span>
                    </a>
                    <a href="/drugs" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-md mb-1">
                        <i className="fas fa-capsules w-5 h-5 mr-3"></i>
                        <span className="font-medium">Drugs</span>
                    </a>
                </nav>
            </aside>

            <main className="flex-1 overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8 p-6 border-b border-gray-200">
                    <h1 className="text-2xl font-bold text-gray-800">Manufacturer Dashboard</h1>
                    <div className="flex items-center">
                        <span className="mr-4">
                            Welcome, <strong className="text-green-600">Pharma</strong>
                        </span>
                        <a href="/login" className="bg-white text-green-800 px-4 py-2 rounded-md font-medium hover:bg-green-100">Logout</a>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 p-6">
                    <StatCard title="TOTAL DRUGS" count={stats.total} color="yellow" icon="fas fa-capsules" />
                    <StatCard title="ACTIVE DRUGS" count={stats.active_count} color="green" icon="fas fa-boxes" />
                    <StatCard title="EXPIRED DRUGS" count={stats.expired_count} color="red" icon="fas fa-capsules" />
                </div>

                {/* Tables */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-6 pb-6">
                    <DrugTable title="Expired Drugs" description="Expired Drugs in the System" drugs={expiredDrugs} status="expired" />
                    <DrugTable title="Active Drugs" description="Active Drugs in the System" drugs={activeDrugs} status="active" />
                </div>
            </main>
        </div>
    );
};

// 🔹 Stat Card Component
const StatCard = ({ title, count, color, icon }) => (
    <div className="bg-white p-6 rounded-lg shadow-md relative overflow-hidden">
        <h3 className={`text-${color}-500 text-sm font-medium mb-2`}>{title}</h3>
        <p className="text-3xl font-bold mb-1">{count}</p>
        <i className={`${icon} text-3xl text-${color}-100 absolute top-6 right-6`}></i>
    </div>
);

// 🔹 Drug Table Component
const DrugTable = ({ title, description, drugs, status }) => (
    <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="text-gray-500 text-sm">{description}</p>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Drug Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Batch Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Expiry Date
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {drugs.map((drug, index) => (
                    <tr key={drug.id || index}>
                        <td className="px-6 py-4">
                            <div className="flex items-center">
                                <button className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold mr-3">
                                    {drug.name?.charAt(0)?.toUpperCase() || 'D'}
                                </button>
                                <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">{drug.name}</div>
                                    <div className="text-sm text-gray-500">{drug.category}</div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                            {drug.batch_number}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                            {new Date(drug.expiry_date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-right">
                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${status === 'expired' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                                }`}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </span>
                        </td>
                    </tr>
                ))}
                {drugs.length === 0 && (
                    <tr>
                        <td className="px-6 py-4 text-gray-500 text-center" colSpan={4}>
                            No {status} drugs found.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
);

export default ManufacturersDashboard;