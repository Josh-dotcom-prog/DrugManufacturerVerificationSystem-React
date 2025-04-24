import React from 'react';

const ResultSection = ({ scanResult }) => {
    // Mock verification function - in a real app, this would check against a database
    const verifyDrug = (code) => {
        // For demo purposes: if code contains "FAKE" or "INVALID" it's not authentic
        return !code.includes("FAKE") && !code.includes("INVALID");
    };

    const isAuthentic = verifyDrug(scanResult);

    return (
        <section className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden mb-12">
            {isAuthentic ? (
                // Authentic Drug Card
                <>
                    <div className="bg-green-600 text-white py-3 px-4 flex items-center">
                        <div className="mr-2">✓</div>
                        <h2 className="text-xl font-semibold">Verification Successful</h2>
                    </div>
                    <div className="p-6">
                        <div className="bg-green-50 p-4 rounded-md mb-6 border border-green-200">
                            <p className="text-green-800">This medication has been verified as authentic.</p>
                            <p className="text-gray-600 mt-2">QR Code: {scanResult}</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-semibold text-lg mb-3">Product Information</h3>
                                <ul className="space-y-2">
                                    <li className="flex">
                                        <span className="font-medium w-32 text-gray-600">Name:</span>
                                        <span>Amoxicillin 500mg</span>
                                    </li>
                                    <li className="flex">
                                        <span className="font-medium w-32 text-gray-600">Manufacturer:</span>
                                        <span>PharmaCo Ltd.</span>
                                    </li>
                                    <li className="flex">
                                        <span className="font-medium w-32 text-gray-600">Batch Number:</span>
                                        <span>BT20240125</span>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-3">Dates</h3>
                                <ul className="space-y-2">
                                    <li className="flex">
                                        <span className="font-medium w-32 text-gray-600">Manufactured:</span>
                                        <span>Jan 25, 2024</span>
                                    </li>
                                    <li className="flex">
                                        <span className="font-medium w-32 text-gray-600">Expiry Date:</span>
                                        <span>Jan 25, 2026</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                // Non-Authentic Drug Card
                <>
                    <div className="bg-red-600 text-white py-3 px-4 flex items-center">
                        <div className="mr-2">⚠️</div>
                        <h2 className="text-xl font-semibold">Verification Failed</h2>
                    </div>
                    <div className="p-6">
                        <div className="bg-red-50 p-4 rounded-md mb-6 border border-red-200">
                            <p className="text-red-800 font-bold">Warning: This medication could not be verified as authentic.</p>
                            <p className="text-gray-700 mt-2">QR Code: {scanResult}</p>
                        </div>

                        <div className="mb-6">
                            <h3 className="font-semibold text-lg mb-3 text-red-800">Potential Issues</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li className="flex items-start">
                                    <span className="text-red-600 mr-2">•</span>
                                    <span>The QR code may be invalid or tampered with</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-red-600 mr-2">•</span>
                                    <span>This product may be counterfeit or falsified</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-red-50 p-4 rounded-md border border-yellow-200">
                            <h3 className="font-semibold text-lg mb-2 text-yellow-800">Recommended Actions</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li className="flex items-start">
                                    <span className="text-yellow-600 mr-2">→</span>
                                    <span>Do not use this medication</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-red-600 mr-2">→</span>
                                    <span>Return it to your pharmacy or healthcare provider</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-red-600 mr-2">→</span>
                                    <span>Report this incident to the local health authority</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-red-600 mr-2">→</span>
                                    <span>Call our hotline for assistance: <a href="tel:+1800MEDVERIFY" className="text-blue-600 underline">1-800-MED-VERIFY</a></span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </>
            )}
        </section>
    );
};

export default ResultSection;