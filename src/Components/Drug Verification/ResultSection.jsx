import React from 'react';

const ResultSection = ({ drugData, isLoading }) => {
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                <span className="ml-3">Verifying drug information...</span>
            </div>
        );
    }

    if (!drugData) {
        return (
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                <p className="text-yellow-800">No drug data available for verification</p>
            </div>
        );
    }

    return (
        <section className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden mb-12">
            <div className={`py-3 px-4 ${drugData.verified ? 'bg-green-700' : 'bg-red-700'} text-white`}>
                <h2 className="text-xl font-semibold">
                    {drugData.verified ? 'Verification Successful' : 'Verification Failed'}
                </h2>
            </div>
            <div className="p-6">
                {drugData.verified ? (
                    <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-md flex items-center">
                        <span className="text-green-600 text-2xl mr-2">✓</span>
                        <span>Authentic Product Verified</span>
                    </div>
                ) : (
                    <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-md flex items-center">
                        <span className="text-red-600 text-2xl mr-2">✗</span>
                        <span>Warning: This product could not be verified</span>
                    </div>
                )}

                <div className="border rounded-md overflow-hidden">
                    <table className="w-full">
                        <tbody>
                            <tr className="border-b">
                                <td className="py-2 px-4 bg-gray-50 font-medium">Product Name</td>
                                <td className="py-2 px-4">{drugData.drug_name || 'Unknown'}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 px-4 bg-gray-50 font-medium">Strength</td>
                                <td className="py-2 px-4">{drugData.strength || 'Unknown'}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 px-4 bg-gray-50 font-medium">Manufacturer</td>
                                <td className="py-2 px-4">{drugData.manufacturer || 'Unknown'}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 px-4 bg-gray-50 font-medium">Batch Number</td>
                                <td className="py-2 px-4">{drugData.batch_number || 'Unknown'}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 px-4 bg-gray-50 font-medium">Manufacture Date</td>
                                <td className="py-2 px-4">{drugData.manufacture_date || 'Unknown'}</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 bg-gray-50 font-medium">Expiry Date</td>
                                <td className="py-2 px-4">{drugData.expiry_date || 'Unknown'}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 text-sm text-gray-600">
                    <p>Verified on: {new Date(drugData.verification_date || Date.now()).toLocaleString()}</p>
                </div>
            </div>
        </section>
    );
};

export default ResultSection;