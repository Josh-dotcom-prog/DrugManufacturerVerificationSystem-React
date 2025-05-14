// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-green-800 text-white shadow-lg">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <i className="fas fa-pills text-white text-2xl"></i>
                    <span className="text-xl font-bold">DMVS</span>
                    {/* <span className="hidden md:inline-block text-sm bg-green-600 px-2 py-1 rounded ml-2">
                        Manufacturer Portal
                    </span> */}
                </div>
                <div>
                    <Link
                        to="/login"
                        className="bg-white text-green-800 px-4 py-2 rounded-md font-medium hover:bg-green-100 sm:hidden"
                    >
                        Are You a Manufacturer?
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
