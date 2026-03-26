import React, { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    PointElement,
    LineElement,
    Filler  // Ajouter Filler
} from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement, Filler);

export default function AdminDashboard({ stats, recentDons, notifications, auth }) {
    const [showNotification, setShowNotification] = useState(true);
    const [selectedChart, setSelectedChart] = useState('daily');
    const [showCreateCauseModal, setShowCreateCauseModal] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
        goal_amount: '',
        image: null,
        end_date: '',
    });

    // Données pour le graphique des dons
    const donationData = {
        daily: {
            labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
            values: stats?.dailyDonations || [12500, 18900, 15600, 22400, 19800, 14200, 9800]
        },
        weekly: {
            labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
            values: stats?.weeklyDonations || [125000, 189000, 156000, 224000]
        },
        monthly: {
            labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
            values: stats?.monthlyDonations || [1250000, 1890000, 1560000, 2240000, 1980000, 1420000, 980000, 1100000, 1350000, 1680000, 1920000, 2100000]
        },
        yearly: {
            labels: ['2020', '2021', '2022', '2023', '2024'],
            values: stats?.yearlyDonations || [12500000, 18900000, 15600000, 22400000, 19800000]
        }
    };

    // Données pour le graphique des causes
    const causesData = {
        labels: stats?.causesLabels || ['Enfants', 'Eau', 'Santé', 'Éducation', 'Autres'],
        values: stats?.causesValues || [35, 25, 20, 15, 5],
        backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ef4444']
    };

    // Données pour le graphique des ventes/collectes
    const salesData = {
        online: {
            label: 'Dons Mobile',
            data: stats?.onlineDonations || [65, 70, 75, 80, 85, 88, 92],
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)'
        },
        store: {
            label: 'Dons Directs',
            data: stats?.storeDonations || [35, 30, 25, 20, 15, 12, 8],
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)'
        }
    };

    const handleCreateCause = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('goal_amount', data.goal_amount);
        if (data.image) formData.append('image', data.image);
        if (data.end_date) formData.append('end_date', data.end_date);

        post(route('causes.store'), formData, {
            onSuccess: () => {
                reset();
                setShowCreateCauseModal(false);
            }
        });
    };

    const barChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top' },
            tooltip: { mode: 'index', intersect: false }
        },
        scales: {
            y: { beginAtZero: true, grid: { color: '#e5e7eb' } },
            x: { grid: { display: false } }
        }
    };

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } }
    };

    const lineChartData = {
        labels: donationData[selectedChart].labels,
        datasets: [
            {
                label: 'Collecte (FCFA)',
                data: donationData[selectedChart].values,
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#10b981',
                pointBorderColor: '#fff',
                pointRadius: 4,
                pointHoverRadius: 6
            }
        ]
    };

    const doughnutChartData = {
        labels: causesData.labels,
        datasets: [{
            data: causesData.values,
            backgroundColor: causesData.backgroundColor,
            borderWidth: 0,
            hoverOffset: 10
        }]
    };

    const comparisonChartData = {
        labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
        datasets: [
            {
                label: 'Orange Money',
                data: salesData.online.data,
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.5)',
                borderRadius: 8
            },
            {
                label: 'MTN Mobile Money',
                data: salesData.store.data,
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
                borderRadius: 8
            }
        ]
    };

    return (
        <>
            <Head title="Admin - Tableau de bord" />

            <div className="min-h-screen bg-gray-50">
                {/* Sidebar Admin */}
                <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-20">
                    <div className="p-6">
                        <Link href="/admin/dashboard" className="flex items-center space-x-3 mb-8">
                            <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-green-500 rounded-xl flex items-center justify-center animate-pulse">
                                <span className="text-white font-bold text-xl">F</span>
                            </div>
                            <span className="text-xl font-bold text-gray-800">Fund Admin</span>
                        </Link>

                        <nav className="space-y-2">
                            <Link href={route('admin.dashboard')} className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-green-50 text-green-600 transition-all duration-300 hover:translate-x-1">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                                </svg>
                                <span>Tableau de bord</span>
                            </Link>
                            <Link href={route('admin.dons')} className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-all duration-300 hover:translate-x-1">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <span>Gestion des dons</span>
                            </Link>
                            <button onClick={() => setShowCreateCauseModal(true)} className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-all duration-300 hover:translate-x-1">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                                </svg>
                                <span>Nouvelle cause</span>
                            </button>
                            <Link href={route('causes.index')} className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-all duration-300 hover:translate-x-1">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                </svg>
                                <span>Toutes les causes</span>
                            </Link>
                        </nav>

                        <div className="absolute bottom-6 left-0 right-0 px-6">
                            <form method="POST" action={route('logout')}>
                                <button type="submit" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-300 w-full">
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
                    {/* Header avec notifications */}
                    <div className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-10">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800 animate-fade-in">Tableau de bord Admin</h1>
                                <p className="text-gray-500 text-sm">Bienvenue, {auth.user.name}</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <button className="relative p-2 text-gray-400 hover:text-gray-600 transition">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                                        </svg>
                                        {notifications?.filter(n => !n.read_at).length > 0 && (
                                            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                                        )}
                                    </button>
                                </div>
                                <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-green-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                                    {auth.user.name?.charAt(0).toUpperCase()}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Cartes statistiques animées */}
                    <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-green-500 animate-slide-up">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-500 text-sm">Total Collecté</p>
                                        <p className="text-2xl font-bold text-gray-800">{stats?.totalCollecte?.toLocaleString() || 0} FCFA</p>
                                        <span className="text-xs text-green-500">+{stats?.growth || 12}% ce mois</span>
                                    </div>
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-blue-500 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-500 text-sm">Dons Reçus</p>
                                        <p className="text-2xl font-bold text-gray-800">{stats?.dons || 0}</p>
                                        <span className="text-xs text-green-500">+{stats?.donsGrowth || 8} nouveaux</span>
                                    </div>
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-purple-500 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-500 text-sm">Causes Actives</p>
                                        <p className="text-2xl font-bold text-gray-800">{stats?.causes || 0}</p>
                                        <span className="text-xs text-gray-500">{stats?.completedCauses || 0} terminées</span>
                                    </div>
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-orange-500 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-500 text-sm">Donateurs</p>
                                        <p className="text-2xl font-bold text-gray-800">{stats?.donateurs || 0}</p>
                                        <span className="text-xs text-green-500">+{stats?.newDonateurs || 15} nouveaux</span>
                                    </div>
                                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                                        <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Graphiques */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                            {/* Graphique des collectes */}
                            <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-xl transition-all duration-300">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold text-gray-800">Évolution des collectes</h3>
                                    <div className="flex space-x-2">
                                        {['daily', 'weekly', 'monthly', 'yearly'].map((period) => (
                                            <button
                                                key={period}
                                                onClick={() => setSelectedChart(period)}
                                                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 ${selectedChart === period ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                            >
                                                {period === 'daily' ? 'Jour' : period === 'weekly' ? 'Semaine' : period === 'monthly' ? 'Mois' : 'Année'}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="h-80">
                                    <Line data={lineChartData} options={barChartOptions} />
                                </div>
                            </div>

                            {/* Graphique circulaire des causes */}
                            <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-xl transition-all duration-300">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Répartition par cause</h3>
                                <div className="h-80">
                                    <Doughnut data={doughnutChartData} options={doughnutOptions} />
                                </div>
                                <div className="flex flex-wrap justify-center gap-4 mt-4">
                                    {causesData.labels.map((label, i) => (
                                        <div key={i} className="flex items-center space-x-2">
                                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: causesData.backgroundColor[i] }}></div>
                                            <span className="text-sm text-gray-600">{label}</span>
                                            <span className="text-sm font-semibold">{causesData.values[i]}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Graphique comparatif OM/MoMo et Dons en attente */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                            <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-xl transition-all duration-300">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Comparaison OM vs MoMo</h3>
                                <div className="h-80">
                                    <Bar data={comparisonChartData} options={barChartOptions} />
                                </div>
                            </div>

                            {/* Dons en attente - Actions rapides */}
                            <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-xl transition-all duration-300">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                    <svg className="w-5 h-5 text-yellow-500 mr-2 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    Dons en attente de validation
                                </h3>
                                {recentDons?.filter(d => d.status === 'pending').length > 0 ? (
                                    <div className="space-y-3 max-h-80 overflow-y-auto">
                                        {recentDons.filter(d => d.status === 'pending').slice(0, 5).map((don, index) => (
                                            <div key={don.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-xl animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                                                <div>
                                                    <p className="font-medium text-gray-800">{don.user?.name}</p>
                                                    <p className="text-sm text-gray-500">{don.cause?.title}</p>
                                                    <p className="text-xs text-gray-400">{new Date(don.created_at).toLocaleString('fr-FR')}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-yellow-600">{don.amount.toLocaleString()} FCFA</p>
                                                    <div className="flex gap-2 mt-2">
                                                        <button
                                                            onClick={() => {
                                                                if (confirm('Valider ce don ?')) {
                                                                    window.location.href = route('admin.dons.valider', don.id);
                                                                }
                                                            }}
                                                            className="px-3 py-1 bg-green-600 text-white rounded-lg text-xs font-semibold hover:bg-green-700 transition transform hover:scale-105"
                                                        >
                                                            Valider
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                if (confirm('Rejeter ce don ?')) {
                                                                    window.location.href = route('admin.dons.rejeter', don.id);
                                                                }
                                                            }}
                                                            className="px-3 py-1 bg-red-600 text-white rounded-lg text-xs font-semibold hover:bg-red-700 transition transform hover:scale-105"
                                                        >
                                                            Rejeter
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <Link href={route('admin.dons')} className="block text-center text-green-600 hover:underline text-sm mt-4">
                                            Voir tous les dons en attente →
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <p className="text-gray-500">Aucun don en attente</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Dernières activités et actions */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Derniers dons */}
                            <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-xl transition-all duration-300">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">📊 Derniers dons</h3>
                                <div className="space-y-3">
                                    {recentDons?.slice(0, 5).map((don, index) => (
                                        <div key={don.id} className="flex items-center justify-between p-2 border-b border-gray-100 animate-slide-right" style={{ animationDelay: `${index * 0.1}s` }}>
                                            <div>
                                                <p className="font-medium text-gray-800">{don.user?.name}</p>
                                                <p className="text-xs text-gray-400">{new Date(don.created_at).toLocaleString('fr-FR')}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-green-600">{don.amount.toLocaleString()} FCFA</p>
                                                <span className={`text-xs px-2 py-0.5 rounded-full ${don.status === 'validated' ? 'bg-green-100 text-green-700' : don.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                                                    {don.status === 'validated' ? 'Validé' : don.status === 'pending' ? 'En attente' : 'Rejeté'}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Notifications */}
                            <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-xl transition-all duration-300">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">🔔 Notifications</h3>
                                <div className="space-y-3 max-h-80 overflow-y-auto">
                                    {notifications?.length > 0 ? (
                                        notifications.slice(0, 5).map((notif, index) => (
                                            <div key={notif.id} className={`p-3 rounded-xl transition-all duration-300 transform hover:translate-x-1 ${!notif.read_at ? 'bg-green-50 border-l-4 border-green-500' : 'bg-gray-50'}`}>
                                                <p className="text-sm text-gray-700">{notif.data?.message || notif.data}</p>
                                                <p className="text-xs text-gray-400 mt-1">{new Date(notif.created_at).toLocaleString('fr-FR')}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 text-center py-4">Aucune notification</p>
                                    )}
                                </div>
                            </div>

                            {/* Actions rapides */}
                            <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-xl transition-all duration-300">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">⚡ Actions rapides</h3>
                                <div className="space-y-3">
                                    <button
                                        onClick={() => setShowCreateCauseModal(true)}
                                        className="w-full flex items-center justify-between p-3 bg-green-50 rounded-xl hover:bg-green-100 transition-all duration-300 transform hover:scale-105"
                                    >
                                        <span className="text-green-700 font-medium">➕ Créer une nouvelle cause</span>
                                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                        </svg>
                                    </button>
                                    <Link
                                        href={route('admin.dons')}
                                        className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all duration-300 transform hover:scale-105"
                                    >
                                        <span className="text-blue-700 font-medium">💰 Gérer les dons</span>
                                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                        </svg>
                                    </Link>
                                    <Link
                                        href={route('causes.index')}
                                        className="w-full flex items-center justify-between p-3 bg-purple-50 rounded-xl hover:bg-purple-100 transition-all duration-300 transform hover:scale-105"
                                    >
                                        <span className="text-purple-700 font-medium">👁️ Voir toutes les causes</span>
                                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Créer une cause */}
            {showCreateCauseModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-2xl font-bold text-gray-800">Créer une nouvelle cause</h3>
                                <button onClick={() => setShowCreateCauseModal(false)} className="text-gray-400 hover:text-gray-600 transition-transform hover:rotate-90">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>

                            <form onSubmit={handleCreateCause} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Titre de la cause</label>
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                                        required
                                    />
                                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        rows="4"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                                        required
                                    ></textarea>
                                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Objectif (FCFA)</label>
                                        <input
                                            type="number"
                                            value={data.goal_amount}
                                            onChange={(e) => setData('goal_amount', e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                            min="1000"
                                            required
                                        />
                                        {errors.goal_amount && <p className="text-red-500 text-xs mt-1">{errors.goal_amount}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Date de fin (optionnel)</label>
                                        <input
                                            type="date"
                                            value={data.end_date}
                                            onChange={(e) => setData('end_date', e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Image de couverture</label>
                                    <input
                                        type="file"
                                        onChange={(e) => setData('image', e.target.files[0])}
                                        accept="image/*"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Formats: JPG, PNG (max 2MB)</p>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                                    >
                                        {processing ? 'Création...' : 'Créer la cause'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowCreateCauseModal(false)}
                                        className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300"
                                    >
                                        Annuler
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slide-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slide-right {
                    from { opacity: 0; transform: translateX(-20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .animate-fade-in { animation: fade-in 0.5s ease-out; }
                .animate-slide-up { animation: slide-up 0.5s ease-out; }
                .animate-slide-right { animation: slide-right 0.5s ease-out; }
            `}</style>
        </>
    );
}
