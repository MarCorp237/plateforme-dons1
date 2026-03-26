import React from 'react';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation avec grand logo */}
            <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-5 md:py-7">
                        {/* Logo en grand format */}
                        <Link href="/" className="flex items-center space-x-4 group">
                            {/* Cercle de fond pour le logo */}
                            <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-green-100 to-green-50 rounded-2xl flex items-center justify-center shadow-md group-hover:shadow-lg transition">
                                <img
                                    src="/images/logo.png"
                                    alt="Fund Logo"
                                    className="h-10 md:h-12 w-auto object-contain"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        const parent = e.target.parentNode;
                                        parent.innerHTML = '<span class="text-green-600 font-bold text-2xl">F</span>';
                                    }}
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                                    Fund
                                </span>
                                <span className="text-xs text-gray-400">Donner avec le cœur</span>
                            </div>
                        </Link>

                        {/* Navigation avec boutons plus grands */}
                        <div className="flex items-center space-x-4 md:space-x-8">
                            <Link
                                href={route('causes.index')}
                                className="text-gray-600 hover:text-green-600 transition font-medium text-base md:text-lg px-3 py-2 rounded-lg hover:bg-green-50"
                            >
                                Causes
                            </Link>
                            <Link
                                href={route('login')}
                                className="text-gray-600 hover:text-green-600 transition font-medium text-base md:text-lg px-3 py-2 rounded-lg hover:bg-green-50"
                            >
                                Connexion
                            </Link>
                            <Link
                                href={route('register')}
                                className="px-6 py-2.5 md:px-8 md:py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-full font-semibold hover:shadow-lg transition transform hover:scale-105 text-sm md:text-base shadow-md"
                            >
                                S'inscrire gratuitement
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main content */}
            <main>
                {children}
            </main>
        </div>
    );
}
