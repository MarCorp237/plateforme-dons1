import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function CausesShow({ cause, totalCollecte, donateursRecents, comments, auth }) {
    const [showDonModal, setShowDonModal] = useState(false);
    const [showCommentModal, setShowCommentModal] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        amount: '',
        payment_method: 'orange_money',
        phone: auth?.user?.phone || '',
        message: '',
    });

    const { data: commentData, setData: setCommentData, post: postComment, processing: commentProcessing, reset: resetComment } = useForm({
        content: '',
    });

    const percentage = (totalCollecte / cause.goal_amount) * 100;

    const handleDonSubmit = (e) => {
        e.preventDefault();
        post(route('dons.store', cause.id), {
            onSuccess: () => {
                reset();
                setShowDonModal(false);
            }
        });
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        postComment(route('comments.store', cause.id), {
            onSuccess: () => {
                resetComment();
                setShowCommentModal(false);
            }
        });
    };

    return (
        <>
            <Head title={cause.title} />

            <div className="min-h-screen bg-gray-50">
                {/* Sidebar - même style que dashboard */}
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
                    {/* Header */}
                    <div className="bg-white border-b border-gray-200 px-8 py-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">{cause.title}</h1>
                                <p className="text-gray-500 text-sm">Détail de la cause</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-green-500 rounded-full flex items-center justify-center text-white font-bold">
                                    {auth?.user?.name?.charAt(0).toUpperCase()}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contenu */}
                    <div className="p-8">
                        <div className="max-w-4xl mx-auto">
                            {/* Image */}
                            {cause.image && (
                                <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
                                    <img src={`/storage/${cause.image}`} alt={cause.title} className="w-full h-96 object-cover" />
                                </div>
                            )}

                            {/* Description */}
                            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                                <h2 className="text-xl font-bold text-gray-800 mb-4">Description</h2>
                                <p className="text-gray-600 leading-relaxed">{cause.description}</p>
                            </div>

                            {/* Progression */}
                            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                                <h2 className="text-xl font-bold text-gray-800 mb-4">Progression</h2>
                                <div className="mb-4">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-gray-500">Collecte</span>
                                        <span className="font-semibold text-green-600">{Math.round(percentage)}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div className="bg-green-500 rounded-full h-3" style={{ width: `${Math.min(percentage, 100)}%` }}></div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <div className="p-4 bg-green-50 rounded-xl">
                                        <p className="text-gray-500 text-sm">Collecté</p>
                                        <p className="text-2xl font-bold text-green-600">{totalCollecte.toLocaleString()} FCFA</p>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-xl">
                                        <p className="text-gray-500 text-sm">Objectif</p>
                                        <p className="text-2xl font-bold text-gray-800">{cause.goal_amount.toLocaleString()} FCFA</p>
                                    </div>
                                </div>

                                {cause.status === 'active' && (
                                    <button
                                        onClick={() => setShowDonModal(true)}
                                        className="w-full mt-6 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
                                    >
                                        Faire un don maintenant
                                    </button>
                                )}
                            </div>

                            {/* Mur des donateurs */}
                            {donateursRecents?.length > 0 && (
                                <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                                    <h2 className="text-xl font-bold text-gray-800 mb-4">🏆 Mur des donateurs</h2>
                                    <div className="space-y-3">
                                        {donateursRecents.map((don) => (
                                            <div key={don.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                                        <span className="text-green-600 font-bold">{don.user?.name?.charAt(0)}</span>
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-800">{don.user?.name}</p>
                                                        <p className="text-xs text-gray-400">{new Date(don.created_at).toLocaleDateString('fr-FR')}</p>
                                                    </div>
                                                </div>
                                                <p className="font-bold text-green-600">{don.amount.toLocaleString()} FCFA</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Commentaires */}
                            <div className="bg-white rounded-2xl shadow-sm p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-bold text-gray-800">💬 Commentaires</h2>
                                    {auth?.user && (
                                        <button
                                            onClick={() => setShowCommentModal(true)}
                                            className="text-green-600 text-sm font-semibold hover:underline"
                                        >
                                            + Ajouter un commentaire
                                        </button>
                                    )}
                                </div>

                                {comments?.length > 0 ? (
                                    <div className="space-y-4">
                                        {comments.map((comment) => (
                                            <div key={comment.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                                                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                    <span className="text-orange-600 font-bold text-sm">{comment.user?.name?.charAt(0)}</span>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <p className="font-semibold text-gray-800 text-sm">{comment.user?.name}</p>
                                                        <p className="text-xs text-gray-400">{new Date(comment.created_at).toLocaleDateString('fr-FR')}</p>
                                                    </div>
                                                    <p className="text-gray-600 text-sm">{comment.content}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <p className="text-gray-500">Aucun commentaire pour le moment</p>
                                        <p className="text-sm text-gray-400 mt-1">Soyez le premier à laisser un message de soutien !</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Don - même que dashboard */}
            {showDonModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold text-gray-800">Faire un don</h3>
                                <button onClick={() => setShowDonModal(false)} className="text-gray-400 hover:text-gray-600">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>
                            <p className="text-gray-600 mb-4">Vous soutenez : <span className="font-bold text-green-600">{cause.title}</span></p>

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
