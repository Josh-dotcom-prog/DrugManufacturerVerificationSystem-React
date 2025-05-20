import { useState } from 'react';
import { FileText, FileImage, Check, X, ChevronDown, ChevronUp, Download, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

export default function ManufacturerApprovalPage() {
    const [selectedManufacturer, setSelectedManufacturer] = useState(null);
    const [expandedSection, setExpandedSection] = useState('details');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('pending');
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [confirmationType, setConfirmationType] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [newNote, setNewNote] = useState('');

    // Sample data for demonstration
    const manufacturers = [
        {
            id: 'man-001',
            name: 'TechCraft Industries',
            submissionDate: '2025-05-10T14:25:00',
            status: 'pending',
            company: {
                name: 'TechCraft Industries Ltd.',
                website: 'https://techcraft.example.com',
                registrationNumber: 'TC78901234',
                established: '2015',
                employeeCount: '50-100',
                category: 'Electronics'
            },
            contact: {
                name: 'Sarah Johnson',
                title: 'Director of Operations',
                email: 'sarah.johnson@techcraft.example.com',
                phone: '+1 (555) 123-4567',
                alternatePhone: '+1 (555) 987-6543'
            },
            address: {
                street: '123 Innovation Way',
                city: 'San Francisco',
                state: 'California',
                postalCode: '94107',
                country: 'United States'
            },
            documents: [
                { name: 'Business Registration.pdf', type: 'pdf', size: '1.2 MB' },
                { name: 'Product Catalog.pdf', type: 'pdf', size: '3.5 MB' },
                { name: 'Quality Certification.jpg', type: 'image', size: '0.8 MB' }
            ],
            notes: 'TechCraft is a manufacturer of custom electronic components with a focus on renewable energy applications.'
        },
        {
            id: 'man-002',
            name: 'Global Materials Inc.',
            submissionDate: '2025-05-15T09:30:00',
            status: 'pending',
            company: {
                name: 'Global Materials Inc.',
                website: 'https://globalmaterials.example.com',
                registrationNumber: 'GM45678901',
                established: '2008',
                employeeCount: '100-250',
                category: 'Raw Materials'
            },
            contact: {
                name: 'Michael Chen',
                title: 'CEO',
                email: 'michael.chen@globalmaterials.example.com',
                phone: '+1 (555) 234-5678',
                alternatePhone: ''
            },
            address: {
                street: '456 Industrial Parkway',
                city: 'Chicago',
                state: 'Illinois',
                postalCode: '60607',
                country: 'United States'
            },
            documents: [
                { name: 'Environmental Compliance.pdf', type: 'pdf', size: '2.1 MB' },
                { name: 'Factory Photos.jpg', type: 'image', size: '4.3 MB' },
                { name: 'Material Safety Sheets.pdf', type: 'pdf', size: '5.7 MB' }
            ],
            notes: 'Global Materials specializes in sustainable raw materials for manufacturing sectors. They have submitted all required documentation.'
        },
        {
            id: 'man-003',
            name: 'Precision Parts Co.',
            submissionDate: '2025-05-16T16:45:00',
            status: 'pending',
            company: {
                name: 'Precision Parts Co.',
                website: 'https://precisionparts.example.com',
                registrationNumber: 'PP12345678',
                established: '2010',
                employeeCount: '25-50',
                category: 'Automotive'
            },
            contact: {
                name: 'David Rodriguez',
                title: 'Sales Director',
                email: 'david.rodriguez@precisionparts.example.com',
                phone: '+1 (555) 345-6789',
                alternatePhone: '+1 (555) 456-7890'
            },
            address: {
                street: '789 Assembly Drive',
                city: 'Detroit',
                state: 'Michigan',
                postalCode: '48201',
                country: 'United States'
            },
            documents: [
                { name: 'ISO Certification.pdf', type: 'pdf', size: '1.5 MB' },
                { name: 'Product Specifications.pdf', type: 'pdf', size: '2.8 MB' },
                { name: 'Manufacturing Process.txt', type: 'text', size: '0.3 MB' }
            ],
            notes: 'Precision Parts specializes in high-tolerance components for the automotive industry. Missing some supporting documentation.'
        }
    ];

    // Filter manufacturers based on search term and status
    const filteredManufacturers = manufacturers.filter(manufacturer => {
        const matchesSearch = manufacturer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            manufacturer.company.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || manufacturer.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const handleSelectManufacturer = (manufacturer) => {
        setSelectedManufacturer(manufacturer);
        setExpandedSection('details');
    };

    const toggleSection = (section) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    const handleApprove = () => {
        setConfirmationType('approve');
        setConfirmationOpen(true);
    };

    const handleReject = () => {
        setConfirmationType('reject');
        setConfirmationOpen(true);
    };

    const confirmAction = () => {
        const action = confirmationType === 'approve' ? 'approved' : 'rejected';
        setShowNotification(true);
        setNotificationMessage(`Manufacturer "${selectedManufacturer.name}" has been ${action} successfully.`);
        setConfirmationOpen(false);

        // In a real application, you would update the status in your database
        // This is just for demonstration purposes
        setTimeout(() => {
            setShowNotification(false);
            setSelectedManufacturer(prev => prev ? { ...prev, status: action } : null);
        }, 3000);
    };

    const getFileIcon = (type) => {
        switch (type) {
            case 'pdf': return <FilePdf className="h-5 w-5 text-red-500" />;
            case 'image': return <FileImage className="h-5 w-5 text-blue-500" />;
            default: return <FileText className="h-5 w-5 text-gray-500" />;
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    const handleAddNote = () => {
        if (!newNote.trim()) return;

        // In a real app, you would update the manufacturer's notes in your database
        setSelectedManufacturer(prev => ({
            ...prev,
            notes: `${prev.notes}\n\n${new Date().toLocaleDateString()}: ${newNote}`
        }));

        setNewNote('');
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar - Manufacturer List */}
            <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
                <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-800">Manufacturers</h2>
                    <div className="mt-2">
                        <input
                            type="text"
                            placeholder="Search manufacturers..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="mt-2">
                        <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                </div>
                <div className="mt-2">
                    {filteredManufacturers.length === 0 ? (
                        <p className="text-center text-gray-500 py-4">No manufacturers found</p>
                    ) : (
                        filteredManufacturers.map((manufacturer) => (
                            <div
                                key={manufacturer.id}
                                className={`px-4 py-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${selectedManufacturer && selectedManufacturer.id === manufacturer.id ? 'bg-blue-50' : ''
                                    }`}
                                onClick={() => handleSelectManufacturer(manufacturer)}
                            >
                                <h3 className="font-medium text-gray-800">{manufacturer.name}</h3>
                                <p className="text-sm text-gray-500">Submitted: {formatDate(manufacturer.submissionDate)}</p>
                                <div className="mt-1">
                                    <span
                                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${manufacturer.status === 'approved' ? 'bg-green-100 text-green-800' :
                                            manufacturer.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }`}
                                    >
                                        {manufacturer.status.charAt(0).toUpperCase() + manufacturer.status.slice(1)}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">
                {selectedManufacturer ? (
                    <div className="p-6">
                        {/* Header with approval actions */}
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">{selectedManufacturer.name}</h1>
                                <p className="text-sm text-gray-500">
                                    Submitted on {formatDate(selectedManufacturer.submissionDate)}
                                </p>
                            </div>
                            <div className="flex space-x-3">
                                <button
                                    onClick={handleReject}
                                    className="px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50 flex items-center"
                                    disabled={selectedManufacturer.status !== 'pending'}
                                >
                                    <XCircle className="h-4 w-4 mr-1" />
                                    Reject
                                </button>
                                <button
                                    onClick={handleApprove}
                                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center"
                                    disabled={selectedManufacturer.status !== 'pending'}
                                >
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    Approve
                                </button>
                            </div>
                        </div>

                        {/* Status Badge */}
                        {selectedManufacturer.status !== 'pending' && (
                            <div className={`mb-6 p-4 rounded-md ${selectedManufacturer.status === 'approved' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                                }`}>
                                <div className="flex">
                                    {selectedManufacturer.status === 'approved' ? (
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                                    ) : (
                                        <XCircle className="h-5 w-5 text-red-500 mr-2" />
                                    )}
                                    <span className={`font-medium ${selectedManufacturer.status === 'approved' ? 'text-green-800' : 'text-red-800'
                                        }`}>
                                        This manufacturer has been {selectedManufacturer.status}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Collapsible Sections */}
                        <div className="space-y-4">
                            {/* Company Details Section */}
                            <div className="border border-gray-200 rounded-md overflow-hidden">
                                <div
                                    className="bg-gray-50 px-4 py-3 flex justify-between items-center cursor-pointer"
                                    onClick={() => toggleSection('details')}
                                >
                                    <h2 className="text-lg font-medium text-gray-800">Company Details</h2>
                                    {expandedSection === 'details' ? (
                                        <ChevronUp className="h-5 w-5 text-gray-500" />
                                    ) : (
                                        <ChevronDown className="h-5 w-5 text-gray-500" />
                                    )}
                                </div>
                                {expandedSection === 'details' && (
                                    <div className="p-4 bg-white">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Company Name</p>
                                                <p className="text-gray-800">{selectedManufacturer.company.name}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Website</p>
                                                <p className="text-blue-600 hover:underline">
                                                    <a href={selectedManufacturer.company.website} target="_blank" rel="noreferrer">
                                                        {selectedManufacturer.company.website}
                                                    </a>
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Registration Number</p>
                                                <p className="text-gray-800">{selectedManufacturer.company.registrationNumber}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Year Established</p>
                                                <p className="text-gray-800">{selectedManufacturer.company.established}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Employee Count</p>
                                                <p className="text-gray-800">{selectedManufacturer.company.employeeCount}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Category</p>
                                                <p className="text-gray-800">{selectedManufacturer.company.category}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Contact Information Section */}
                            <div className="border border-gray-200 rounded-md overflow-hidden">
                                <div
                                    className="bg-gray-50 px-4 py-3 flex justify-between items-center cursor-pointer"
                                    onClick={() => toggleSection('contact')}
                                >
                                    <h2 className="text-lg font-medium text-gray-800">Contact Information</h2>
                                    {expandedSection === 'contact' ? (
                                        <ChevronUp className="h-5 w-5 text-gray-500" />
                                    ) : (
                                        <ChevronDown className="h-5 w-5 text-gray-500" />
                                    )}
                                </div>
                                {expandedSection === 'contact' && (
                                    <div className="p-4 bg-white">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Contact Name</p>
                                                <p className="text-gray-800">{selectedManufacturer.contact.name}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Title</p>
                                                <p className="text-gray-800">{selectedManufacturer.contact.title}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Email</p>
                                                <p className="text-blue-600 hover:underline">
                                                    <a href={`mailto:${selectedManufacturer.contact.email}`}>
                                                        {selectedManufacturer.contact.email}
                                                    </a>
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Phone</p>
                                                <p className="text-gray-800">{selectedManufacturer.contact.phone}</p>
                                            </div>
                                            {selectedManufacturer.contact.alternatePhone && (
                                                <div>
                                                    <p className="text-sm font-medium text-gray-500">Alternate Phone</p>
                                                    <p className="text-gray-800">{selectedManufacturer.contact.alternatePhone}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Address Section */}
                            <div className="border border-gray-200 rounded-md overflow-hidden">
                                <div
                                    className="bg-gray-50 px-4 py-3 flex justify-between items-center cursor-pointer"
                                    onClick={() => toggleSection('address')}
                                >
                                    <h2 className="text-lg font-medium text-gray-800">Address</h2>
                                    {expandedSection === 'address' ? (
                                        <ChevronUp className="h-5 w-5 text-gray-500" />
                                    ) : (
                                        <ChevronDown className="h-5 w-5 text-gray-500" />
                                    )}
                                </div>
                                {expandedSection === 'address' && (
                                    <div className="p-4 bg-white">
                                        <div className="space-y-2">
                                            <p className="text-gray-800">{selectedManufacturer.address.street}</p>
                                            <p className="text-gray-800">
                                                {selectedManufacturer.address.city}, {selectedManufacturer.address.state} {selectedManufacturer.address.postalCode}
                                            </p>
                                            <p className="text-gray-800">{selectedManufacturer.address.country}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Documents Section */}
                            <div className="border border-gray-200 rounded-md overflow-hidden">
                                <div
                                    className="bg-gray-50 px-4 py-3 flex justify-between items-center cursor-pointer"
                                    onClick={() => toggleSection('documents')}
                                >
                                    <h2 className="text-lg font-medium text-gray-800">Uploaded Documents</h2>
                                    {expandedSection === 'documents' ? (
                                        <ChevronUp className="h-5 w-5 text-gray-500" />
                                    ) : (
                                        <ChevronDown className="h-5 w-5 text-gray-500" />
                                    )}
                                </div>
                                {expandedSection === 'documents' && (
                                    <div className="p-4 bg-white">
                                        <div className="space-y-3">
                                            {selectedManufacturer.documents.map((document, index) => (
                                                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                                                    <div className="flex items-center">
                                                        {getFileIcon(document.type)}
                                                        <span className="ml-2 text-gray-800">{document.name}</span>
                                                        <span className="ml-2 text-xs text-gray-500">{document.size}</span>
                                                    </div>
                                                    <button className="text-blue-500 hover:text-blue-700 flex items-center">
                                                        <Download className="h-4 w-4 mr-1" />
                                                        Download
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Notes Section */}
                            <div className="border border-gray-200 rounded-md overflow-hidden">
                                <div
                                    className="bg-gray-50 px-4 py-3 flex justify-between items-center cursor-pointer"
                                    onClick={() => toggleSection('notes')}
                                >
                                    <h2 className="text-lg font-medium text-gray-800">Notes</h2>
                                    {expandedSection === 'notes' ? (
                                        <ChevronUp className="h-5 w-5 text-gray-500" />
                                    ) : (
                                        <ChevronDown className="h-5 w-5 text-gray-500" />
                                    )}
                                </div>
                                {expandedSection === 'notes' && (
                                    <div className="p-4 bg-white">
                                        <p className="text-gray-800 whitespace-pre-line">{selectedManufacturer.notes}</p>
                                        <div className="mt-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Add Note</label>
                                            <textarea
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                rows="3"
                                                placeholder="Add additional notes here..."
                                                value={newNote}
                                                onChange={(e) => setNewNote(e.target.value)}
                                            />
                                            <div className="mt-2 flex justify-end">
                                                <button
                                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                                    onClick={handleAddNote}
                                                >
                                                    Save Note
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                        <div className="text-gray-400 text-center">
                            <div className="flex justify-center mb-4">
                                <AlertCircle className="h-12 w-12" />
                            </div>
                            <h2 className="text-xl font-medium mb-2">No Manufacturer Selected</h2>
                            <p>Select a manufacturer from the list to view their details</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Confirmation Modal */}
            {confirmationOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                            {confirmationType === 'approve' ? 'Approve Manufacturer' : 'Reject Manufacturer'}
                        </h3>
                        <p className="text-gray-700 mb-4">
                            Are you sure you want to {confirmationType} <strong>{selectedManufacturer.name}</strong>?
                            {confirmationType === 'reject' && ' This action will notify the manufacturer of rejection.'}
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setConfirmationOpen(false)}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmAction}
                                className={`px-4 py-2 rounded-md text-white ${confirmationType === 'approve' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
                                    }`}
                            >
                                {confirmationType === 'approve' ? 'Approve' : 'Reject'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Notification */}
            {showNotification && (
                <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-3 rounded-md shadow-lg flex items-center z-50">
                    <Check className="h-5 w-5 mr-2" />
                    {notificationMessage}
                </div>
            )}
        </div>
    );
}