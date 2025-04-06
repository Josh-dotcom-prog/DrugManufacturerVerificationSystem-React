import React from 'react'

function Footer() {
    return (
        <div>
            <footer class="bg-black text-white py-8">
                <div class="container mx-auto px-4">
                    <div class="grid md:grid-cols-4 gap-8">
                        <div>
                            <h3 class="text-lg font-semibold mb-4"><i class="fas fa-pills text-white text-2xl"></i>DMVS</h3>
                            <p class="text-gray-400">Ensuring medication safety through advanced verification technology.</p>
                        </div>

                        <div>
                            <h3 class="text-lg font-semibold mb-4">Contact</h3>
                            <ul class="space-y-2 text-gray-400">
                                <li><i class="fas fa-envelope mr-2"></i> info@dvms.com</li>
                                <li><i class="fas fa-phone mr-2"></i> +256 394 727 476</li>
                                <li><i class="fas fa-map-marker-alt mr-2"></i>PortBell Road, Nakawa-Kampala(U)</li>
                            </ul>
                        </div>
                        <div>
                            <h3 class="text-lg font-semibold mb-4">Connect</h3>
                            <div class="flex space-x-4">
                                <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-facebook-f text-xl"></i></a>
                                <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-twitter text-xl"></i></a>
                                <a href="#" class="text-gray-400 hover:text-white"><i
                                    class="fab fa-linkedin-in text-xl"></i></a>
                                <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-instagram text-xl"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
                        <p>&copy; 2025 DMVS. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer
