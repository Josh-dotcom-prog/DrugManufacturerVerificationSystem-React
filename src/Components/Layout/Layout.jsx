import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from "../Navbar/Navbar";


function Layout() {
    const location = useLocation();

    // List of paths where the navbar should be hidden
    const hideNavbarPaths = [
        '/userregistration',
        '/adminlogin',
        '/admindashboard',
        '/manufacturers',
    ];

    // Check if the current path should hide the navbar
    const hideNavbar = hideNavbarPaths.includes(location.pathname);

    return (
        <div>
            {/* Only render Navbar if not on a path in hideNavbarPaths */}
            {!hideNavbar && <Navbar />}
            <main className="p-4">
                {/* The Outlet renders the matched child route */}
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
