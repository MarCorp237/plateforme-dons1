import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function AdminDons({ dons, auth }) {
    const [statusFilter, setStatusFilter] = useState('all');

    const { post } = useForm();

    const filteredDons = dons?.data?.filter(don => {
        return statusFilter === 'all' || don.status === statusFilter;
    }) || [];

    const handleValidate = (donId) => {
        if (confirm('Valider ce don ?')) {
            post(route('admin.dons.valider', donId));
        }
    };

    const handleReject = (donId) => {
        if (confirm('Rejeter ce don ?')) {
            post(route('admin.dons.rejeter', donId));
        }
    };

    const getStatusBadge = (status) => {
        const statuses = {
            pending: { label: 'En attente', class: 'bg-yellow-100 text-yellow-700' },
            validated: { label: 'Validé', class: 'bg-green-100 text-green-700' },
            rejected: { label: 'Rejeté', class: 'bg-red-100 text-red-700' }
        };
        const s = statuses[status] || { label: status, class: 'bg-gray-100 text-gray-700' };
        return <span className={`px-2 py-1 rounded-full text-xs font-semibold ${s.class}`}>{s.label}</span>;
    };

    return (
        <>
            <Head title="Admin - Gestion des dons" />

            <div className="min-h-screen bg-gray-50">
                {/* Sidebar Admin */}
                <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-20">
                    <div className="p-6">
                        <Link href={route('admin.dashboard')} className="flex items-center space-x-3 mb-8">
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
                            <Link href={route('admin.dons')} className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-green-50 text-green-600">
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
                            <Link href={route('admin.causes.index')} className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition">
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

                {/* Contenu principal */}
                <div className="ml-64">
                    <div className="bg-white border-b border-gray-200 px-8 py-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">Gestion des dons</h1>
                                <p className="text-gray-500 text-sm">Validez ou rejetez les dons en attente</p>
                            </div>
                            <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-green-500 rounded-full flex items-center justify-center text-white font-bold">
                                {auth.user.name?.charAt(0).toUpperCase()}
                            </div>
                        </div>
                    </div>

                    <div className="p-8">
                        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                            {/* Filtres */}
                            <div className="px-6 py-4 border-b border-gray-200 flex gap-2">
                                <button
                                    onClick={() => setStatusFilter('all')}
                                    className={`px-3 py-1 rounded-full text-sm font-medium transition ${statusFilter === 'all' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                >
                                    Tous
                                </button>
                                <button
                                    onClick={() => setStatusFilter('pending')}
                                    className={`px-3 py-1 rounded-full text-sm font-medium transition ${statusFilter === 'pending' ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                >
                                    En attente
                                </button>
                                <button
                                    onClick={() => setStatusFilter('validated')}
                                    className={`px-3 py-1 rounded-full text-sm font-medium transition ${statusFilter === 'validated' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                >
                                    Validés
                                </button>
                                <button
                                    onClick={() => setStatusFilter('rejected')}
                                    className={`px-3 py-1 rounded-full text-sm font-medium transition ${statusFilter === 'rejected' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                >
                                    Rejetés
                                </button>
                            </div>

                            {/* Tableau */}
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Donateur</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cause</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Montant</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Téléphone</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {filteredDons.length > 0 ? (
                                            filteredDons.map((don) => (
                                                <tr key={don.id} className="hover:bg-gray-50 transition">
                                                    <td className="px-6 py-4 text-sm text-gray-600">
                                                        {new Date(don.created_at).toLocaleString('fr-FR')}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div>
                                                            <p className="font-medium text-gray-800">{don.user?.name}</p>
                                                            <p className="text-xs text-gray-400">{don.user?.email}</p>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <Link href={route('causes.show', don.cause_id)} className="text-green-600 hover:underline">
                                                            {don.cause?.title}
                                                        </Link>
                                                    </td>
                                                    <td className="px-6 py-4 font-bold text-green-600">
                                                        {don.amount.toLocaleString()} FCFA
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-600">
                                                        {don.user?.phone}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <code className="text-xs bg-gray-100 px-2 py-1 rounded">{don.transaction_code}</code>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {getStatusBadge(don.status)}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {don.status === 'pending' && (
                                                            <div className="flex gap-2">
                                                                <button
                                                                    onClick={() => handleValidate(don.id)}
                                                                    className="px-3 py-1 bg-green-600 text-white rounded-lg text-xs font-semibold hover:bg-green-700 transition"
                                                                >
                                                                    Valider
                                                                </button>
                                                                <button
                                                                    onClick={() => handleReject(don.id)}
                                                                    className="px-3 py-1 bg-red-600 text-white rounded-lg text-xs font-semibold hover:bg-red-700 transition"
                                                                >
                                                                    Rejeter
                                                                </button>
                                                            </div>
                                                        )}
                                                        {don.status === 'validated' && don.coupon && (
                                                            <code className="text-xs bg-gray-100 px-2 py-1 rounded">{don.coupon?.code}</code>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                                                    Aucun don trouvé
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {dons?.links && dons.links.length > 3 && (
                                <div className="px-6 py-4 border-t border-gray-200 flex justify-center">
                                    <div className="flex space-x-2">
                                        {dons.links.map((link, index) => (
                                            <Link
                                                key={index}
                                                href={link.url || '#'}
                                                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                                                    link.active
                                                        ? 'bg-green-600 text-white'
                                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
            </div>
        </>
    );
}
