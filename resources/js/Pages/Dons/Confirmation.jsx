import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Confirmation({ don, auth }) {
    return (
        <>
            <Head title="Confirmation de don" />

            <div className="min-h-screen bg-gray-50">
                {/* Sidebar */}
                <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-20">
                    <div className="p-6">
                        <Link href="/" className="flex items-center space-x-3 mb-8">
                            <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-green-500 rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold text-xl">F</span>
                            </div>
                            <span className="text-xl font-bold text-gray-800">Fund</span>
                        </Link>

                        <nav className="space-y-2">
                            <Link href={route('dashboard')} className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                                </svg>
                                <span>Tableau de bord</span>
                            </Link>
                            <Link href={route('causes.index')} className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                </svg>
                                <span>Causes</span>
                            </Link>
                            <Link href={route('dons.historique')} className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <span>Mes dons</span>
                            </Link>
                            <Link href={route('profile.edit')} className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                </svg>
                                <span>Mon profil</span>
                            </Link>
                        </nav>

                        <div className="absolute bottom-6 left-0 right-0 px-6">
                            <form method="POST" action={route('logout')}>
                                <button type="submit" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition w-full">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                                    </svg>
                                    <span>Déconnexion</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Contenu principal */}
                <div className="ml-64">
                    <div className="bg-white border-b border-gray-200 px-8 py-4">
                        <h1 className="text-2xl font-bold text-gray-800">Confirmation de don</h1>
                        <p className="text-gray-500 text-sm">Merci pour votre générosité</p>
                    </div>

                    <div className="p-8">
                        <div className="max-w-2xl mx-auto">
                            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                                <div className="bg-green-50 p-6 text-center border-b border-green-100">
                                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl font-bold text-green-700 mb-2">Don enregistré !</h2>
                                    <p className="text-green-600">Votre don a bien été pris en compte</p>
                                </div>

                                <div className="p-6 space-y-4">
                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                        <span className="text-gray-500">Cause</span>
                                        <span className="font-semibold text-gray-800">{don.cause?.title}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                        <span className="text-gray-500">Montant</span>
                                        <span className="font-bold text-green-600">{don.amount.toLocaleString()} FCFA</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                        <span className="text-gray-500">Mode de paiement</span>
                                        <span className="font-semibold text-gray-800">
                                            {don.payment_method === 'orange_money' ? 'Orange Money' : 'MTN Mobile Money'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                        <span className="text-gray-500">Code transaction</span>
                                        <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{don.transaction_code}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                        <span className="text-gray-500">Statut</span>
                                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                                            En attente de validation
                                        </span>
                                    </div>

                                    {don.message && (
                                        <div className="py-2">
                                            <span className="text-gray-500 block mb-1">Message</span>
                                            <p className="text-gray-700 italic">"{don.message}"</p>
                                        </div>
                                    )}
                                </div>

                                <div className="p-6 bg-gray-50 flex gap-3">
                                    <Link
                                        href={route('causes.show', don.cause_id)}
                                        className="flex-1 text-center border border-green-600 text-green-600 py-2 rounded-lg font-semibold hover:bg-green-50 transition"
                                    >
                                        Retour à la cause
                                    </Link>
                                    <Link
                                        href={route('dons.historique')}
                                        className="flex-1 text-center bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
                                    >
                                        Voir mes dons
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
