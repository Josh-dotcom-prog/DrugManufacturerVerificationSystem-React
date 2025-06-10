import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Save, X } from 'lucide-react';
import api from '../../utils/axios';

const DrugDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const editMode = searchParams.get('edit') === 'true';

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isEditing, setIsEditing] = useState(editMode);
    const [editedDrug, setEditedDrug] = useState({});
    const [loading, setLoading] = useState(true);
    const [drug, setDrug] = useState(null);
    const [error, setError] = useState(null);


    // Categories and dosage forms for dropdowns
    const categories = [
        "antibiotic", "analgesic", "antiviral", "antidiabetic",
        "antihistamine", "antihypertensive"
    ];

    const dosageForms = [
        "tablet", "capsule", "syrup", "injection", "cream", "ointment"
    ];

    // Load drug data from API
    useEffect(() => {
        const fetchDrug = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/drug/drug?drug_id=${id}`);
                console.log('Fetched Drug Detail Data:', response.data);

                // Transform the API response to match your frontend structure
                const transformedDrug = {
                    id: response.data.id,
                    drugName: response.data.name,
                    category: response.data.category,
                    dosageForm: response.data.dosage_form,
                    manufacturer: response.data.manufacturer,
                    batchNumber: response.data.batch_number,
                    countryOfOrigin: response.data.country_of_origin,
                    manufactureDate: response.data.manufacturing_date.split('T')[0],
                    expiryDate: response.data.expiry_date.split('T')[0],
                    description: response.data.description,
                    registrationDate: response.data.created_at,
                    status: "Active" // Assuming all drugs from API are active
                };

                setDrug(transformedDrug);
                if (editMode) {
                    setEditedDrug(transformedDrug);
                }
                setError(null);
            } catch (err) {
                console.error('Error fetching drug:', err);
                setError('Failed to load drug details');
                navigate('/drugs');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchDrug();
        }
    }, [id, editMode, navigate]);

    const handleEdit = () => {
        setIsEditing(true);
        setEditedDrug({ ...drug });
        navigate(`/drugdetails/${id}?edit=true`);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedDrug({});
        navigate(`/drugdetails/${id}`);
    };

    const handleSaveEdit = async () => {
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

        try {
            // Prepare the data for API in the required format
            const updatedData = {
                name: editedDrug.drugName,
                category: editedDrug.category,
                dosage_form: editedDrug.dosageForm,
                manufacturer: editedDrug.manufacturer,
                batch_number: editedDrug.batchNumber,
                country_of_origin: editedDrug.countryOfOrigin,
                manufacturing_date: editedDrug.manufactureDate,
                expiry_date: editedDrug.expiryDate,
                description: editedDrug.description
            };

            // Send PUT request to update the drug
            const response = await axios.put(`${API_BASE_URL}/${id}/`, updatedData);

            // Transform the response back to frontend format
            const transformedDrug = {
                id: response.data.id,
                drugName: response.data.name,
                category: response.data.category,
                dosageForm: response.data.dosage_form,
                manufacturer: response.data.manufacturer,
                batchNumber: response.data.batch_number,
                countryOfOrigin: response.data.country_of_origin,
                manufactureDate: response.data.manufacturing_date.split('T')[0],
                expiryDate: response.data.expiry_date.split('T')[0],
                description: response.data.description,
                registrationDate: response.data.created_at,
                status: "Active"
            };

            setDrug(transformedDrug);
            setIsEditing(false);
            setEditedDrug({});
            navigate(`/drugdetails/${id}`);

            console.log("Drug updated successfully:", response.data);
        } catch (err) {
            console.error('Error updating drug:', err);
            alert('Failed to update drug. Please try again.');
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${API_BASE_URL}/${id}/`);
            setShowDeleteModal(false);
            console.log("Drug deleted successfully");
            navigate('/drugs');
        } catch (err) {
            console.error('Error deleting drug:', err);
            alert('Failed to delete drug. Please try again.');
        }
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
                        <p className="text-gray-900">{value ? new Date(value).toLocaleDateString() : 'N/A'}</p>
                    </div>
                );
            }
            return (
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {label}
                    </label>
                    <p className="text-gray-900">{value || 'N/A'}</p>
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

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800">Error Loading Drug</h1>
                    <p className="text-gray-600 mt-2">{error}</p>
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
                                {renderField("Manufacturer", "manufacturer", drug.manufacturer)}
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
                                            <p className="text-gray-900">
                                                {drug.registrationDate ? new Date(drug.registrationDate).toLocaleDateString() : 'N/A'}
                                            </p>
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