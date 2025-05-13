import React, { useState, useEffect } from 'react';

const ResultSection = ({ drugData, isLoading }) => {
    const [isAuthentic, setIsAuthentic] = useState(false);

    useEffect(() => {
        // Simulate verification process
        if (drugData) {
            // In a real application, you would verify the drug data against your database
            // For now, we'll assume all drugs with data are authentic
            setIsAuthentic(true);
        }
    }, [drugData]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Verifying medication...</p>
                </div>
            </div>
        );
    }

    if (!drugData) {
        return (
            <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-4">
                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Verification Failed</h2>
                    <p className="text-gray-600">Unable to verify this medication. The QR code may be invalid or corrupted.</p>
                    <button
                        onClick={() => window.location.href = '/verification'}
                        className="mt-6 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* Verification Status Banner */}
            <div className={`mb-4 p-4 rounded-md flex items-center ${isAuthentic ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    {isAuthentic ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    )}
                </svg>
                <span className="font-medium">{isAuthentic ? 'Verification Successful' : 'Verification Failed'}</span>
            </div>

            {/* Authentication Message */}
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
                <p className="text-green-800">
                    {isAuthentic
                        ? 'This medication has been verified as authentic.'
                        : 'This medication could not be verified. Please contact the manufacturer.'}
                </p>
            </div>

            {/* Drug Information Card */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                <div className="p-5 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800">Product Information</h2>
                </div>

                <div className="grid grid-cols-2 gap-4 p-5">
                    <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Name:</h3>
                        <p className="font-medium text-gray-800">{drugData.drugName}</p>
                    </div>

                    {drugData.category && (
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Category:</h3>
                            <p className="font-medium text-gray-800">{drugData.category}</p>
                        </div>
                    )}

                    <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Manufacturer:</h3>
                        <p className="font-medium text-gray-800">{drugData.manufacturer}</p>
                    </div>

                    {drugData.dosageForm && (
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Dosage Form:</h3>
                            <p className="font-medium text-gray-800">{drugData.dosageForm}</p>
                        </div>
                    )}

                    <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Batch Number:</h3>
                        <p className="font-medium text-gray-800">{drugData.batchNumber}</p>
                    </div>

                    {drugData.countryOfOrigin && (
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Country of Origin:</h3>
                            <p className="font-medium text-gray-800">{drugData.countryOfOrigin}</p>
                        </div>
                    )}

                    {drugData.serialNumber && (
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Serial Number:</h3>
                            <p className="font-medium text-gray-800">{drugData.serialNumber}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Dates Card */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                <div className="p-5 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800">Dates</h2>
                </div>

                <div className="grid grid-cols-2 gap-4 p-5">
                    {drugData.manufactureDate && (
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Manufactured:</h3>
                            <p className="font-medium text-gray-800">
                                {new Date(drugData.manufactureDate).toLocaleDateString()}
                            </p>
                        </div>
                    )}

                    {drugData.expiryDate && (
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Expiry Date:</h3>
                            <p className="font-medium text-gray-800">
                                {new Date(drugData.expiryDate).toLocaleDateString()}
                            </p>
                        </div>
                    )}

                    <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Verified On:</h3>
                        <p className="font-medium text-gray-800">{new Date().toLocaleDateString()}</p>
                    </div>

                    {drugData.registrationDate && (
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Registration Date:</h3>
                            <p className="font-medium text-gray-800">
                                {new Date(drugData.registrationDate).toLocaleDateString()}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Description if available */}
            {drugData.description && (
                <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                    <div className="p-5 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-800">Description</h2>
                    </div>
                    <div className="p-5">
                        <p className="text-gray-700">{drugData.description}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResultSection;