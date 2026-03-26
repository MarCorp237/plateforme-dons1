import React, { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Dashboard({ auth, stats, recentDons, recentComments, causes }) {
    const [selectedCause, setSelectedCause] = useState(null);
    const [showDonModal, setShowDonModal] = useState(false);
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');

    const { data, setData, post, processing, errors, reset } = useForm({
        cause_id: '',
        amount: '',
        payment_method: 'orange_money',
        phone: auth.user.phone || '',
        message: '',
    });

    const { data: commentData, setData: setCommentData, post: postComment, processing: commentProcessing, reset: resetComment } = useForm({
        content: '',
        cause_id: '',
    });

    const handleDonSubmit = (e) => {
        e.preventDefault();
        post(route('dons.store', data.cause_id), {
            onSuccess: () => {
                reset();
                setShowDonModal(false);
                setSelectedCause(null);
            }
        });
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        postComment(route('comments.store', commentData.cause_id), {
            onSuccess: () => {
                resetComment();
                setShowCommentModal(false);
            }
        });
    };

    const openDonModal = (cause) => {
        setSelectedCause(cause);
        setData({
            cause_id: cause.id,
            amount: '',
            payment_method: 'orange_money',
            phone: auth.user.phone || '',
            message: '',
        });
        setShowDonModal(true);
    };

    const openCommentModal = (cause) => {
        setCommentData({
            content: '',
            cause_id: cause.id,
        });
        setShowCommentModal(true);
    };

    // Données pour les activités
    const activities = [
        { name: 'Collecte Enfants', time: 'Il y a 2 min', amount: '25 000 FCFA', status: 'validé', icon: '🎯' },
        { name: 'Puits Village', time: 'Il y a 1 heure', amount: '50 000 FCFA', status: 'en attente', icon: '💧' },
        { name: 'Équipement médical', time: 'Hier', amount: '100 000 FCFA', status: 'validé', icon: '🏥' },
    ];

    return (
        <>
            <Head title="Tableau de bord" />

            <div className="min-h-screen bg-gray-50">
                {/* Sidebar latérale style dash.jpg */}
                <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-20">
                    <div className="p-6">
                        <div className="flex items-center space-x-3 mb-8">
                            <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-green-500 rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold text-xl">F</span>
                            </div>
                            <span className="text-xl font-bold text-gray-800">Fund</span>
                        </div>

                        <nav className="space-y-2">
                            <button
                                onClick={() => setActiveTab('overview')}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${activeTab === 'overview' ? 'bg-green-50 text-green-600' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                                </svg>
                                <span>Tableau de bord</span>
                            </button>
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
                    {/* Header */}
                    <div className="bg-white border-b border-gray-200 px-8 py-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">Tableau de bord</h1>
                                <p className="text-gray-500 text-sm">Bienvenue, {auth.user.name}</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <input type="text" placeholder="Rechercher..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                                    <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                    </svg>
                                </div>
                                <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-green-500 rounded-full flex items-center justify-center text-white font-bold">
                                    {auth.user.name?.charAt(0).toUpperCase()}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contenu Dashboard */}
                    <div className="p-8">
                        {/* Statistiques */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                            <div className="bg-white rounded-2xl p-6 shadow-sm border-l-4 border-green-500">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-500 text-sm">Dons totaux</p>
                                        <p className="text-3xl font-bold text-gray-800">{stats?.totalDons || 0}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-sm border-l-4 border-blue-500">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-500 text-sm">Montant total</p>
                                        <p className="text-3xl font-bold text-gray-800">{stats?.totalAmount?.toLocaleString() || 0} FCFA</p>
                                    </div>
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-sm border-l-4 border-purple-500">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-500 text-sm">Causes soutenues</p>
                                        <p className="text-3xl font-bold text-gray-800">{stats?.causesSupported || 0}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-sm border-l-4 border-orange-500">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-500 text-sm">Commentaires</p>
                                        <p className="text-3xl font-bold text-gray-800">{stats?.totalComments || 0}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                                        <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Activités récentes style dash.jpg */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm overflow-hidden">
                                <div className="px-6 py-4 border-b border-gray-200">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-semibold text-gray-800">Activités récentes</h3>
                                        <Link href={route('dons.historique')} className="text-green-600 text-sm hover:underline">Voir tout</Link>
                                    </div>
                                </div>
                                <div className="divide-y divide-gray-100">
                                    {recentDons?.length > 0 ? recentDons.map((don, index) => (
                                        <div key={don.id} className="flex items-center justify-between p-4 hover:bg-gray-50 transition">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                                    <span className="text-green-600 text-xl">💰</span>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-800">{don.cause?.title}</p>
                                                    <p className="text-xs text-gray-400">{new Date(don.created_at).toLocaleString('fr-FR')}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-green-600">{don.amount.toLocaleString()} FCFA</p>
                                                <span className={`text-xs px-2 py-1 rounded-full ${don.status === 'validated' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                    {don.status === 'validated' ? 'Validé' : 'En attente'}
                                                </span>
                                            </div>
                                        </div>
                                    )) : (
                                        <div className="p-8 text-center">
                                            <p className="text-gray-500">Aucune activité récente</p>
                                            <Link href={route('causes.index')} className="text-green-600 text-sm mt-2 inline-block">Faire un don maintenant</Link>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Causes avec progression */}
                            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                                <div className="px-6 py-4 border-b border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-800">Causes populaires</h3>
                                </div>
                                <div className="p-4 space-y-4">
                                    {causes?.slice(0, 3).map((cause) => (
                                        <div key={cause.id} className="p-3 bg-gray-50 rounded-xl">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-semibold text-gray-800 text-sm">{cause.title}</h4>
                                                <span className="text-xs text-green-600 font-bold">{cause.percentage}%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                                                <div className="bg-green-500 rounded-full h-2" style={{ width: `${cause.percentage}%` }}></div>
                                            </div>
                                            <div className="flex justify-between text-xs text-gray-500 mb-3">
                                                <span>{cause.current_amount.toLocaleString()} FCFA</span>
                                                <span>Objectif: {cause.goal_amount.toLocaleString()} FCFA</span>
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={() => openDonModal(cause)} className="flex-1 bg-green-600 text-white py-1.5 rounded-lg text-xs font-semibold hover:bg-green-700 transition">
                                                    Donner
                                                </button>
                                                <button onClick={() => openCommentModal(cause)} className="flex-1 border border-green-600 text-green-600 py-1.5 rounded-lg text-xs font-semibold hover:bg-green-50 transition">
                                                    Commenter
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Commentaires récents */}
                        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold text-gray-800">Commentaires récents</h3>
                                    <Link href={route('causes.index')} className="text-green-600 text-sm hover:underline">Voir toutes les causes</Link>
                                </div>
                            </div>
                            <div className="p-6">
                                {recentComments?.length > 0 ? (
                                    <div className="space-y-4">
                                        {recentComments.map((comment) => (
                                            <div key={comment.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                                                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                    <span className="text-orange-600 font-bold">{comment.user?.name?.charAt(0)}</span>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <p className="font-semibold text-gray-800">{comment.user?.name}</p>
                                                        <p className="text-xs text-gray-400">{new Date(comment.created_at).toLocaleDateString('fr-FR')}</p>
                                                    </div>
                                                    <p className="text-gray-600 text-sm mb-2">{comment.content}</p>
                                                    <p className="text-xs text-green-600">Pour: {comment.cause?.title}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <p className="text-gray-500">Aucun commentaire pour le moment</p>
                                        <Link href={route('causes.index')} className="text-green-600 text-sm mt-2 inline-block">Commenter une cause</Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Don - Style moderne */}
            {showDonModal && selectedCause && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold text-gray-800">Faire un don</h3>
                                <button onClick={() => setShowDonModal(false)} className="text-gray-400 hover:text-gray-600">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>
                            <p className="text-gray-600 mb-4">Vous soutenez : <span className="font-bold text-green-600">{selectedCause.title}</span></p>

                            <form onSubmit={handleDonSubmit}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Montant (FCFA)</label>
                                    <input type="number" value={data.amount} onChange={(e) => setData('amount', e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="Minimum 500 FCFA" min="500" max="1000000" required />
                                    {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Mode de paiement</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <label className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition ${data.payment_method === 'orange_money' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'}`}>
                                            <input type="radio" value="orange_money" checked={data.payment_method === 'orange_money'} onChange={(e) => setData('payment_method', e.target.value)} className="hidden" />
                                            <div className="text-center">
                                                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-1">
                                                    <span className="text-white font-bold">OM</span>
                                                </div>
                                                <span className="text-xs">Orange Money</span>
                                            </div>
                                        </label>
                                        <label className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition ${data.payment_method === 'mtn_money' ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200'}`}>
                                            <input type="radio" value="mtn_money" checked={data.payment_method === 'mtn_money'} onChange={(e) => setData('payment_method', e.target.value)} className="hidden" />
                                            <div className="text-center">
                                                <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-1">
                                                    <span className="text-white font-bold">MoMo</span>
                                                </div>
                                                <span className="text-xs">MTN Mobile Money</span>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de téléphone</label>
                                    <input type="tel" value={data.phone} onChange={(e) => setData('phone', e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="6XXXXXXXX" required />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Message (optionnel)</label>
                                    <textarea value={data.message} onChange={(e) => setData('message', e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent" rows="2" placeholder="Laissez un message de soutien..."></textarea>
                                </div>

                                <button type="submit" disabled={processing} className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50">
                                    {processing ? 'Traitement...' : 'Confirmer le don'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Commentaire */}
            {showCommentModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold text-gray-800">Ajouter un commentaire</h3>
                                <button onClick={() => setShowCommentModal(false)} className="text-gray-400 hover:text-gray-600">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>

                            <form onSubmit={handleCommentSubmit}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Votre message</label>
                                    <textarea value={commentData.content} onChange={(e) => setCommentData('content', e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent" rows="4" placeholder="Exprimez votre soutien..." required></textarea>
                                </div>

                                <button type="submit" disabled={commentProcessing} className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50">
                                    {commentProcessing ? 'Envoi...' : 'Publier le commentaire'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
