import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav class="bg-green-800 text-white shadow-lg">
            <div class="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* logo */}
                <div class="flex items-center space-x-2">
                    <i class="fas fa-pills text-white text-2xl"></i>
                    <span class="text-xl font-bold">DMVS</span>
                    <span className="hidden md:inline-block text-sm bg-green-600 px-2 py-1 rounded ml-2">
                        Manufacturer Portal
                    </span>
                </div>

                {/* login */}
                <div>
                    <Link
                        to="/login"
                        className="bg-white text-green-800 px-4 py-2 rounded-md font-medium hover:bg-green-100"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
