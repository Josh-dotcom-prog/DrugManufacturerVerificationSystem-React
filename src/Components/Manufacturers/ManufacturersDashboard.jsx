import React from 'react'

const ManufacturersDashboard = () => {
    return (
        <div className="flex h-screen overflow-hidden">
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
                {/* <div className="p-6"> */}
                <div className="flex justify-between items-center mb-8 p-6 border-b border-gray-200">
                    <h1 className="text-2xl font-bold text-gray-800">Manufacturer Dashboard</h1>
                    <div className="flex items-center">
                        <div className="relative">
                            <button id="profileButton"
                                className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold mr-3">
                                PM
                            </button>
                            <div id="profileDropdown"
                                className="hidden absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
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

                {/* <!-- Stats Cards --> */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-8 p-6">
                    <div className="bg-white p-6 rounded-lg shadow-md relative overflow-hidden">
                        <h3 className="text-yellow-500 text-sm font-medium mb-2">TOTAL DRUGS</h3>
                        <p className="text-3xl font-bold mb-1">37</p>
                        <p className="text-yellow-600 text-sm flex items-center">
                            <i className="fas fa-arrow-up mr-1"></i> 2 new this month
                        </p>
                        <i className="fas fa-capsules text-3xl text-yellow-100 absolute top-6 right-6"></i>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md relative overflow-hidden">
                        <h3 className="text-green-500 text-sm font-medium mb-2">ACTIVE DRUGS</h3>
                        <p className="text-3xl font-bold mb-1">218</p>
                        <p className="text-green-600 text-sm flex items-center">
                            <i className="fas fa-arrow-up mr-1"></i> 15 new this month
                        </p>
                        <i className="fas fa-boxes text-3xl text-green-100 absolute top-6 right-6"></i>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md relative overflow-hidden">
                        <h3 className="text-red-500 text-sm font-medium mb-2">EXPIRED DRUGS</h3>
                        <p className="text-3xl font-bold mb-1">34</p>
                        <p className="text-green-600 text-sm flex items-center">
                            <i className="fas fa-arrow-up mr-1"></i> 10 new this month
                        </p>
                        <i className="fas fa-capsules text-3xl text-red-100 absolute top-6 right-6"></i>
                    </div>
                </div>

                {/* <!-- Tables --> */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* <!-- Pending Approvals --> */}
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-lg font-medium">Expired Drugs</h3>
                            <p className="text-gray-500 text-sm">Expired Drugs in the System</p>
                        </div>
                        <table className="min-w-full divide-y divide-gray-200">
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-200"></div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">BTC202524</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            Active
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-yellow-200"></div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">BTC202524</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            Active
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200"></div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">BTC202524</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                            Expired
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* <!-- Recent Drugs --> */}
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-lg font-medium">Recent Drugs</h3>
                            <p className="text-gray-500 text-sm">Recently registered Drugs in the system</p>
                        </div>
                        <table className="min-w-full divide-y divide-gray-200">
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <button id="profileButton"
                                                className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold mr-3">
                                                C
                                            </button>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">Ciprofloxacin</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            Active
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <button id="profileButton"
                                                className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold mr-3">
                                                P
                                            </button>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">Paracetamol</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            Active
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <button id="profileButton"
                                                className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold mr-3">
                                                M
                                            </button>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">Metformin</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            Active
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <button id="profileButton"
                                                className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold mr-3">
                                                A
                                            </button>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">Amoxicillin</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            Active
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default ManufacturersDashboard;
