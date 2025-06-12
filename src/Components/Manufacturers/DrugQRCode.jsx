import React from 'react';
import { useLocation } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';

const DrugQRCode = () => {
    const location = useLocation();
    const { drugData } = location.state || {};

    if (!drugData) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-red-500">No drug data found. Please register a drug first.</p>
            </div>
        );
    }

    // Generate verification URL with formatted drug data
    const generateVerificationUrl = () => {
        if (!drugData) return "";

        const formattedData = {
            drugName: drugData.drugName || drugData.name,
            category: drugData.category,
            dosageForm: drugData.dosage_form || drugData.dosageForm,
            manufactureDate: drugData.manufacturing_date,
            expiryDate: drugData.expiry_date,
            registrationDate: drugData.created_at?.split("T")[0] || new Date().toISOString().split("T")[0],
        };

        const encodedData = encodeURIComponent(JSON.stringify(formattedData));
        const baseUrl = window.location.origin;
        return `${baseUrl}/verification?data=${encodedData}`;
    };

    const verificationUrl = generateVerificationUrl();

    // Download QR code as PNG
    const downloadQRCode = () => {
        const svg = document.querySelector('#qr-code svg');
        if (svg) {
            const svgData = new XMLSerializer().serializeToString(svg);
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();

            canvas.width = svg.width.baseVal.value;
            canvas.height = svg.height.baseVal.value;

            img.onload = function () {
                ctx.drawImage(img, 0, 0);
                const pngUrl = canvas.toDataURL('image/png');
                const downloadLink = document.createElement('a');
                downloadLink.href = pngUrl;
                downloadLink.download = `${drugData.drugName || drugData.name}_${drugData.batchNumber || drugData.batch_number}.png`;
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
            };

            img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
        }
    };

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
                <div className="p-6 flex items-center space-x-3 border-b border-gray-200">
                    <i className="fas fa-pills text-green-600 text-2xl"></i>
                    <h1 className="text-xl font-bold text-green-600">DMVS</h1>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 overflow-y-auto p-6">
                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Drug Registration Successful</h1>

                    {/* QR Code Section */}
                    <div className="flex flex-col items-center mb-6">
                        <div id="qr-code" className="border-2 border-dashed border-gray-300 p-4 rounded-lg mb-4">
                            <QRCodeSVG
                                value={verificationUrl}
                                size={200}
                                level="H"
                                includeMargin={true}
                                fgColor="#1f2937"
                                bgColor="#ffffff"
                            />
                        </div>

                        <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 mb-4">
                            <button
                                onClick={downloadQRCode}
                                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
                            >
                                <i className="fas fa-download mr-2"></i> Download QR Code
                            </button>
                        </div>

                        {/* Manufacturer Info */}
                        <div className="text-center">
                            <p className="text-lg font-semibold text-gray-700">
                                Manufacturer: <span className="text-green-600">{drugData.manufacturer}</span>
                            </p>
                            <p className="text-green-700 font-medium">This manufacturer is authentic and verified.</p>
                        </div>
                    </div>

                    {/* Instructions */}
                    <div className="bg-green-50 p-4 rounded-md mb-6">
                        <h3 className="font-semibold text-green-800 mb-2">How to use this QR code:</h3>
                        <ol className="list-decimal list-inside text-green-700 space-y-1">
                            <li>Download and print this QR code</li>
                            <li>Attach it to the drug packaging or include it in the drug documentation</li>
                        </ol>
                    </div>

                    {/* Back Button */}
                    <div className="flex justify-end mt-8">
                        <a
                            href="/drugs"
                            className="text-green-600 hover:text-green-800 font-medium flex items-center"
                        >
                            <i className="fas fa-arrow-left mr-2"></i> Back to Drugs List
                        </a>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DrugQRCode;
