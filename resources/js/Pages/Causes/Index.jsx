import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';

export default function CausesIndex({ causes, auth }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    // Filtrer les causes
    const filteredCauses = causes?.data?.filter(cause => {
        const matchesSearch = cause.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             cause.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' ||
                             (filterStatus === 'active' && cause.status === 'active') ||
                             (filterStatus === 'completed' && cause.status === 'completed');
        return matchesSearch && matchesStatus;
    }) || [];

    return (
        <>
            <Head title="Causes caritatives" />

            <div className="min-h-screen bg-gray-50">
                {/* Sidebar Donateur */}
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
                            <Link href={route('causes.index')} className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-green-50 text-green-600">
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
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">Causes caritatives</h1>
                                <p className="text-gray-500 text-sm">Découvrez et soutenez les causes qui vous tiennent à cœur</p>
                            </div>
                            <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-green-500 rounded-full flex items-center justify-center text-white font-bold">
                                {auth?.user?.name?.charAt(0).toUpperCase()}
                            </div>
                        </div>
                    </div>

                    <div className="p-8">
                        {/* Barre de recherche et filtres */}
                        <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1 relative">
                                    <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                    </svg>
                                    <input
                                        type="text"
                                        placeholder="Rechercher une cause..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setFilterStatus('all')}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${filterStatus === 'all' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                    >
                                        Toutes
                                    </button>
                                    <button
                                        onClick={() => setFilterStatus('active')}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${filterStatus === 'active' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                    >
                                        Actives
                                    </button>
                                    <button
                                        onClick={() => setFilterStatus('completed')}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${filterStatus === 'completed' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                    >
                                        Terminées
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Grille des causes */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredCauses.length > 0 ? (
                                filteredCauses.map((cause) => (
                                    <div key={cause.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden group">
                                        <div className="relative h-48 overflow-hidden">
                                            {cause.image ? (
                                                <img src={`/storage/${cause.image}`} alt={cause.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
                                                    <span className="text-white text-4xl">❤️</span>
                                                </div>
                                            )}
                                            <div className="absolute top-3 right-3">
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${cause.status === 'active' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}>
                                                    {cause.status === 'active' ? 'Active' : 'Terminée'}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-5">
                                            <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">{cause.title}</h3>
                                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{cause.description}</p>

                                            <div className="mb-3">
                                                <div className="flex justify-between text-xs mb-1">
                                                    <span className="text-gray-500">Progression</span>
                                                    <span className="font-semibold text-green-600">{cause.percentage}%</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div className="bg-green-500 rounded-full h-2 transition-all duration-500" style={{ width: `${cause.percentage}%` }}></div>
                                                </div>
                                            </div>

                                            <div className="flex justify-between text-sm mb-4">
                                                <div>
                                                    <p className="text-gray-400 text-xs">Collecté</p>
                                                    <p className="font-bold text-green-600">{cause.current_amount.toLocaleString()} FCFA</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-gray-400 text-xs">Objectif</p>
                                                    <p className="font-semibold text-gray-700">{cause.goal_amount.toLocaleString()} FCFA</p>
                                                </div>
                                            </div>

                                            <Link href={`/causes/${cause.id}`} className="block text-center bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition">
                                                Voir détails
                                            </Link>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-12">
                                    <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                    </svg>
                                    <p className="text-gray-500">Aucune cause trouvée</p>
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {causes?.links && causes.links.length > 3 && (
                            <div className="mt-8 flex justify-center">
                                <div className="flex space-x-2">
                                    {causes.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                                                link.active ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
