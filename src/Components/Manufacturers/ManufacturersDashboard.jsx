import React from 'react'

const ManufacturersDashboard = () => {
    return (
        <div class="flex h-screen overflow-hidden">
            <aside class="w-64 bg-white border-r border-gray-200 hidden md:block">
                <div class="p-6 flex items-center space-x-3 border-b border-gray-200">
                    <i class="fas fa-pills text-green-600 text-2xl"></i>
                    <h1 class="text-xl font-bold text-green-600">DMVS</h1>
                </div>

                <nav class="mt-6 px-3">
                    <a href="/manufacturersdashboard"
                        class="flex items-center px-4 py-3 text-green-600 bg-green-50 rounded-md mb-1 border-l-4 border-green-600">
                        <i class="fas fa-chart-line w-5 h-5 mr-3"></i>
                        <span class="font-medium">Dashboard</span>
                    </a>
                    <a href="/drugs" class="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-md mb-1">
                        <i class="fas fa-capsules w-5 h-5 mr-3"></i>
                        <span class="font-medium">Drugs</span>
                    </a>
                    <a href="/batches" class="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-md mb-1">
                        <i class="fas fa-barcode w-5 h-5 mr-3"></i>
                        <span class="font-medium">Batches</span>
                    </a>
                </nav>
            </aside>

            <main class="flex-1 overflow-y-auto">
                {/* <div class="p-6"> */}
                <div class="flex justify-between items-center mb-8 p-6 border-b border-gray-200">
                    <h1 class="text-2xl font-bold text-gray-800">Manufacturer Dashboard</h1>
                    <div class="flex items-center">
                        <div class="relative">
                            <button id="profileButton"
                                class="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold mr-3">
                                PM
                            </button>
                            <div id="profileDropdown"
                                class="hidden absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    <i class="fas fa-user mr-2"></i>Profile
                                </a>
                                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    <i class="fas fa-cog mr-2"></i>Settings
                                </a>
                                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    <i class="fas fa-bell mr-2"></i>Notifications
                                </a>

                                <a href="/Login.html" class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                                    <i class="fas fa-sign-out-alt mr-2"></i>Logout
                                </a>
                            </div>
                        </div>
                        <div>
                            <span class="mr-4">Welcome,
                                <strong class="text-green-600">Pharma Manufacturer</strong>
                            </span>
                            <a href="logout.php"
                                class="bg-white text-green-800 px-4 py-2 rounded-md font-medium hover:bg-green-100">Logout</a>
                        </div>
                    </div>
                </div>

                {/* <!-- Stats Cards --> */}
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8 p-6">
                    <div class="bg-white p-6 rounded-lg shadow-md relative overflow-hidden">
                        <h3 class="text-gray-500 text-sm font-medium mb-2">TOTAL DRUGS</h3>
                        <p class="text-3xl font-bold mb-1">37</p>
                        <p class="text-green-600 text-sm flex items-center">
                            <i class="fas fa-arrow-up mr-1"></i> 2 new this month
                        </p>
                        <i class="fas fa-capsules text-3xl text-green-100 absolute top-6 right-6"></i>
                    </div>

                    <div class="bg-white p-6 rounded-lg shadow-md relative overflow-hidden">
                        <h3 class="text-gray-500 text-sm font-medium mb-2">ACTIVE BATCHES</h3>
                        <p class="text-3xl font-bold mb-1">218</p>
                        <p class="text-green-600 text-sm flex items-center">
                            <i class="fas fa-arrow-up mr-1"></i> 15 new this month
                        </p>
                        <i class="fas fa-boxes text-3xl text-green-100 absolute top-6 right-6"></i>
                    </div>
                </div>

                {/* <!-- Tables --> */}
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* <!-- Pending Approvals --> */}
                    <div class="bg-white rounded-lg shadow overflow-hidden">
                        <div class="p-6 border-b border-gray-200">
                            <h3 class="text-lg font-medium">Recent Batches</h3>
                            <p class="text-gray-500 text-sm">Created Batches in the System</p>
                        </div>
                        <table class="min-w-full divide-y divide-gray-200">
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td class="px-6 py-4">
                                        <div class="flex items-center">
                                            <div class="flex-shrink-0 h-10 w-10 rounded-full bg-blue-200"></div>
                                            <div class="ml-4">
                                                <div class="text-sm font-medium text-gray-900">BTC202524</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 text-right">
                                        <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            Active
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4">
                                        <div class="flex items-center">
                                            <div class="flex-shrink-0 h-10 w-10 rounded-full bg-yellow-200"></div>
                                            <div class="ml-4">
                                                <div class="text-sm font-medium text-gray-900">BTC202524</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 text-right">
                                        <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            Active
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4">
                                        <div class="flex items-center">
                                            <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200"></div>
                                            <div class="ml-4">
                                                <div class="text-sm font-medium text-gray-900">BTC202524</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 text-right">
                                        <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                            Expired
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* <!-- Recent Drugs --> */}
                    <div class="bg-white rounded-lg shadow overflow-hidden">
                        <div class="p-6 border-b border-gray-200">
                            <h3 class="text-lg font-medium">Recent Drugs</h3>
                            <p class="text-gray-500 text-sm">Recently registered Drugs in the system</p>
                        </div>
                        <table class="min-w-full divide-y divide-gray-200">
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td class="px-6 py-4">
                                        <div class="flex items-center">
                                            <button id="profileButton"
                                                class="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold mr-3">
                                                C
                                            </button>
                                            <div class="ml-4">
                                                <div class="text-sm font-medium text-gray-900">Ciprofloxacin</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 text-right">
                                        <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            Active
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4">
                                        <div class="flex items-center">
                                            <button id="profileButton"
                                                class="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold mr-3">
                                                P
                                            </button>
                                            <div class="ml-4">
                                                <div class="text-sm font-medium text-gray-900">Paracetamol</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 text-right">
                                        <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            Active
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4">
                                        <div class="flex items-center">
                                            <button id="profileButton"
                                                class="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold mr-3">
                                                M
                                            </button>
                                            <div class="ml-4">
                                                <div class="text-sm font-medium text-gray-900">Metformin</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 text-right">
                                        <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            Active
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4">
                                        <div class="flex items-center">
                                            <button id="profileButton"
                                                class="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold mr-3">
                                                A
                                            </button>
                                            <div class="ml-4">
                                                <div class="text-sm font-medium text-gray-900">Amoxicillin</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 text-right">
                                        <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
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
