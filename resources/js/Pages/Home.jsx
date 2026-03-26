import React from 'react';
import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Home({ canLogin, canRegister }) {
    return (
        <GuestLayout>
            <Head title="Plateforme de Dons Caritatifs" />

            {/* Hero Section avec image de fond */}
            <div className="relative min-h-[80vh] flex items-center overflow-hidden">
                {/* Image de fond */}
                <div className="absolute inset-0">
                    <img
                        src="/images/hero-bg.jpg"
                        alt="Hero background"
                        className="w-full h-full object-cover"
                    />
                    {/* Overlay vert avec opacité pour mieux lire le texte */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 to-green-700/80"></div>
                </div>

                {/* Pattern décoratif */}
                <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                <circle cx="20" cy="20" r="2" fill="white" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#dots)" />
                    </svg>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center text-white z-10">
                    <div className="max-w-3xl mx-auto">
                        {/* Logo dans le hero */}
                        <div className="inline-flex items-center justify-center mb-8">
                            <img
                                src="/images/logo.png"
                                alt="Fund Logo"
                                className="h-20 w-auto"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
                            Donnez avec le cœur
                        </h1>
                        <p className="text-xl md:text-2xl mb-10 opacity-95">
                            Faites un don en un clin d'œil avec notre plateforme sécurisée
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href={route('causes.index')}
                                className="px-8 py-4 bg-white text-green-600 rounded-full font-semibold hover:shadow-xl transition transform hover:scale-105 text-lg"
                            >
                                Commencer un don
                            </Link>
                            {!canLogin && (
                                <Link
                                    href={route('register')}
                                    className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-green-600 transition text-lg"
                                >
                                    Créer un compte
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section avec image de fond */}
            <div className="relative py-20 overflow-hidden">
                {/* Image de fond pour features */}
                <div className="absolute inset-0">
                    <img
                        src="/images/features-bg.jpg"
                        alt="Features background"
                        className="w-full h-full object-cover"
                    />
                    {/* Overlay blanc pour rendre le texte lisible */}
                    <div className="absolute inset-0 bg-white/90"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Pourquoi nous choisir ?
                        </h2>
                        <p className="text-xl text-gray-600">
                            Une plateforme transparente et sécurisée pour vos dons
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition transform hover:-translate-y-2 border border-gray-100">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Transparence totale</h3>
                            <p className="text-gray-600 leading-relaxed">Suivez l'évolution de chaque cause en temps réel</p>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition transform hover:-translate-y-2 border border-gray-100">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Paiements sécurisés</h3>
                            <p className="text-gray-600 leading-relaxed">Orange Money et MTN Mobile Money</p>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition transform hover:-translate-y-2 border border-gray-100">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Communauté engagée</h3>
                            <p className="text-gray-600 leading-relaxed">Rejoignez des milliers de donateurs</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Urgent Fundraising Section */}
            <div className="py-16 md:py-20 bg-green-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
                            ⚡ Collecte de fonds urgente !
                        </h2>
                        <p className="text-xl text-green-600">
                            Le temps presse ! Rejoignez notre mission MAINTENANT pour un impact immédiat.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { name: '🇨🇲 Cameroun', amount: '1,250,000', target: '5,000,000', percentage: 25 },
                            { name: '🇸🇳 Sénégal', amount: '800,000', target: '3,000,000', percentage: 27 },
                            { name: '🇨🇮 Côte d\'Ivoire', amount: '2,500,000', target: '10,000,000', percentage: 25 },
                            { name: '🇧🇫 Burkina Faso', amount: '0', target: '8,000,000', percentage: 0 }
                        ].map((cause, index) => (
                            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition transform hover:scale-105 border border-green-100">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{cause.name}</h3>
                                <p className="text-2xl font-bold text-green-600 mb-1">{cause.amount} FCFA</p>
                                <p className="text-sm text-gray-500 mb-4">Objectif: {cause.target} FCFA</p>
                                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                                    <div
                                        className="bg-green-500 rounded-full h-2 transition-all"
                                        style={{ width: `${cause.percentage}%` }}
                                    ></div>
                                </div>
                                <Link
                                    href={route('causes.index')}
                                    className="block text-center bg-green-600 text-white py-2 rounded-full font-semibold hover:bg-green-700 transition"
                                >
                                    Donner maintenant →
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="py-16 md:py-20 bg-green-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        <div>
                            <div className="text-5xl font-bold text-white mb-2">217K+</div>
                            <div className="text-green-100">Donateurs actifs</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold text-white mb-2">50+</div>
                            <div className="text-green-100">Causes soutenues</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold text-white mb-2">2.5B+</div>
                            <div className="text-green-100">FCFA collectés</div>
                        </div>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Rejoignez notre communauté de donateurs
                    </h2>
                    <p className="text-xl mb-8 text-green-100">
                        Ensemble, nous faisons la différence au Cameroun et dans toute l'Afrique
                    </p>
                    <Link
                        href={route('register')}
                        className="inline-block px-8 py-3 bg-white text-green-600 rounded-full font-semibold hover:shadow-xl transition transform hover:scale-105"
                    >
                        Créer mon compte gratuitement →
                    </Link>
                </div>
            </div>

            {/* How It Works */}
            <div className="py-16 md:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
                        Comment ça marche ?
                    </h2>
                    <p className="text-center text-gray-600 mb-12">
                        Faire un don n'a jamais été aussi simple
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-green-600">1</span>
                            </div>
                            <h4 className="font-bold text-gray-800 mb-2">Inscrivez-vous</h4>
                            <p className="text-gray-500 text-sm">Créez votre compte gratuitement</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-green-600">2</span>
                            </div>
                            <h4 className="font-bold text-gray-800 mb-2">Choisissez une cause</h4>
                            <p className="text-gray-500 text-sm">Parcourez les causes qui vous tiennent à cœur</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-green-600">3</span>
                            </div>
                            <h4 className="font-bold text-gray-800 mb-2">Faites un don</h4>
                            <p className="text-gray-500 text-sm">Via Orange Money ou MTN Mobile Money</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-green-600">4</span>
                            </div>
                            <h4 className="font-bold text-gray-800 mb-2">Suivez l'impact</h4>
                            <p className="text-gray-500 text-sm">Recevez des updates et voyez l'évolution</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="py-16 md:py-20 bg-green-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
                        Questions fréquentes
                    </h2>
                    <p className="text-center text-gray-600 mb-12">
                        Tout ce que vous devez savoir avant de faire un don
                    </p>

                    <div className="space-y-4">
                        {[
                            { q: "💰 Comment puis-je faire un don ?", a: "Connectez-vous, choisissez une cause, sélectionnez Orange Money ou MTN Mobile Money, et suivez les instructions. C'est simple et rapide !" },
                            { q: "🔒 Mes dons sont-ils sécurisés ?", a: "Oui, tous les paiements sont sécurisés avec un cryptage SSL. Vos données bancaires ne sont jamais stockées sur notre plateforme." },
                            { q: "💝 Puis-je faire un don en l'honneur de quelqu'un ?", a: "Absolument ! Vous pouvez laisser un message dédié lors de votre don qui apparaîtra sur le mur des donateurs." },
                            { q: "📊 Comment mes dons sont-ils utilisés ?", a: "100% des dons vont directement aux causes que vous soutenez. Nous affichons la progression en temps réel pour une transparence totale." },
                            { q: "🔄 Puis-je programmer des dons récurrents ?", a: "Oui, vous pouvez vous engager à donner mensuellement. Un rappel vous sera envoyé avant chaque prélèvement simulé." }
                        ].map((faq, index) => (
                            <details key={index} className="group bg-white rounded-xl p-4 hover:shadow-md transition border border-green-100">
                                <summary className="font-semibold text-lg cursor-pointer py-2 hover:text-green-600 transition flex items-center">
                                    <span className="mr-3 text-2xl">{faq.q.charAt(0)}</span>
                                    {faq.q}
                                </summary>
                                <p className="text-gray-600 mt-3 pl-8 leading-relaxed">{faq.a}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <img
                                    src="/images/logo.png"
                                    alt="Fund Logo"
                                    className="h-8 w-auto"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                />
                                <h3 className="text-xl font-bold">Fund</h3>
                            </div>
                            <p className="text-gray-400">Notre mission est d'aider les gens à réaliser leurs rêves et à soutenir les causes qui leur tiennent à cœur.</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-4">Liens rapides</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><Link href={route('causes.index')} className="hover:text-green-400 transition">Causes</Link></li>
                                <li><Link href="/about" className="hover:text-green-400 transition">À propos</Link></li>
                                <li><Link href="/contact" className="hover:text-green-400 transition">Contact</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-4">Légal</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><Link href="/terms" className="hover:text-green-400 transition">Conditions d'utilisation</Link></li>
                                <li><Link href="/privacy" className="hover:text-green-400 transition">Politique de confidentialité</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-4">Contact</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li>📧 contact@fund.com</li>
                                <li>📞 +237 690 123 456</li>
                                <li>📍 Yaoundé, Cameroun</li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; {new Date().getFullYear()} Fund - Plateforme de Dons Caritatifs. Tous droits réservés.</p>
                    </div>
                </div>
            </footer>

            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.8s ease-out;
                }
            `}</style>
        </GuestLayout>
    );
}
