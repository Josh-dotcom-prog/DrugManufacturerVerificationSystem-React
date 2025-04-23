import React from 'react'

const AdminDashboard = () => {
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
                            <a href="/admindashboard" class="flex items-center px-4 py-3 text-gray-700 bg-gray-100 rounded">
                                <i class="fas fa-th-large mr-3 text-gray-500"></i>
                                <span>Dashboard</span>
                            </a>
                        </li>
                        <li class="mb-2">
                            <a href="/manufacturertable" class="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded">
                                <i class="fas fa-users mr-3 text-gray-500"></i>
                                <span>Manufacturers</span>
                            </a>
                        </li>
                        <li class="mb-2">
                            <a href="/approval" class="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded">
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
                        <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
                        <p class="text-gray-600">Overview of the Drug Manufacturer Verification System</p>
                    </div>

                    {/* <!-- Stat cards --> */}
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {/* <!-- Total Manufacturers --> */}
                        <div class="bg-white rounded-lg shadow p-6">
                            <div class="flex justify-between items-center mb-4">
                                <h3 class="text-gray-600">Total Manufacturers</h3>
                                <span class="text-gray-500"><i class="fas fa-users"></i></span>
                            </div>
                            <div class="flex items-baseline">
                                <h2 class="text-3xl font-bold">142</h2>
                            </div>
                            <div class="flex items-center mt-2">
                                <span class="text-green-500 text-sm mr-1"><i class="fas fa-arrow-up"></i> 12%</span>
                                <span class="text-gray-500 text-sm">from last month</span>
                            </div>
                        </div>

                        {/* <!-- Pending Approvals --> */}
                        <div class="bg-white rounded-lg shadow p-6">
                            <div class="flex justify-between items-center mb-4">
                                <h3 class="text-gray-600">Pending Approvals</h3>
                                <span class="text-gray-500"><i class="fas fa-clock"></i></span>
                            </div>
                            <div class="flex items-baseline">
                                <h2 class="text-3xl font-bold">23</h2>
                            </div>
                            <div class="flex items-center mt-2">
                                <span class="text-gray-500 text-sm">5 new requests today</span>
                            </div>
                        </div>

                        {/* <!-- Approved Manufacturers --> */}
                        <div class="bg-white rounded-lg shadow p-6">
                            <div class="flex justify-between items-center mb-4">
                                <h3 class="text-gray-600">Approved Manufacturers</h3>
                                <span class="text-gray-500"><i class="fas fa-check"></i></span>
                            </div>
                            <div class="flex items-baseline">
                                <h2 class="text-3xl font-bold">119</h2>
                            </div>
                            <div class="flex items-center mt-2">
                                <span class="text-green-500 text-sm mr-1"><i class="fas fa-arrow-up"></i> 8%</span>
                                <span class="text-gray-500 text-sm">from last month</span>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Tables --> */}
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* <!-- Pending Approvals --> */}
                        <div class="bg-white rounded-lg shadow overflow-hidden">
                            <div class="p-6 border-b border-gray-200">
                                <h3 class="text-lg font-medium">Pending Approvals</h3>
                                <p class="text-gray-500 text-sm">Manufacturers waiting for verification approval</p>
                            </div>
                            <table class="min-w-full divide-y divide-gray-200">
                                <tbody class="bg-white divide-y divide-gray-200">
                                    <tr>
                                        <td class="px-6 py-4">
                                            <div class="flex items-center">
                                                <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200"></div>
                                                <div class="ml-4">
                                                    <div class="text-sm font-medium text-gray-900">MediCorp Industries</div>
                                                    <div class="text-sm text-gray-500">info@medicorp.com</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 text-right">
                                            <button class="p-1 rounded-full text-green-500 hover:bg-gray-100 mr-2">
                                                <i class="fas fa-check"></i>
                                            </button>
                                            <button class="p-1 rounded-full text-red-500 hover:bg-gray-100">
                                                <i class="fas fa-times"></i>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="px-6 py-4">
                                            <div class="flex items-center">
                                                <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200"></div>
                                                <div class="ml-4">
                                                    <div class="text-sm font-medium text-gray-900">PharmaTech Solutions</div>
                                                    <div class="text-sm text-gray-500">contact@pharmatech.com</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 text-right">
                                            <button class="p-1 rounded-full text-green-500 hover:bg-gray-100 mr-2">
                                                <i class="fas fa-check"></i>
                                            </button>
                                            <button class="p-1 rounded-full text-red-500 hover:bg-gray-100">
                                                <i class="fas fa-times"></i>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="px-6 py-4">
                                            <div class="flex items-center">
                                                <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200"></div>
                                                <div class="ml-4">
                                                    <div class="text-sm font-medium text-gray-900">Global Health Labs</div>
                                                    <div class="text-sm text-gray-500">admin@globalhealth.com</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 text-right">
                                            <button class="p-1 rounded-full text-green-500 hover:bg-gray-100 mr-2">
                                                <i class="fas fa-check"></i>
                                            </button>
                                            <button class="p-1 rounded-full text-red-500 hover:bg-gray-100">
                                                <i class="fas fa-times"></i>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* <!-- Recent Manufacturers --> */}
                        <div class="bg-white rounded-lg shadow overflow-hidden">
                            <div class="p-6 border-b border-gray-200">
                                <h3 class="text-lg font-medium">Recent Manufacturers</h3>
                                <p class="text-gray-500 text-sm">Recently registered manufacturers in the system</p>
                            </div>
                            <table class="min-w-full divide-y divide-gray-200">
                                <tbody class="bg-white divide-y divide-gray-200">
                                    <tr>
                                        <td class="px-6 py-4">
                                            <div class="flex items-center">
                                                <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200"></div>
                                                <div class="ml-4">
                                                    <div class="text-sm font-medium text-gray-900">Acme Pharmaceuticals</div>
                                                    <div class="text-sm text-gray-500">contact@acmepharma.com</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 text-right">
                                            <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                approved
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="px-6 py-4">
                                            <div class="flex items-center">
                                                <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200"></div>
                                                <div class="ml-4">
                                                    <div class="text-sm font-medium text-gray-900">MediCorp Industries</div>
                                                    <div class="text-sm text-gray-500">info@medicorp.com</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 text-right">
                                            <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                                pending
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="px-6 py-4">
                                            <div class="flex items-center">
                                                <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200"></div>
                                                <div class="ml-4">
                                                    <div class="text-sm font-medium text-gray-900">HealthGen Labs</div>
                                                    <div class="text-sm text-gray-500">support@healthgen.com</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 text-right">
                                            <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                approved
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="px-6 py-4">
                                            <div class="flex items-center">
                                                <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200"></div>
                                                <div class="ml-4">
                                                    <div class="text-sm font-medium text-gray-900">BioTech Solutions</div>
                                                    <div class="text-sm text-gray-500">admin@biotech.com</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 text-right">
                                            <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                rejected
                                            </span>
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

export default AdminDashboard
