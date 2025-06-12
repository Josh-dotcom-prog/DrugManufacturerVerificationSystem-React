import React, { useState, useRef, useEffect } from 'react';
import { Camera, Loader2 } from 'lucide-react';
import jsQR from 'jsqr';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/axios';

const ScannerPage = () => {
    const [showScanner, setShowScanner] = useState(false);
    const [scanning, setScanning] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [cameraError, setCameraError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);
    const scannerRef = useRef(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const checkMobile = () => {
            const userAgent = navigator.userAgent || navigator.vendor || window.opera;
            setIsMobile(/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase()));
        };
        checkMobile();
    }, []);

    const isValidDrugQRCode = (qrData) => {
        const drugQrPattern = /^DRUG-[A-Z]+-\d+[A-Z]*-[A-Z0-9]+-[A-Z]+$/;
        return drugQrPattern.test(qrData);
    };

    const useNativeScanner = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

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

    const handleQrResult = async (result) => {
        if (isValidDrugQRCode(result)) {
            setIsLoading(true);
            try {
                const [_, drugName, strength, batchNumber, manufacturer] = result.split('-');

                const response = await api.get('/drug/verify', {
                    params: {
                        drug_name: drugName,
                        batch_number: batchNumber,
                        manufacturer: manufacturer,
                        strength: strength
                    }
                });

                navigate('/verify', {
                    state: {
                        drugData: response.data,
                        scannedData: result
                    }
                });
            } catch (error) {
                console.error('Verification error:', error);
                setCameraError(error.response?.data?.message || 'Verification failed. Please try again.');
            } finally {
                setIsLoading(false);
            }
        } else {
            setCameraError('This is not a valid drug verification QR code');
            scannerRef.current = requestAnimationFrame(scanQRCode);
        }
    };

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

    return (
        <div className="flex flex-col min-h-screen">
            <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={(e) => {
                    // In a real app, process the image to detect QR codes
                    handleQrResult('DRUG-PANADOL-500MG-BT20240125-PHARMACO');
                }}
            />

            <main className="container mx-auto px-4 py-8 flex-grow">
                <section className="text-center py-8 mb-12">
                    <h3 className="text-4xl font-bold text-gray-800 mb-4">Drug Manufacturer Verification System</h3>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">SCAN. VERIFY. SECURE</h3>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto italic">
                        "Where Verification Meets Protection"
                    </p>
                </section>

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

export default ScannerPage;