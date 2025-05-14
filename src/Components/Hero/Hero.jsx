import React, { useState, useRef, useEffect } from 'react';
import { Camera, Loader2 } from 'lucide-react';
import jsQR from 'jsqr';

const DrugVerificationSystem = () => {
    const [showScanner, setShowScanner] = useState(false);
    const [scanResult, setResult] = useState(null);
    const [scanning, setScanning] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [cameraError, setCameraError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);
    const scannerRef = useRef(null);
    const fileInputRef = useRef(null);

    // Check if device is mobile on component mount
    useEffect(() => {
        const checkMobile = () => {
            const userAgent = navigator.userAgent || navigator.vendor || window.opera;
            setIsMobile(/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase()));
        };
        checkMobile();
    }, []);

    // Validate QR code format (adjust this to match your actual QR code format)
    const isValidDrugQRCode = (qrData) => {
        // Example pattern: DRUGNAME-STRENGTH-BATCH-MANUFACTURER
        const drugQrPattern = /^[A-Z0-9]+-[A-Z0-9]+-[A-Z0-9]+-[A-Z0-9]+$/;
        return drugQrPattern.test(qrData);
    };

    // Native scanner for mobile devices
    const useNativeScanner = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // Start camera and QR scanning
    const handleScan = async () => {
        setCameraError(null);
        setIsLoading(false);

        try {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                setShowScanner(true);
                setScanning(true);

                const constraints = {
                    video: {
                        facingMode: "environment",
                        width: { ideal: 1280 },
                        height: { ideal: 720 }
                    }
                };

                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                streamRef.current = stream;

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    await videoRef.current.play().catch(err => {
                        console.error("Error playing video:", err);
                        setCameraError("Failed to start video stream");
                    });
                }
            } else {
                setCameraError('Sorry, your browser does not support camera access');
            }
        } catch (error) {
            console.error("Error accessing camera:", error);
            setCameraError(`Failed to access camera: ${error.message}`);
        }
    };

    // Stop camera stream and close scanner
    const closeScanner = () => {
        setShowScanner(false);
        setScanning(false);
        setCameraError(null);
        setIsLoading(false);

        if (scannerRef.current) {
            cancelAnimationFrame(scannerRef.current);
            scannerRef.current = null;
        }

        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => {
                track.stop();
            });
        }
    };

    // Process video frames to detect QR codes
    const scanQRCode = () => {
        if (!scanning || !videoRef.current || !canvasRef.current) return;

        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            canvas.height = video.videoHeight;
            canvas.width = video.videoWidth;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height, {
                inversionAttempts: "dontInvert",
            });

            if (code) {
                handleQrResult(code.data);
                return;
            }
        }

        scannerRef.current = requestAnimationFrame(scanQRCode);
    };

    // Handle successful QR scan
    const handleQrResult = async (result) => {
        if (isValidDrugQRCode(result)) {
            setIsLoading(true);
            try {
                // Simulate API verification
                await new Promise(resolve => setTimeout(resolve, 1000));
                setResult(result);
                closeScanner();
            } catch (error) {
                setCameraError('Verification failed. Please try again.');
            } finally {
                setIsLoading(false);
            }
        } else {
            setCameraError('This is not a valid drug verification QR code');
            scannerRef.current = requestAnimationFrame(scanQRCode);
        }
    };

    // Start scanning when video becomes visible and ready
    useEffect(() => {
        if (scanning && videoRef.current) {
            const startScanning = () => {
                scannerRef.current = requestAnimationFrame(scanQRCode);
            };

            if (videoRef.current.readyState >= 2) {
                startScanning();
            } else {
                videoRef.current.addEventListener('loadeddata', startScanning);
            }

            return () => {
                if (videoRef.current) {
                    videoRef.current.removeEventListener('loadeddata', startScanning);
                }
                if (scannerRef.current) {
                    cancelAnimationFrame(scannerRef.current);
                }
            };
        }
    }, [scanning]);

    // Clean up on component unmount
    useEffect(() => {
        return () => {
            if (scannerRef.current) {
                cancelAnimationFrame(scannerRef.current);
            }
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => {
                    track.stop();
                });
            }
        };
    }, []);

    // Results Section Component
    const ResultsSection = ({ scanResult }) => {
        // Parse the QR code data (adjust based on your actual format)
        const [drugName, strength, batchNumber, manufacturer] = scanResult.split('-');

        const drugData = {
            name: drugName || "Unknown",
            strength: strength || "Unknown",
            manufacturer: manufacturer || "Unknown",
            batchNumber: batchNumber || "Unknown",
            expiryDate: "2026-01-25", // This would come from your database
            verified: true
        };

        return (
            <section className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden mb-12">
                <div className="bg-green-700 text-white py-3 px-4">
                    <h2 className="text-xl font-semibold">Verification Results</h2>
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
                            <span>Warning: Verification Failed</span>
                        </div>
                    )}

                    <div className="border rounded-md overflow-hidden">
                        <table className="w-full">
                            <tbody>
                                <tr className="border-b">
                                    <td className="py-2 px-4 bg-gray-50 font-medium">Product Name</td>
                                    <td className="py-2 px-4">{drugData.name}</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-2 px-4 bg-gray-50 font-medium">Strength</td>
                                    <td className="py-2 px-4">{drugData.strength}</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-2 px-4 bg-gray-50 font-medium">Manufacturer</td>
                                    <td className="py-2 px-4">{drugData.manufacturer}</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-2 px-4 bg-gray-50 font-medium">Batch Number</td>
                                    <td className="py-2 px-4">{drugData.batchNumber}</td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 bg-gray-50 font-medium">Expiry Date</td>
                                    <td className="py-2 px-4">{drugData.expiryDate}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-4 text-sm text-gray-600">
                        <p>Scanned Code: {scanResult}</p>
                        <p className="mt-2">Verified on: {new Date().toLocaleString()}</p>
                    </div>
                </div>
            </section>
        );
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hidden file input for mobile native scanning */}
            <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={(e) => {
                    // In a real app, you would process the image to detect QR codes
                    // For demo, we'll simulate a valid drug QR code
                    handleQrResult('AMOX-500MG-BT20240125-PHARMACO');
                }}
            />

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8 flex-grow">
                {/* Hero Section */}
                <section className="text-center py-8 mb-12">
                    <h3 className="text-4xl font-bold text-gray-800 mb-4">Drug Manufacturer Verification System</h3>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">SCAN. VERIFY. SECURE</h3>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto italic">
                        "Where Verification Meets Protection"
                    </p>
                </section>

                {/* Verification Box */}
                <section className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden mb-12">
                    <div className="bg-green-700 text-white py-3 px-4">
                        <h2 className="text-xl font-semibold">Drug Verification</h2>
                    </div>
                    <div className="p-6">
                        <div className="pt-4">
                            <div className="flex items-center justify-center flex-col">
                                <div className="border-2 border-dashed border-gray-300 p-8 rounded-lg text-center mb-4 w-64 h-64 flex items-center justify-center">
                                    <div className="text-center">
                                        <Camera className="mx-auto text-gray-400 mb-2" size={48} />
                                        <p className="text-gray-500">Click button below to activate camera</p>
                                    </div>
                                </div>
                                <button
                                    className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 flex items-center"
                                    onClick={isMobile ? useNativeScanner : handleScan}
                                >
                                    <Camera className="inline mr-2" size={16} /> Scan QR Code
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Results Section (Conditionally Rendered) */}
                {scanResult && <ResultsSection scanResult={scanResult} />}

                {/* How It Works */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">How It Works</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Camera className="text-green-600" size={24} />
                            </div>
                            <h3 className="font-semibold text-lg mb-2">Scan QR Code</h3>
                            <p className="text-gray-600">Locate the QR code on your medication packaging.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-green-600 text-2xl">🔍</span>
                            </div>
                            <h3 className="font-semibold text-lg mb-2">Instant Verification</h3>
                            <p className="text-gray-600">Our system checks the authenticity against manufacturer databases.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-green-600 text-2xl">✓</span>
                            </div>
                            <h3 className="font-semibold text-lg mb-2">View Results</h3>
                            <p className="text-gray-600">Get instant confirmation of your medication's authenticity and details.</p>
                        </div>
                    </div>
                </section>
            </main>

            {/* QR Scanner Modal */}
            {showScanner && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white p-4 rounded-lg w-full max-w-md">
                        {isLoading ? (
                            <div className="w-full h-64 flex flex-col items-center justify-center">
                                <Loader2 className="animate-spin h-12 w-12 text-green-600 mb-4" />
                                <p className="text-gray-600">Verifying QR code...</p>
                            </div>
                        ) : (
                            <>
                                <div className="relative">
                                    {cameraError ? (
                                        <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-red-600 p-4 text-center">
                                            <p>{cameraError}</p>
                                        </div>
                                    ) : (
                                        <>
                                            <video
                                                ref={videoRef}
                                                className="w-full h-64 bg-black object-cover"
                                                playsInline
                                                autoPlay
                                            />
                                            <canvas
                                                ref={canvasRef}
                                                className="hidden"
                                            />
                                            <div className="absolute inset-0 border-2 border-green-500 opacity-50 pointer-events-none">
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-48 h-48 border-2 border-white opacity-70"></div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <p className="text-center text-gray-600 my-2">Position QR code within the frame</p>
                                <div className="mt-4">
                                    <button
                                        className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                        onClick={closeScanner}
                                    >
                                        Close Scanner
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DrugVerificationSystem;