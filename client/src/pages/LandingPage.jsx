import { Link } from 'react-router-dom';
import {
    FileText, Sparkles, Zap, Shield, Clock, CheckCircle,
    ArrowRight, Upload, Brain, Target, Star, Users
} from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
                                <FileText className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                                Intelligo
                            </span>
                        </div>
                        <div className="hidden md:flex items-center gap-8">
                            <a href="#fonctionnalites" className="text-gray-600 hover:text-gray-900 transition-colors">Fonctionnalités</a>
                            <a href="#comment" className="text-gray-600 hover:text-gray-900 transition-colors">Comment ça marche</a>
                            <a href="#tarifs" className="text-gray-600 hover:text-gray-900 transition-colors">Tarifs</a>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link to="/login" className="text-gray-600 hover:text-gray-900 font-medium">
                                Connexion
                            </Link>
                            <Link to="/register" className="btn-primary">
                                Commencer gratuitement
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 mb-8 animate-fade-in">
                        <Sparkles className="w-4 h-4 text-primary-500" />
                        <span className="text-sm font-medium text-gray-700">Propulsé par l'Intelligence Artificielle</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 animate-slide-up">
                        Comprenez instantanément
                        <br />
                        <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                            n'importe quel document
                        </span>
                    </h1>

                    <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                        Téléversez un email, un PDF ou une lettre administrative — notre IA vous l'explique simplement,
                        point par point, en quelques secondes.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        <Link to="/register" className="btn-primary text-lg px-8 py-4 flex items-center justify-center gap-2">
                            Essayer gratuitement
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <a href="#comment" className="btn-secondary text-lg px-8 py-4">
                            Voir la démo
                        </a>
                    </div>

                    <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span>Gratuit pour commencer</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span>Aucune carte requise</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span>Résultats instantanés</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Fonctionnalités */}
            <section id="fonctionnalites" className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Pourquoi choisir Intelligo ?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Une solution complète pour comprendre et gérer tous vos documents importants
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="card text-center hover:border-primary-200 transition-all">
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Brain className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Analyse IA Avancée</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Notre IA comprend le contexte, identifie les points clés et vous explique tout en langage simple
                            </p>
                        </div>

                        <div className="card text-center hover:border-primary-200 transition-all">
                            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Zap className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Résultats Instantanés</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Obtenez une analyse complète en quelques secondes, pas besoin d'attendre des heures
                            </p>
                        </div>

                        <div className="card text-center hover:border-primary-200 transition-all">
                            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Shield className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">100% Sécurisé</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Vos documents sont chiffrés et protégés. Nous ne partageons jamais vos données
                            </p>
                        </div>

                        <div className="card text-center hover:border-primary-200 transition-all">
                            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Target className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Actions Recommandées</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Recevez des recommandations claires sur les actions à entreprendre et les délais à respecter
                            </p>
                        </div>

                        <div className="card text-center hover:border-primary-200 transition-all">
                            <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Upload className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Multi-formats</h3>
                            <p className="text-gray-600 leading-relaxed">
                                PDF, images, texte... Téléversez n'importe quel format, on s'occupe du reste
                            </p>
                        </div>

                        <div className="card text-center hover:border-primary-200 transition-all">
                            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Clock className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Historique Complet</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Retrouvez tous vos documents analysés dans votre tableau de bord personnel
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Comment ça marche */}
            <section id="comment" className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Comment ça marche ?
                        </h2>
                        <p className="text-xl text-gray-600">
                            Trois étapes simples pour comprendre vos documents
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                                1
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Téléversez</h3>
                            <p className="text-gray-600">
                                Glissez-déposez votre document PDF, image ou texte dans l'interface
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-accent-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                                2
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Analysez</h3>
                            <p className="text-gray-600">
                                Notre IA extrait le texte et analyse le contenu en quelques secondes
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                                3
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Comprenez</h3>
                            <p className="text-gray-600">
                                Recevez un résumé clair, les points clés et les actions recommandées
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Témoignages */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Ils nous font confiance
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="card">
                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <p className="text-gray-700 mb-4">
                                "Intelligo m'a fait gagner un temps fou ! Je comprends enfin mes documents administratifs sans stress."
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                                    M
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">Marie Dubois</p>
                                    <p className="text-sm text-gray-500">Entrepreneure</p>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <p className="text-gray-700 mb-4">
                                "L'IA est incroyablement précise. Elle identifie tous les points importants et les délais à respecter."
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                                    T
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">Thomas Martin</p>
                                    <p className="text-sm text-gray-500">Consultant</p>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <p className="text-gray-700 mb-4">
                                "Interface simple et élégante. Mes clients adorent la clarté des analyses que je leur fournis."
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
                                    S
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">Sophie Laurent</p>
                                    <p className="text-sm text-gray-500">Avocate</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section id="tarifs" className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Tarifs simples et transparents
                        </h2>
                        <p className="text-xl text-gray-600">
                            Commencez gratuitement, évoluez quand vous voulez
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div className="card">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Gratuit</h3>
                            <p className="text-gray-600 mb-6">Pour découvrir</p>
                            <div className="mb-6">
                                <span className="text-4xl font-bold text-gray-900">0€</span>
                                <span className="text-gray-600">/mois</span>
                            </div>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span className="text-gray-700">5 documents par mois</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span className="text-gray-700">Analyse IA basique</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span className="text-gray-700">Historique 30 jours</span>
                                </li>
                            </ul>
                            <Link to="/register" className="btn-secondary w-full">
                                Commencer
                            </Link>
                        </div>

                        <div className="card border-2 border-primary-500 relative">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                                Populaire
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro</h3>
                            <p className="text-gray-600 mb-6">Pour les professionnels</p>
                            <div className="mb-6">
                                <span className="text-4xl font-bold text-gray-900">19€</span>
                                <span className="text-gray-600">/mois</span>
                            </div>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span className="text-gray-700">Documents illimités</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span className="text-gray-700">Analyse IA avancée</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span className="text-gray-700">Historique illimité</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span className="text-gray-700">Support prioritaire</span>
                                </li>
                            </ul>
                            <Link to="/register" className="btn-primary w-full">
                                Commencer l'essai
                            </Link>
                        </div>

                        <div className="card">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Entreprise</h3>
                            <p className="text-gray-600 mb-6">Pour les équipes</p>
                            <div className="mb-6">
                                <span className="text-4xl font-bold text-gray-900">Sur mesure</span>
                            </div>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span className="text-gray-700">Tout du plan Pro</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span className="text-gray-700">Utilisateurs multiples</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span className="text-gray-700">API personnalisée</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span className="text-gray-700">Support dédié</span>
                                </li>
                            </ul>
                            <button className="btn-secondary w-full">
                                Nous contacter
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">
                        Prêt à comprendre vos documents ?
                    </h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Rejoignez des milliers d'utilisateurs qui gagnent du temps chaque jour
                    </p>
                    <Link to="/register" className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2">
                        Commencer gratuitement
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300 py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                                    <FileText className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-white font-bold text-lg">Intelligo</span>
                            </div>
                            <p className="text-sm text-gray-400">
                                Comprenez vos documents instantanément grâce à l'IA
                            </p>
                        </div>

                        <div>
                            <h4 className="text-white font-semibold mb-4">Produit</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#fonctionnalites" className="hover:text-white transition-colors">Fonctionnalités</a></li>
                                <li><a href="#tarifs" className="hover:text-white transition-colors">Tarifs</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Démo</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-semibold mb-4">Entreprise</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">À propos</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Carrières</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-semibold mb-4">Légal</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">Confidentialité</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Conditions</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
                        <p>© 2025 Intelligo. Tous droits réservés.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
