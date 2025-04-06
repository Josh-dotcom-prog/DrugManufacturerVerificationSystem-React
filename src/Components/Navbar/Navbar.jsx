import React from 'react'
const Navbar = () => {
    return (
        <nav class="bg-green-800 text-white shadow-lg">
            <div class="container mx-auto px-4 py-3 flex justify-between items-center">
                <div class="flex items-center space-x-2">
                    <i class="fas fa-pills text-white text-2xl"></i>
                    <span class="text-xl font-bold">DMVS</span>
                </div>

                <div>
                    <a href="Login.html">
                        <button class="bg-white text-green-800 px-4 py-2 rounded-md font-medium hover:bg-green-100">Login</button>
                    </a>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
