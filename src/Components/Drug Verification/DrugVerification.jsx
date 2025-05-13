import React, { useState, useEffect } from 'react';
import ResultSection from './ResultSection';
import { useLocation } from 'react-router-dom';

const DrugVerification = () => {
    const [drugData, setDrugData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();

    useEffect(() => {
        // Extract data from URL query parameters or other sources
        const getData = () => {
            try {
                // Check if data is in URL query
                const queryParams = new URLSearchParams(location.search);
                const qrData = queryParams.get('data');

                if (qrData) {
                    const parsedData = JSON.parse(decodeURIComponent(qrData));
                    return parsedData;
                }

                // Check if data is in location state (for internal navigation)
                if (location.state && location.state.drugData) {
                    return location.state.drugData;
                }

                // No data found
                setError('No drug data provided');
                return null;
            } catch (err) {
                console.error('Error parsing drug data:', err);
                setError('Invalid drug data format');
                return null;
            }
        };

        // Simulate API call delay
        setTimeout(() => {
            const extractedData = getData();
            setDrugData(extractedData);
            setLoading(false);
        }, 1000);
    }, [location]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <i className="fas fa-shield-alt text-green-600 text-2xl"></i>
                        </div>
                        <h1 className="ml-3 text-2xl font-bold text-gray-800">Drug Verification System</h1>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {error ? (
                    <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800">Verification Error</h3>
                                <p className="text-sm text-red-700 mt-1">{error}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <ResultSection drugData={drugData} isLoading={loading} />
                )}

                {/* Back button */}
                <div className="mt-8 flex justify-center">
                    <button
                        onClick={() => window.history.back()}
                        className="text-green-600 hover:text-green-800 font-medium flex items-center"
                    >
                        <i className="fas fa-arrow-left mr-2"></i> Go Back
                    </button>
                </div>
            </main>
        </div>
    );
};

export default DrugVerification;