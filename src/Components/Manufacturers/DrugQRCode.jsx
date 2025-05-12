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

    // Convert drug data to a string for the QR code
    const qrData = JSON.stringify(drugData);

    // Download QR code as PNG
    const downloadQRCode = () => {
        const svg = document.querySelector('#qr-code svg');
        if (svg) {
            const svgData = new XMLSerializer().serializeToString(svg);
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();

            // Set canvas dimensions to match the SVG
            canvas.width = svg.width.baseVal.value;
            canvas.height = svg.height.baseVal.value;

            img.onload = function () {
                ctx.drawImage(img, 0, 0);
                const pngUrl = canvas.toDataURL('image/png');
                const downloadLink = document.createElement('a');
                downloadLink.href = pngUrl;
                downloadLink.download = `${drugData.drugName}_${drugData.batchNumber}.png`;
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
            };

            img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
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

            <main className="flex-1 overflow-y-auto p-6">
                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Drug Registration Successful</h1>

                    {/* Drug Information Summary */}
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold mb-4">Drug Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <p className="text-sm text-gray-600">Drug Name:</p>
                                <p className="font-medium">{drugData.drugName}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Batch Number:</p>
                                <p className="font-medium">{drugData.batchNumber}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Manufacturer:</p>
                                <p className="font-medium">{drugData.manufacturer}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Expiry Date:</p>
                                <p className="font-medium">{drugData.expiryDate}</p>
                            </div>
                        </div>
                    </div>

                    {/* QR Code Section */}
                    <div className="flex flex-col items-center mb-6">
                        <h2 className="text-lg font-semibold mb-4">Scan QR Code for Verification</h2>
                        <div id="qr-code" className="border-2 border-dashed border-gray-300 p-4 rounded-lg mb-4">
                            <QRCodeSVG
                                value={qrData}
                                size={200}
                                level="H"
                                includeMargin={true}
                                fgColor="#1f2937"
                                bgColor="#ffffff"
                            />
                        </div>
                        <button
                            onClick={downloadQRCode}
                            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
                        >
                            <i className="fas fa-download mr-2"></i> Download QR Code
                        </button>
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