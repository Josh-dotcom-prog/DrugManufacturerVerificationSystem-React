import React from 'react'

const Batches = () => {
    return (
        <div class="flex h-screen overflow-hidden">
            <aside class="w-64 bg-white border-r border-gray-200 hidden md:block">
                <div class="p-6 flex items-center space-x-3 border-b border-gray-200">
                    <i class="fas fa-pills text-green-600 text-2xl"></i>
                    <h1 class="text-xl font-bold text-green-600">DMVS</h1>
                </div>

                <nav class="mt-6 px-3">
                    <a href="/manufacturersdashboard"
                        class="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-md mb-1">
                        <i class="fas fa-chart-line w-5 h-5 mr-3"></i>
                        <span class="font-medium">Dashboard</span>
                    </a>
                    <a href="/drugs" class="flex items-center px-4 py-3 text-green-600 hover:bg-gray-100 rounded-md mb-1">
                        <i class="fas fa-capsules w-5 h-5 mr-3"></i>
                        <span class="font-medium">Drug</span>
                    </a>
                    <a href="/batches" class="flex items-center px-4 py-3 text-gray-600 bg-green-50 rounded-md mb-1 border-l-4 border-green-600">
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


                {/* <!-- Products Table Section --> */}
                <div id="productsSection" class="mb-8 bg-white rounded-lg shadow-sm overflow-hidden p-6">
                    <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                        <h2 class="text-lg font-semibold">Registered Batches</h2>
                        <div class="flex bg-gray-100 px-3 py-2 rounded-md">
                            <i class="fas fa-search text-gray-400 mr-2 mt-1"></i>
                            <input type="text" placeholder="Search products..."
                                class="bg-transparent border-none focus:outline-none text-sm" />
                        </div>
                    </div>

                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr class="bg-gray-50">
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Drug Name</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Category</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Dosage Form</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Registration Date</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap">Amoxicillin</td>
                                    <td class="px-6 py-4 whitespace-nowrap">Antibiotic</td>
                                    <td class="px-6 py-4 whitespace-nowrap">Capsule</td>
                                    <td class="px-6 py-4 whitespace-nowrap">12 Jan 2025</td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span
                                            class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="flex space-x-2">
                                            <button class="text-gray-500 hover:text-gray-700 border border-gray-300 rounded px-2 py-1">
                                                <i class="fas fa-eye mr-2"></i>
                                                View
                                            </button>
                                            <button class="text-green-500 hover:text-green-700 border border-green-300 rounded px-2 py-1">
                                                <i class="fas fa-pen mr-2"></i>
                                                Edit
                                            </button>
                                            <button class="text-red-500 hover:text-red-700 border border-red-300 rounded px-2 py-1">
                                                <i class="fas fa-trash mr-2"></i>
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap">Paracetamol</td>
                                    <td class="px-6 py-4 whitespace-nowrap">Analgesic</td>
                                    <td class="px-6 py-4 whitespace-nowrap">Tablet</td>
                                    <td class="px-6 py-4 whitespace-nowrap">23 Nov 2024</td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span
                                            class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="flex space-x-2">
                                            <button class="text-gray-500 hover:text-gray-700 border border-gray-300 rounded px-2 py-1">
                                                <i class="fas fa-eye mr-2"></i>
                                                View
                                            </button>
                                            <button class="text-green-500 hover:text-green-700 border border-green-300 rounded px-2 py-1">
                                                <i class="fas fa-pen mr-2"></i>
                                                Edit
                                            </button>
                                            <button class="text-red-500 hover:text-red-700 border border-red-300 rounded px-2 py-1">
                                                <i class="fas fa-trash mr-2"></i>
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap">Ciprofloxacin</td>
                                    <td class="px-6 py-4 whitespace-nowrap">Antibiotic</td>
                                    <td class="px-6 py-4 whitespace-nowrap">Tablet</td>
                                    <td class="px-6 py-4 whitespace-nowrap">07 Feb 2025</td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span
                                            class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Expired</span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="flex space-x-2">
                                            <button class="text-gray-500 hover:text-gray-700 border border-gray-300 rounded px-2 py-1">
                                                <i class="fas fa-eye mr-2"></i>
                                                View
                                            </button>
                                            <button class="text-green-500 hover:text-green-700 border border-green-300 rounded px-2 py-1">
                                                <i class="fas fa-pen mr-2"></i>
                                                Edit
                                            </button>
                                            <button class="text-red-500 hover:text-red-700 border border-red-300 rounded px-2 py-1">
                                                <i class="fas fa-trash mr-2"></i>
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap">Metformin</td>
                                    <td class="px-6 py-4 whitespace-nowrap">Antidiabetic</td>
                                    <td class="px-6 py-4 whitespace-nowrap">Tablet</td>
                                    <td class="px-6 py-4 whitespace-nowrap">15 Dec 2024</td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span
                                            class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Expired</span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="flex space-x-2">
                                            <button class="text-gray-500 hover:text-gray-700 border border-gray-300 rounded px-2 py-1">
                                                <i class="fas fa-eye mr-2"></i>
                                                View
                                            </button>
                                            <button class="text-green-500 hover:text-green-700 border border-green-300 rounded px-2 py-1">
                                                <i class="fas fa-pen mr-2"></i>
                                                Edit
                                            </button>
                                            <button class="text-red-500 hover:text-red-700 border border-red-300 rounded px-2 py-1">
                                                <i class="fas fa-trash mr-2"></i>
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap">Diazepam</td>
                                    <td class="px-6 py-4 whitespace-nowrap">Sedative</td>
                                    <td class="px-6 py-4 whitespace-nowrap">Tablet</td>
                                    <td class="px-6 py-4 whitespace-nowrap">03 Sep 2024</td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span
                                            class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Expired</span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="flex space-x-2">
                                            <button class="text-gray-500 hover:text-gray-700 border border-gray-300 rounded px-2 py-1">
                                                <i class="fas fa-eye mr-2"></i>
                                                View
                                            </button>
                                            <button class="text-green-500 hover:text-green-700 border border-green-300 rounded px-2 py-1">
                                                <i class="fas fa-pen mr-2"></i>
                                                Edit
                                            </button>
                                            <button class="text-red-500 hover:text-red-700 border border-red-300 rounded px-2 py-1">
                                                <i class="fas fa-trash mr-2"></i>
                                                Delete
                                            </button>
                                        </div>
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

export default Batches;
