import React, { useState, useRef, useEffect } from 'react';
import { Camera } from 'lucide-react';
import jsQR from 'jsqr'; // You'll need to install this package

const DrugVerificationSystem = () => {
    const [showScanner, setShowScanner] = useState(false);
    const [scanResult, setResult] = useState(null);
    const [scanning, setScanning] = useState(false);

    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);

    // Start camera and QR scanning
    const handleScan = async () => {
        try {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                setShowScanner(true);
                setScanning(true);

                // Get camera stream
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: "environment" } // Use back camera if available
                });

                streamRef.current = stream;

                // Set video source to the camera stream
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                }
            } else {
                alert('Sorry, your browser does not support camera access');
            }
        } catch (error) {
            console.error("Error accessing camera:", error);
            alert('Failed to access camera: ' + error.message);
        }
    };

    // Stop camera stream and close scanner
    const closeScanner = () => {
        setShowScanner(false);
        setScanning(false);

        // Stop all video tracks
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

        // Make sure video is playing
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            // Set canvas dimensions to match video
            canvas.height = video.videoHeight;
            canvas.width = video.videoWidth;

            // Draw current video frame to canvas
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Get image data for QR processing
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

            // Process with jsQR
            const code = jsQR(imageData.data, imageData.width, imageData.height, {
                inversionAttempts: "dontInvert",
            });

            if (code) {
                // QR code found
                console.log("QR code detected:", code.data);
                handleQrResult(code.data);
                return;
            }
        }

        // Continue scanning if no QR code found
        requestAnimationFrame(scanQRCode);
    };

    // Handle successful QR scan
    const handleQrResult = (result) => {
        setResult(result);
        closeScanner();
    };

    // Start scanning when video is ready
    useEffect(() => {
        if (scanning && videoRef.current) {
            const handleVideoPlay = () => {
                requestAnimationFrame(scanQRCode);
            };

            videoRef.current.addEventListener('play', handleVideoPlay);

            return () => {
                if (videoRef.current) {
                    videoRef.current.removeEventListener('play', handleVideoPlay);
                }
            };
        }
    }, [scanning]);

    // Clean up on component unmount
    useEffect(() => {
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => {
                    track.stop();
                });
            }
        };
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Main Content */}
            <main className="container mx-auto px-4 py-8 flex-grow">
                {/* Hero Section */}
                <section className="text-center py-8 mb-12">
                    <h3 className="text-4xl font-bold text-gray-800 mb-4">Drug Manufacturer Verification System</h3>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">SCAN.     VERIFY.    SECURE</h3>
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
                                    onClick={handleScan}
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
                        {/* Scan QR Code card */}
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Camera className="text-green-600" size={24} />
                            </div>
                            <h3 className="font-semibold text-lg mb-2">Scan QR Code</h3>
                            <p className="text-gray-600">Locate the QR code on your medication packaging.</p>
                        </div>
                        {/* Verification card */}
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
                        <div className="relative">
                            <video
                                ref={videoRef}
                                className="w-full h-64 bg-black"
                                playsInline
                            />
                            <canvas
                                ref={canvasRef}
                                className="hidden"
                            />
                            <div className="absolute inset-0 border-2 border-green-500 opacity-50"></div>
                        </div>
                        <p className="text-center text-gray-600 my-2">Position QR code within the frame</p>
                        <div className="mt-4 flex space-x-2">
                            <button
                                className="flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                onClick={closeScanner}
                            >
                                Close Scanner
                            </button>
                            <button
                                className="flex-1 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                onClick={() => handleQrResult('AMOX500-BT20240125-PHARMACO')}
                            >
                                Scan
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DrugVerificationSystem;