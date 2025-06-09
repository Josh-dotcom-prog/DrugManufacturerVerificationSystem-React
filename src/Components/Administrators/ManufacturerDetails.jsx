import React, { useState } from 'react';
import { ArrowLeft, Download, Check, X, FileText, Eye } from 'lucide-react';

const ManufacturerDetails = () => {
    const [showApprovalModal, setShowApprovalModal] = useState(false);
    const [showRejectionModal, setShowRejectionModal] = useState(false);

    // Sample manufacturer data - in real app this would come from props or API
    const manufacturer = {
        name: "MediCorp Industries",
        contact: "Dr. Sarah Johnson",
        email: "info@medicorp.com",
        address: "123 Medical Drive, London, UK, SW1A 1AA",
        registrationDate: "6/22/2023",
        certificateUrl: "/api/placeholder/400/300", // Placeholder for PDF
        certificateName: "Certificate_of_Operation_MediCorp.pdf"
    };

    const handleApprove = () => {
        setShowApprovalModal(false);
        // Handle approval logic here
        console.log("Manufacturer approved");
    };

    const handleReject = () => {
        if (rejectionReason.trim()) {
            setShowRejectionModal(false);
            // Handle rejection logic here
            console.log("Manufacturer rejected");
        }
    };

    const handleDownloadCertificate = () => {
        // Handle PDF download
        console.log("Downloading certificate");
    };

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Main content */}
            <div className="flex-1 overflow-y-auto">

                <main className="p-6">
                    {/* Back button and header */}
                    <div className="mb-6">
                        <button
                            onClick={() => window.history.back()}
                            className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Approvals
                        </button>
                        <h1 className="text-2xl font-bold text-gray-900">Manufacturer Details</h1>
                        <p className="text-gray-600">Review manufacturer information and application documents</p>
                    </div>

                    {/* Manufacturer Details Card */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Left Column */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Manufacturer Name
                                    </label>
                                    <p className="text-gray-900 font-semibold">{manufacturer.name}</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Contact Person
                                    </label>
                                    <p className="text-gray-900">{manufacturer.contact}</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email Address
                                    </label>
                                    <p className="text-gray-900">{manufacturer.email}</p>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Address
                                    </label>
                                    <p className="text-gray-900">{manufacturer.address}</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Registration Date
                                    </label>
                                    <p className="text-gray-900">{manufacturer.registrationDate}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Certificate Section */}

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Certificate of Operation</h3>
                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50">
                            <div className="flex items-center">
                                <FileText className="w-8 h-8 text-red-500 mr-3" />
                                <div>
                                    <p className="font-medium text-gray-900">{manufacturer.certificateName}</p>
                                    <p className="text-sm text-gray-500">PDF Document</p>
                                </div>
                            </div>
                            <button
                                onClick={() => window.open(manufacturer.certificateUrl, '_blank')}
                                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Eye className="w-4 h-4 mr-2" />
                                View
                            </button>
                        </div>
                    </div>


                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-4">
                        <button
                            onClick={() => setShowRejectionModal(true)}
                            className="flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                            <X className="w-4 h-4 mr-2" />
                            Reject Application
                        </button>
                        <button
                            onClick={() => setShowApprovalModal(true)}
                            className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                            <Check className="w-4 h-4 mr-2" />
                            Approve Application
                        </button>
                    </div>
                </main>
            </div>

            {/* Approval Confirmation Modal */}
            {showApprovalModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <div className="flex items-center mb-4">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                                <Check className="w-5 h-5 text-green-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">Approve Manufacturer</h3>
                        </div>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to approve <strong>{manufacturer.name}</strong>?
                            This action will grant them access to the system.
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setShowApprovalModal(false)}
                                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleApprove}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                                Approve
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Rejection Modal */}
            {showRejectionModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <div className="flex items-center mb-4">
                            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                                <X className="w-5 h-5 text-red-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">Reject Application</h3>
                        </div>
                        <p className="text-gray-600 mb-4">
                            Are you sure you want to Reject <strong>{manufacturer.name}</strong>'s application?
                        </p>

                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => {
                                    setShowRejectionModal(false);
                                }}
                                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleReject}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Reject Application
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManufacturerDetails;