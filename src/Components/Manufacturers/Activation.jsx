import React, { useState } from 'react';

const AccountActivationSuccess = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleDashboardClick = () => {
        setIsLoading(true);
        // Simulate navigation - replace with your actual navigation logic
        setTimeout(() => {
            console.log('Navigating to dashboard...');
            window.location.href = '/manufacturersdashboard';
            setIsLoading(false);
        }, 1000);
    };


    const handleHelpClick = () => {
        console.log('Navigating to help center...');
        // window.location.href = '/help';
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-5">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 text-center shadow-2xl max-w-lg w-full relative ">
                <div className="animate-[fadeInUp_0.8s_ease-out]">
                    {/* Success Icon */}
                    <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-[bounceIn_1s_ease-out]">
                        <svg
                            className="w-10 h-10 text-white animate-[checkDraw_0.8s_ease-out_0.3s_both]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="3"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>

                    {/* Main Title */}
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        Account Activated!
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                        Welcome aboard! Your account has been successfully activated and you're ready to get started.
                    </p>

                    {/* Success Details */}
                    <div className="bg-gray-50 rounded-2xl p-6 mb-8 border-l-4 border-green-500">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">What's Next?</h3>
                        <div className="space-y-3 text-left">
                            {[
                                'Open your dashboard',
                                'Register your drugs and Generate QR codes',
                                'Manage your drugs',
                                'Stay updated with notifications',
                            ].map((item, index) => (
                                <div key={index} className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                    <span className="text-gray-700">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-4">
                        <button
                            onClick={handleDashboardClick}
                            disabled={isLoading}
                            className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-8 rounded-xl transform transition-all duration-200 shadow-lg ${isLoading
                                ? 'opacity-50 cursor-not-allowed'
                                : 'hover:from-blue-700 hover:to-purple-700 hover:scale-105 hover:shadow-xl'
                                }`}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    <span>Loading...</span>
                                </div>
                            ) : (
                                'Go to Dashboard'
                            )}
                        </button>

                    </div>
                </div>

                {/* Celebration Effects */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                    <div className="absolute top-4 left-4 w-2 h-2 bg-yellow-400 rounded-full animate-ping" />
                    <div className="absolute top-8 right-6 w-1 h-1 bg-pink-400 rounded-full animate-pulse" />
                    <div className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" />
                    <div className="absolute bottom-4 right-4 w-1 h-1 bg-green-400 rounded-full animate-ping" />
                </div>
            </div>

            {/* Floating particles for visual effect */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                {[
                    { top: '25%', left: '25%', size: 'w-2 h-2', animation: 'animate-pulse' },
                    { top: '33%', right: '25%', size: 'w-1 h-1', animation: 'animate-bounce' },
                    { bottom: '25%', left: '33%', size: 'w-1.5 h-1.5', animation: 'animate-ping' },
                    { bottom: '33%', right: '33%', size: 'w-1 h-1', animation: 'animate-pulse' }
                ].map((particle, index) => (
                    <div
                        key={index}
                        className={`absolute ${particle.size} bg-white/20 rounded-full ${particle.animation}`}
                        style={{
                            top: particle.top,
                            left: particle.left,
                            right: particle.right,
                            bottom: particle.bottom
                        }}
                    />
                ))}
            </div>

            {/* Custom CSS for animations */}
            <style jsx>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes bounceIn {
          0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
          40%, 43% { transform: translate3d(0, -15px, 0); }
          70% { transform: translate3d(0, -7px, 0); }
          90% { transform: translate3d(0, -2px, 0); }
        }
        
        @keyframes checkDraw {
          0% { stroke-dasharray: 0, 100; }
          100% { stroke-dasharray: 100, 0; }
        }
      `}</style>
        </div>
    );
};

export default AccountActivationSuccess;