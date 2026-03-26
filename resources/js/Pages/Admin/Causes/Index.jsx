import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function AdminCausesIndex({ causes, auth }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    const { delete: destroy, processing: deleting } = useForm();

    const filteredCauses = causes?.data?.filter(cause => {
        const matchesSearch = cause.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             cause.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' ||
                             (filterStatus === 'active' && cause.status === 'active') ||
                             (filterStatus === 'completed' && cause.status === 'completed');
        return matchesSearch && matchesStatus;
    }) || [];

    const handleDelete = (causeId) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette cause ? Cette action est irréversible.')) {
            destroy(route('admin.causes.destroy', causeId));
        }
    };

    const getStatusBadge = (status) => {
        return status === 'active'
            ? <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Active</span>
            : <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">Terminée</span>;
    };

    return (
        <>
            <Head title="Admin - Gestion des causes" />

            <div className="min-h-screen bg-gray-50">
                {/* Sidebar Admin */}
                <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-20">
                    <div className="p-6">
                        <Link href="/admin/dashboard" className="flex items-center space-x-3 mb-8">
                            <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-green-500 rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold text-xl">F</span>
                            </div>
                            <span className="text-xl font-bold text-gray-800">Fund Admin</span>
                        </Link>

                        <nav className="space-y-2">
                            <Link href={route('admin.dashboard')} className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                                </svg>
                                <span>Tableau de bord</span>
                            </Link>
                            <Link href={route('admin.dons')} className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <span>Gestion des dons</span>
                            </Link>
                            <Link href={route('admin.causes.create')} className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                                </svg>
                                <span>Nouvelle cause</span>
                            </Link>
                            <Link href={route('admin.causes.index')} className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-green-50 text-green-600">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                </svg>
                                <span>Toutes les causes</span>
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

                {/* Contenu principal admin */}
                <div className="ml-64">
                    <div className="bg-white border-b border-gray-200 px-8 py-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">Gestion des causes</h1>
                                <p className="text-gray-500 text-sm">Administrez les campagnes caritatives</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Link href={route('admin.causes.create')} className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition flex items-center space-x-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                                    </svg>
                                    <span>Nouvelle cause</span>
                                </Link>
                                <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-green-500 rounded-full flex items-center justify-center text-white font-bold">
                                    {auth.user.name?.charAt(0).toUpperCase()}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-8">
                        {/* Filtres et recherche */}
                        <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1 relative">
                                    <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                    </svg>
                                    <input type="text" placeholder="Rechercher une cause..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => setFilterStatus('all')} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${filterStatus === 'all' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>Toutes</button>
                                    <button onClick={() => setFilterStatus('active')} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${filterStatus === 'active' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>Actives</button>
                                    <button onClick={() => setFilterStatus('completed')} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${filterStatus === 'completed' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>Terminées</button>
                                </div>
                            </div>
                        </div>

                        {/* Liste des causes admin */}
                        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                            {filteredCauses.length > 0 ? (
                                <div className="divide-y divide-gray-100">
                                    {filteredCauses.map((cause) => (
                                        <div key={cause.id} className="p-6 hover:bg-gray-50 transition">
                                            <div className="flex flex-col md:flex-row gap-6">
                                                <div className="md:w-48 h-32 rounded-xl overflow-hidden flex-shrink-0">
                                                    {cause.image ? <img src={`/storage/${cause.image}`} alt={cause.title} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center"><span className="text-white text-2xl">❤️</span></div>}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                                                        <h3 className="text-lg font-bold text-gray-800">{cause.title}</h3>
                                                        {getStatusBadge(cause.status)}
                                                    </div>
                                                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{cause.description}</p>
                                                    <div className="flex items-center gap-4 text-sm">
                                                        <div><span className="text-gray-500">Objectif:</span><span className="font-semibold text-gray-700 ml-1">{cause.goal_amount.toLocaleString()} FCFA</span></div>
                                                        <div><span className="text-gray-500">Collecté:</span><span className="font-semibold text-green-600 ml-1">{cause.current_amount.toLocaleString()} FCFA</span></div>
                                                        <div><span className="text-gray-500">Progression:</span><span className="font-semibold text-blue-600 ml-1">{cause.percentage}%</span></div>
                                                        <div><span className="text-gray-500">Dons:</span><span className="font-semibold text-gray-700 ml-1">{cause.dons_count || 0}</span></div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <Link href={route('causes.show', cause.id)} className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-100 transition text-center">Voir</Link>
                                                    <Link href={route('admin.causes.edit', cause.id)} className="px-4 py-2 bg-yellow-50 text-yellow-600 rounded-lg text-sm font-semibold hover:bg-yellow-100 transition text-center">Modifier</Link>
                                                    <button onClick={() => handleDelete(cause.id)} disabled={deleting} className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-100 transition text-center">Supprimer</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                                    <p className="text-gray-500">Aucune cause trouvée</p>
                                    <Link href={route('admin.causes.create')} className="text-green-600 hover:underline mt-2 inline-block">Créer une nouvelle cause</Link>
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {causes?.links && causes.links.length > 3 && (
                            <div className="mt-6 flex justify-center">
                                <div className="flex space-x-2">
                                    {causes.links.map((link, index) => (
                                        <Link key={index} href={link.url || '#'} className={`px-3 py-2 rounded-lg text-sm font-medium transition ${link.active ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`} dangerouslySetInnerHTML={{ __html: link.label }} />
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
