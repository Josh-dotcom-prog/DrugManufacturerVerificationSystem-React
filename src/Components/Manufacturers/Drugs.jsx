import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Edit, Trash2, Search, Plus, X } from 'lucide-react';

const Drugs = () => {
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);
    const [drugData, setDrugData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [drugToDelete, setDrugToDelete] = useState(null);
    const navigate = useNavigate();

    // Sample drugs data with proper IDs
    const [drugs, setDrugs] = useState([
        {
            id: 1,
            drugName: "Amoxicillin",
            category: "Antibiotic",
            dosageForm: "Capsule",
            batchNumber: "BTC202579",
            manufactureDate: "2024-01-15",
            expiryDate: "2026-01-15",
            manufacturer: "MediCorp Industries",
            countryOfOrigin: "United Kingdom",
            description: "Amoxicillin is a penicillin antibiotic used to treat bacterial infections.",
            registrationDate: "2025-01-12",
            status: "Active"
        },
        {
            id: 2,
            drugName: "Paracetamol",
            category: "Analgesic",
            dosageForm: "Tablet",
            batchNumber: "PCT202580",
            manufactureDate: "2024-02-10",
            expiryDate: "2026-02-10",
            countryOfOrigin: "India",
            description: "Paracetamol is a pain reliever and fever reducer.",
            registrationDate: "2024-11-23",
            status: "Active"
        },
        {
            id: 3,
            drugName: "Ciprofloxacin",
            category: "Antibiotic",
            dosageForm: "Tablet",
            batchNumber: "CPX202581",
            manufactureDate: "2023-02-07",
            expiryDate: "2025-02-07",
            countryOfOrigin: "USA",
            description: "Ciprofloxacin is a fluoroquinolone antibiotic.",
            registrationDate: "2025-02-07",
            status: "Expired"
        },
        {
            id: 4,
            drugName: "Metformin",
            category: "Antidiabetic",
            dosageForm: "Tablet",
            batchNumber: "MET202582",
            manufactureDate: "2023-12-15",
            expiryDate: "2024-12-15",
            manufacturer: "DiabetCare Ltd",
            countryOfOrigin: "Canada",
            description: "Metformin is used to treat type 2 diabetes.",
            registrationDate: "2024-12-15",
            status: "Expired"
        },
        {
            id: 5,
            drugName: "Diazepam",
            category: "Sedative",
            dosageForm: "Tablet",
            batchNumber: "DZP202583",
            manufactureDate: "2023-09-03",
            expiryDate: "2024-09-03",
            countryOfOrigin: "Germany",
            description: "Diazepam is a benzodiazepine medication.",
            registrationDate: "2024-09-03",
            status: "Expired"
        }
    ]);

    // Filter drugs based on search term
    const filteredDrugs = drugs.filter(drug =>
        drug.drugName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        drug.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        drug.dosageForm.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleRegistrationForm = () => {
        setShowRegistrationForm(!showRegistrationForm);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Generate new ID
        const newId = Math.max(...drugs.map(d => d.id), 0) + 1;

        // Collect form data
        const formData = {
            id: newId,
            drugName: e.target.drugName.value,
            category: e.target.category.value,
            dosageForm: e.target.dosageForm.value,
            batchNumber: e.target.strength.value,
            manufactureDate: e.target.manufactureDate.value,
            expiryDate: e.target.expiryDate.value,
            countryOfOrigin: e.target.countryOfOrigin.value,
            description: e.target.description.value,
            status: "Authentic Manufacturer",
        };

        // Add new drug to the list
        setDrugs(prevDrugs => [...prevDrugs, formData]);

        // Store the drug data for QR code generation
        setDrugData(formData);

        // Close the form
        setShowRegistrationForm(false);

        // Reset form
        e.target.reset();

        console.log('Drug registered:', formData);

        // Navigate to QR code page (if you have this route)
        navigate('/qrcode', { state: { drugData: formData } });
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

    const confirmDelete = () => {
        if (drugToDelete) {
            setDrugs(prevDrugs => prevDrugs.filter(drug => drug.id !== drugToDelete.id));
            setShowDeleteModal(false);
            setDrugToDelete(null);
            console.log('Drug deleted:', drugToDelete.id);
        }
    };

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
                            <a href="logout.php"
                                className="bg-white text-green-800 px-4 py-2 rounded-md font-medium hover:bg-green-100">Logout</a>
                        </div>
                    </div>
                </div>

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
                                            Registration Date</th>
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
                                                    {new Date(drug.registrationDate).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${drug.status === 'Active' ? 'bg-green-100 text-green-800' :
                                                        drug.status === 'Pending Approval' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-red-100 text-red-800'
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
                                                        {/* <button
                                                            onClick={() => handleEditDrug(drug.id)}
                                                            className="inline-flex items-center px-3 py-1 text-sm text-green-600 hover:text-green-800 border border-green-300 rounded hover:bg-green-50 transition-colors"
                                                            title="Edit Drug"
                                                        >
                                                            <Edit className="w-4 h-4 mr-1" />
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteDrug(drug)}
                                                            className="inline-flex items-center px-3 py-1 text-sm text-red-600 hover:text-red-800 border border-red-300 rounded hover:bg-red-50 transition-colors"
                                                            title="Delete Drug"
                                                        >
                                                            <Trash2 className="w-4 h-4 mr-1" />
                                                            Delete
                                                        </button> */}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-8 text-center text-gray-500">

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
                                            required />
                                    </div>

                                    <div>
                                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                                            Drug Category *
                                        </label>
                                        <select id="category"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required>
                                            <option value="">Select category</option>
                                            <option value="Antibiotic">Antibiotic</option>
                                            <option value="Analgesic">Pain Killer</option>
                                            <option value="Antiviral">Antiviral</option>
                                            <option value="Antidiabetic">Antidiabetic</option>
                                            <option value="Antihistamine">Antihistamine</option>
                                            <option value="Antihypertensive">Antihypertensive</option>
                                            <option value="Sedative">Sedative</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="dosageForm" className="block text-sm font-medium text-gray-700 mb-1">
                                            Dosage Form *
                                        </label>
                                        <select id="dosageForm"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required>
                                            <option value="">Select dosage form</option>
                                            <option value="Tablet">Tablet</option>
                                            <option value="Capsule">Capsule</option>
                                            <option value="Syrup">Syrup</option>
                                            <option value="Injection">Injection</option>
                                            <option value="Cream">Cream</option>
                                            <option value="Ointment">Ointment</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="strength" className="block text-sm font-medium text-gray-700 mb-1">
                                            Batch Number *
                                        </label>
                                        <input type="text" id="strength" placeholder="e.g. BTC202579"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required />
                                    </div>

                                    <div>
                                        <label htmlFor="manufactureDate"
                                            className="block text-sm font-medium text-gray-700 mb-1">
                                            Manufacturing Date *
                                        </label>
                                        <input type="date" id="manufactureDate"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required />
                                    </div>

                                    <div>
                                        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                                            Expiry Date *
                                        </label>
                                        <input type="date" id="expiryDate"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required />
                                    </div>

                                    {/* <div>
                                        <label htmlFor="manufacturer"
                                            className="block text-sm font-medium text-gray-700 mb-1">
                                            Manufacturer *
                                        </label>
                                        <input type="text" id="manufacturer"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required />
                                    </div> */}

                                    <div>
                                        <label htmlFor="countryOfOrigin"
                                            className="block text-sm font-medium text-gray-700 mb-1">
                                            Country of Origin *
                                        </label>
                                        <input type="text" id="countryOfOrigin"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label htmlFor="description"
                                            className="block text-sm font-medium text-gray-700 mb-1">
                                            Description
                                        </label>
                                        <textarea id="description" rows="3"
                                            placeholder="Describe the drug..."
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"></textarea>
                                    </div>
                                </div>

                                <div className="mt-8 flex justify-end space-x-3">
                                    <button type="button"
                                        onClick={toggleRegistrationForm}
                                        className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                                        Cancel
                                    </button>
                                    <button type="submit"
                                        className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition-colors">
                                        Register Drug
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
