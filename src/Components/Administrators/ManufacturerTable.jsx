import React from 'react';

const ManufacturerTable = () => {
    return (

        <div class="flex h-screen overflow-hidden">
            {/* <!-- Sidebar navigation --> */}
            <div class="w-64 border-r border-gray-200 bg-white">
                <div class="p-4 border-b border-gray-200">
                    <div class="flex items-center justify-between">
                        <h1 class="text-xl font-bold">DMVS Admin</h1>
                    </div>
                </div>
                <div class="p-4">
                    <ul>
                        <li class="mb-2">
                            <a href="/admindashboard" class="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded">
                                <i class="fas fa-th-large mr-3 text-gray-500"></i>
                                <span>Dashboard</span>
                            </a>
                        </li>
                        <li class="mb-2">
                            <a href="/manufacturertable" class="flex items-center px-4 py-3 text-gray-600 bg-gray-100 rounded">
                                <i class="fas fa-users mr-3 text-gray-500"></i>
                                <span>Manufacturers</span>
                            </a>
                        </li>
                        <li class="mb-2">
                            <a href="/approvals" class="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded">
                                <i class="fas fa-check-circle mr-3 text-gray-500"></i>
                                <span>Approvals</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* <!-- Main content --> */}
            <div class="flex-1 overflow-y-auto">
                <header class="bg-white shadow-sm">
                    <div class="flex justify-end items-center p-4">
                        <div class="relative">
                            <button class="p-1 rounded-full text-gray-400 hover:bg-gray-100 focus:outline-none mr-4">
                                <i class="fas fa-bell text-gray-600"></i>
                            </button>
                        </div>
                        <div class="flex items-center">
                            <button class="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center text-white">
                                AD
                            </button>
                        </div>
                    </div>
                </header>

                <main class="p-6">
                    {/* <!-- Dashboard header --> */}
                    <div class="mb-6">
                        <h1 class="text-2xl font-bold text-gray-900">Manufacturers</h1>
                        <p class="text-gray-600">Manage and view all registered manufacturers in the system</p>
                    </div>

                    {/* <!-- Manufacturers Table Section --> */}
                    <div id="productsSection" class="mb-8 bg-white rounded-lg shadow-sm overflow-hidden p-6">
                        <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                            <div class="flex bg-gray-100 px-3 py-2 rounded-md">
                                <i class="fas fa-search text-gray-400 mr-2 mt-1"></i>
                                <input type="text" placeholder="Search manufacturer..."
                                    class="bg-transparent border-none focus:outline-none text-sm" />
                            </div>
                        </div>

                        <div class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr class="bg-gray-50">
                                        <th
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Manufacturer Name</th>
                                        <th
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Email Address</th>
                                        <th
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Address</th>
                                        <th
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Registration Date</th>

                                        <th
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                    <tr>
                                        <td class="px-6 py-4 whitespace-nowrap">Abacus</td>
                                        <td class="px-6 py-4 whitespace-nowrap">info@abacus.ac.ug</td>
                                        <td class="px-6 py-4 whitespace-nowrap">Nakawa,Kampala</td>
                                        <td class="px-6 py-4 whitespace-nowrap">31 May, 2025</td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <span
                                                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Approved</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </div>




    )
}

export default ManufacturerTable;