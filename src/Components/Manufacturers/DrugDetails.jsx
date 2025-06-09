import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Save } from 'lucide-react';

const DrugDetails = () => {
    const { id } = useParams(); // Get drug ID from URL
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const editMode = searchParams.get('edit') === 'true'; // Check if edit mode from URL

    const [showApprovalModal, setShowApprovalModal] = useState(false);
    const [showRejectionModal, setShowRejectionModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isEditing, setIsEditing] = useState(editMode);
    const [editedDrug, setEditedDrug] = useState({});
    const [loading, setLoading] = useState(true);

    // Sample drugs data - in real app this would come from API
    const sampleDrugs = {
        1: {
            id: 1,
            drugName: "Amoxicillin 500mg",
            category: "Antibiotic",
            dosageForm: "Capsule",
            batchNumber: "BTC202579",
            manufactureDate: "2024-01-15",
            expiryDate: "2026-01-15",
            countryOfOrigin: "United Kingdom",
            description: "Amoxicillin is a penicillin antibiotic used to treat bacterial infections including pneumonia, bronchitis, and infections of the ear, nose, throat, skin, and urinary tract.",
            status: "Active",
        },
        2: {
            id: 2,
            drugName: "Paracetamol 500mg",
            category: "Analgesic",
            dosageForm: "Tablet",
            batchNumber: "PCT202580",
            manufactureDate: "2024-02-10",
            expiryDate: "2026-02-10",
            countryOfOrigin: "India",
            description: "Paracetamol is a pain reliever and fever reducer used to treat mild to moderate pain and reduce fever.",
            registrationDate: "2024-02-15",
            status: "Active",
        }
        // Add more sample drugs as needed
    };

    const [drug, setDrug] = useState(null);

    // Categories and dosage forms for dropdowns
    const categories = [
        "Antibiotic", "Analgesic", "Antiviral", "Antidiabetic",
        "Antihistamine", "Antihypertensive"
    ];

    const dosageForms = [
        "Tablet", "Capsule", "Syrup", "Injection", "Cream", "Ointment"
    ];

    // Load drug data when component mounts or ID changes
    useEffect(() => {
        const loadDrug = () => {
            setLoading(true);
            // In real app, this would be an API call
            const drugData = sampleDrugs[parseInt(id)];

            if (drugData) {
                setDrug(drugData);
                if (editMode) {
                    setEditedDrug({ ...drugData });
                }
            } else {
                // Drug not found, redirect to drugs list
                navigate('/drugs');
            }
            setLoading(false);
        };

        if (id) {
            loadDrug();
        }
    }, [id, editMode, navigate]);

    const handleApprove = () => {
        setShowApprovalModal(false);
        // Update drug status
        setDrug(prev => ({ ...prev, status: "Active" }));
        console.log("Drug approved");
    };

    const handleReject = () => {
        if (rejectionReason.trim()) {
            setShowRejectionModal(false);
            // Update drug status
            setDrug(prev => ({ ...prev, status: "Rejected" }));
            console.log("Drug rejected with reason:", rejectionReason);
        }
    };


    // CRUD Operations
    const handleEdit = () => {
        setIsEditing(true);
        setEditedDrug({ ...drug });
        // Update URL to include edit parameter
        navigate(`/drugdetails/${id}?edit=true`);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedDrug({});
        // Remove edit parameter from URL
        navigate(`/drugdetails/${id}`);
    };

    const handleSaveEdit = () => {
        // Validate required fields
        if (!editedDrug.drugName || !editedDrug.category || !editedDrug.dosageForm ||
            !editedDrug.batchNumber || !editedDrug.manufactureDate || !editedDrug.expiryDate ||
            !editedDrug.manufacturer || !editedDrug.countryOfOrigin) {
            alert("Please fill in all required fields");
            return;
        }

        // Validate dates
        if (new Date(editedDrug.expiryDate) <= new Date(editedDrug.manufactureDate)) {
            alert("Expiry date must be after manufacture date");
            return;
        }

        // Update the drug data
        setDrug({ ...editedDrug });
        setIsEditing(false);
        setEditedDrug({});

        // Remove edit parameter from URL
        navigate(`/drugdetails/${id}`);

        console.log("Drug updated:", editedDrug);
        // Here you would typically send the updated data to your backend API
    };

    const handleDelete = () => {
        setShowDeleteModal(false);
        console.log("Drug deleted:", drug.id);
        // Here you would typically send delete request to your backend API
        // Then navigate back to the drugs list
        navigate('/drugs');
    };

    const handleInputChange = (field, value) => {
        setEditedDrug(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const renderField = (label, field, value, type = "text", options = null) => {
        if (!isEditing) {
            if (type === "date") {
                return (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {label}
                        </label>
                        <p className="text-gray-900">{new Date(value).toLocaleDateString()}</p>
                    </div>
                );
            }
            return (
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {label}
                    </label>
                    <p className="text-gray-900">{value}</p>
                </div>
            );
        }

        if (type === "select") {
            return (
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {label} *
                    </label>
                    <select
                        value={editedDrug[field] || value}
                        onChange={(e) => handleInputChange(field, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    >
                        <option value="">Select {label.toLowerCase()}</option>
                        {options.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>
            );
        }

        if (type === "textarea") {
            return (
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {label}
                    </label>
                    <textarea
                        value={editedDrug[field] || value}
                        onChange={(e) => handleInputChange(field, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows="3"
                    />
                </div>
            );
        }

        return (
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label} {type !== "description" ? "*" : ""}
                </label>
                <input
                    type={type}
                    value={editedDrug[field] || value}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required={type !== "description"}
                />
            </div>
        );
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading drug details...</p>
                </div>
            </div>
        );
    }

    if (!drug) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800">Drug Not Found</h1>
                    <p className="text-gray-600 mt-2">The drug you're looking for doesn't exist.</p>
                    <button
                        onClick={() => navigate('/drugs')}
                        className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                        Back to Drugs List
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen overflow-hidden">
            <div className="flex-1 overflow-y-auto">
                <main className="p-6">
                    {/* Back button and header */}
                    <div className="mb-6">
                        <button
                            onClick={() => navigate('/drugs')}
                            className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Drug List
                        </button>
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {isEditing ? "Edit Drug Details" : "Drug Details"}
                                </h1>
                                <p className="text-gray-600">
                                    {isEditing ? "Modify drug information" : "Review drug information and registration documents"}
                                </p>
                            </div>

                            {/* Action buttons */}
                            {!isEditing ? (
                                <div className="flex space-x-3">
                                    <button
                                        onClick={handleEdit}
                                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        <Edit className="w-4 h-4 mr-2" />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => setShowDeleteModal(true)}
                                        className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Delete
                                    </button>
                                </div>
                            ) : (
                                <div className="flex space-x-3">
                                    <button
                                        onClick={handleCancelEdit}
                                        className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                                    >
                                        <X className="w-4 h-4 mr-2" />
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSaveEdit}
                                        className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        <Save className="w-4 h-4 mr-2" />
                                        Save Changes
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Drug Details Card */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Left Column */}
                            <div className="space-y-4">
                                {renderField("Drug Name", "drugName", drug.drugName)}
                                {renderField("Category", "category", drug.category, "select", categories)}
                                {renderField("Dosage Form", "dosageForm", drug.dosageForm, "select", dosageForms)}
                                {renderField("Batch Number", "batchNumber", drug.batchNumber)}
                            </div>

                            {/* Right Column */}
                            <div className="space-y-4">
                                {renderField("Manufacturing Date", "manufactureDate", drug.manufactureDate, "date")}
                                {renderField("Expiry Date", "expiryDate", drug.expiryDate, "date")}
                                {renderField("Country of Origin", "countryOfOrigin", drug.countryOfOrigin)}

                                {!isEditing && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Registration Date
                                            </label>
                                            <p className="text-gray-900">{new Date(drug.registrationDate).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Status
                                            </label>
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${drug.status === 'Active' ? 'bg-green-100 text-green-800' :
                                                drug.status === 'Pending Approval' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                {drug.status}
                                            </span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Description Section */}
                        <div className="mt-6">
                            {renderField("Description", "description", drug.description, "textarea")}
                        </div>
                    </div>

                </main>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <div className="flex items-center mb-4">
                            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                                <Trash2 className="w-5 h-5 text-red-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">Delete Drug</h3>
                        </div>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete <strong>{drug.drugName}</strong>?
                            This action cannot be undone and will permanently remove all drug information.
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Delete Drug
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DrugDetails;
