import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Edit, Trash2, Search, Plus, X } from 'lucide-react';
import api from '../../utils/axios';


const Drugs = () => {
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);
    const [drugData, setDrugData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [drugToDelete, setDrugToDelete] = useState(null);
    const [drugs, setDrugs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    // Fetch drugs from API
    useEffect(() => {
        fetchDrugs();
    }, []);

    const fetchDrugs = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Unauthorized. Please login again.');
                setLoading(false);
                return;
            }

            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const response = await api.get('/drug/drugs', { headers });
            console.log('Fetched drugs:', response.data);

            // Transform API data to match component structure
            const transformedDrugs = response.data.map(drug => ({
                id: drug.id,
                drugName: drug.name,
                category: drug.category,
                dosageForm: drug.dosage_form,
                batchNumber: drug.batch_number,
                manufactureDate: drug.manufacturing_date,
                expiryDate: drug.expiry_date,
                manufacturer: drug.manufacturer,
                countryOfOrigin: drug.country_of_origin,
                description: drug.description,
                registrationDate: drug.created_at,
                status: new Date(drug.expiry_date) > new Date() ? 'Active' : 'Expired'
            }));

            setDrugs(transformedDrugs);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching drugs:', err);
            setError('Failed to load drugs data.');
            setLoading(false);
        }
    };

    // Filter drugs based on search term
    const filteredDrugs = drugs.filter(drug =>
        drug.drugName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        drug.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        drug.dosageForm.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleRegistrationForm = () => {
        setShowRegistrationForm(!showRegistrationForm);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Unauthorized');
            }

            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            };

            // Collect form data matching API structure
            const formData = {
                name: e.target.drugName.value,
                category: e.target.category.value,
                dosage_form: e.target.dosageForm.value,
                manufacturer: "Current Manufacturer", // You might want to get this from user context
                batch_number: e.target.strength.value,
                country_of_origin: e.target.countryOfOrigin.value,
                manufacturing_date: e.target.manufactureDate.value,
                expiry_date: e.target.expiryDate.value,
                description: e.target.description.value,
            };

            console.log('Submitting drug data:', formData);
            localStorage.setItem('drugData', formData);

            // Submit to API
            const response = await api.post('/drug/create', formData, { headers });
            console.log('Drug registered successfully:', response.data);

            // Refresh the drugs list
            await fetchDrugs();

            // Store the drug data for QR code generation
            setDrugData(response.data);

            // Close the form
            setShowRegistrationForm(false);

            // Reset form
            e.target.reset();

            // Navigate to QR code page (if you have this route)
            navigate('/qrcode', { state: { drugData: response.data } });

        } catch (err) {
            console.error('Error registering drug:', err);
            setError('Failed to register drug. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    // Navigation functions
    const handleViewDrug = (drugId) => {
        navigate(`/drugdetails/${drugId}`);
    };

    const handleEditDrug = (drugId) => {
        navigate(`/drugdetails/${drugId}?edit=true`);
    };

    const handleDeleteDrug = (drug) => {
        setDrugToDelete(drug);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (drugToDelete) {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Unauthorized');
                }

                const headers = {
                    Authorization: `Bearer ${token}`,
                };

                // Delete from API
                await api.delete(`/drug/delete?drug_id=${drugToDelete.id}`, { headers });
                console.log('Drug deleted successfully:', drugToDelete.id);

                // Remove from local state
                setDrugs(prevDrugs => prevDrugs.filter(drug => drug.id !== drugToDelete.id));

                setShowDeleteModal(false);
                setDrugToDelete(null);
            } catch (err) {
                console.error('Error deleting drug:', err);
                setError('Failed to delete drug. Please try again.');
                setShowDeleteModal(false);
                setDrugToDelete(null);
            }
        }
    };

    if (loading) return <div className="p-6 text-gray-600">Loading drugs...</div>;

    return (
        <div className="flex h-screen overflow-hidden">
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
                <div className="p-6 flex items-center space-x-3 border-b border-gray-200">
                    <i className="fas fa-pills text-green-600 text-2xl"></i>
                    <h1 className="text-xl font-bold text-green-600">DMVS</h1>
                </div>

                <nav className="mt-6 px-3">
                    <a href="/manufacturersdashboard"
                        className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-md mb-1">
                        <i className="fas fa-chart-line w-5 h-5 mr-3"></i>
                        <span className="font-medium">Dashboard</span>
                    </a>
                    <a href="/drugs" className="flex items-center px-4 py-3 text-green-600 bg-green-50 rounded-md mb-1 border-l-4 border-green-600">
                        <i className="fas fa-capsules w-5 h-5 mr-3"></i>
                        <span className="font-medium">Drug</span>
                    </a>
                </nav>
            </aside>

            <main className="flex-1 overflow-y-auto">
                <div className="flex justify-between items-center mb-8 p-6 border-b border-gray-200">
                    <h1 className="text-2xl font-bold text-gray-800">Manufacturer Dashboard</h1>
                    <div className="flex items-center">
                        <div className="relative">
                            <button id="profileButton"
                                className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold mr-3">
                                PM
                            </button>
                        </div>
                        <div>
                            <span className="mr-4">Welcome,
                                <strong className="text-green-600">Pharma Manufacturer</strong>
                            </span>
                            <a href="/login"
                                className="bg-white text-green-800 px-4 py-2 rounded-md font-medium hover:bg-green-100">Logout</a>
                        </div>
                    </div>
                </div>

                {/* Error Display */}
                {error && (
                    <div className="mx-6 mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-red-600">{error}</p>
                        <button
                            onClick={() => setError('')}
                            className="mt-2 text-sm text-red-500 hover:text-red-700"
                        >
                            Dismiss
                        </button>
                    </div>
                )}

                {/* Products Table Section - shown when form is hidden */}
                {!showRegistrationForm && (
                    <div id="productsSection" className="mb-8 bg-white rounded-lg shadow-sm overflow-hidden p-6">
                        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                            <h2 className="text-lg font-semibold">Registered Drugs ({filteredDrugs.length})</h2>
                            <div className="flex items-center space-x-4">
                                {/* Search Bar */}
                                <div className="flex bg-gray-100 px-3 py-2 rounded-md">
                                    <Search className="w-4 h-4 text-gray-400 mr-2 mt-1" />
                                    <input
                                        type="text"
                                        placeholder="Search drugs..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="bg-transparent border-none focus:outline-none text-sm"
                                    />
                                </div>
                                {/* Add Drug Button */}
                                <button
                                    onClick={toggleRegistrationForm}
                                    className="flex items-center bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-700 transition-colors">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Drug
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Drug Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Category</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Dosage Form</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Batch Number</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Expiry Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredDrugs.length > 0 ? (
                                        filteredDrugs.map((drug) => (
                                            <tr key={drug.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                                    {drug.drugName}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                                    {drug.category}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                                    {drug.dosageForm}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                                    {drug.batchNumber}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                                    {new Date(drug.expiryDate).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${drug.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                        }`}>
                                                        {drug.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() => handleViewDrug(drug.id)}
                                                            className="inline-flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-800 border border-blue-300 rounded hover:bg-blue-50 transition-colors"
                                                            title="View Details"
                                                        >
                                                            <Eye className="w-4 h-4 mr-1" />
                                                            View
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteDrug(drug)}
                                                            className="inline-flex items-center px-3 py-1 text-sm text-red-600 hover:text-red-800 border border-red-300 rounded hover:bg-red-50 transition-colors"
                                                            title="Delete Drug"
                                                        >
                                                            <Trash2 className="w-4 h-4 mr-1" />
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                                                {searchTerm ? 'No drugs found matching your search.' : 'No drugs registered yet.'}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Drug Registration Form - shown when Add Drug is clicked */}
                {showRegistrationForm && (
                    <div id="registerForm" className="mb-8 bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                            <h2 className="text-3xl text-center font-semibold">Register New Drug</h2>
                            <button
                                onClick={toggleRegistrationForm}
                                className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6">
                            <form id="drugRegistrationForm" onSubmit={handleFormSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="drugName" className="block text-sm font-medium text-gray-700 mb-1">
                                            Drug Name *
                                        </label>
                                        <input type="text" id="drugName"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required disabled={submitting} />
                                    </div>

                                    <div>
                                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                                            Drug Category *
                                        </label>
                                        <select id="category"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required disabled={submitting}>
                                            <option value="">Select category</option>
                                            <option value="antibiotic">Antibiotic</option>
                                            <option value="analgesic">Pain Killer</option>
                                            <option value="antiviral">Antiviral</option>
                                            <option value="antidiabetic">Antidiabetic</option>
                                            <option value="antihistamine">Antihistamine</option>
                                            <option value="antihypertensive">Antihypertensive</option>
                                            <option value="sedative">Sedative</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="dosageForm" className="block text-sm font-medium text-gray-700 mb-1">
                                            Dosage Form *
                                        </label>
                                        <select id="dosageForm"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required disabled={submitting}>
                                            <option value="">Select dosage form</option>
                                            <option value="tablet">Tablet</option>
                                            <option value="capsule">Capsule</option>
                                            <option value="syrup">Syrup</option>
                                            <option value="injection">Injection</option>
                                            <option value="cream">Cream</option>
                                            <option value="ointment">Ointment</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="strength" className="block text-sm font-medium text-gray-700 mb-1">
                                            Batch Number *
                                        </label>
                                        <input type="text" id="strength" placeholder="e.g. BTC202579"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required disabled={submitting} />
                                    </div>

                                    <div>
                                        <label htmlFor="manufactureDate"
                                            className="block text-sm font-medium text-gray-700 mb-1">
                                            Manufacturing Date *
                                        </label>
                                        <input type="date" id="manufactureDate"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required disabled={submitting} />
                                    </div>

                                    <div>
                                        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                                            Expiry Date *
                                        </label>
                                        <input type="date" id="expiryDate"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required disabled={submitting} />
                                    </div>

                                    <div>
                                        <label htmlFor="countryOfOrigin"
                                            className="block text-sm font-medium text-gray-700 mb-1">
                                            Country of Origin *
                                        </label>
                                        <input type="text" id="countryOfOrigin"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required disabled={submitting} />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label htmlFor="description"
                                            className="block text-sm font-medium text-gray-700 mb-1">
                                            Description
                                        </label>
                                        <textarea id="description" rows="3"
                                            placeholder="Describe the drug..."
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            disabled={submitting}></textarea>
                                    </div>
                                </div>

                                <div className="mt-8 flex justify-end space-x-3">
                                    <button type="button"
                                        onClick={toggleRegistrationForm}
                                        disabled={submitting}
                                        className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50">
                                        Cancel
                                    </button>
                                    <button type="submit"
                                        disabled={submitting}
                                        className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition-colors disabled:opacity-50">
                                        {submitting ? 'Registering...' : 'Register Drug'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

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
                                Are you sure you want to delete <strong>{drugToDelete?.drugName}</strong>?
                                This action cannot be undone and will permanently remove all drug information.
                            </p>
                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={() => {
                                        setShowDeleteModal(false);
                                        setDrugToDelete(null);
                                    }}
                                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    Delete Drug
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Drugs;