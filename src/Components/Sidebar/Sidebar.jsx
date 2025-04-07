import React from 'react'

function Sidebar() {
    return (
        <div class="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <aside class="w-64 bg-white border-r border-gray-200 hidden md:block">
                <div class="p-6 flex items-center space-x-3 border-b border-gray-200">
                    <i class="fas fa-pills text-blue-600 text-2xl"></i>
                    <h1 class="text-xl font-bold text-blue-600">DMVS</h1>
                </div>

                <nav class="mt-6 px-3">
                    <a href="#"
                        class="flex items-center px-4 py-3 text-blue-600 bg-blue-50 rounded-md mb-1 border-l-4 border-blue-600">
                        <i class="fas fa-chart-line w-5 h-5 mr-3"></i>
                        <span class="font-medium">Dashboard</span>
                    </a>
                    <a href="#" class="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-md mb-1">
                        <i class="fas fa-capsules w-5 h-5 mr-3"></i>
                        <span class="font-medium">Products</span>
                    </a>
                    <a href="#" class="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-md mb-1">
                        <i class="fas fa-barcode w-5 h-5 mr-3"></i>
                        <span class="font-medium">Batches</span>
                    </a>
                    <a href="#" class="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-md mb-1">
                        <i class="fas fa-cog w-5 h-5 mr-3"></i>
                        <span class="font-medium">Settings</span>
                    </a>
                </nav>
            </aside>
        </div>
    )
}

export default Sidebar
