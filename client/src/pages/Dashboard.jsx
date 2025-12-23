import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getDocuments, deleteDocument } from '../api/documents';
import { Link, useNavigate } from 'react-router-dom';
import UploadModal from '../components/UploadModal';
import Modal from '../components/ui/Modal';
import TextAnalyzer from '../components/ui/TextAnalyzer';
import { FileText, Plus, LogOut, Clock, CheckCircle, AlertCircle, Loader, Trash2, Type, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [isTextAnalyzerOpen, setIsTextAnalyzerOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [documentToDelete, setDocumentToDelete] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [limitModalOpen, setLimitModalOpen] = useState(false);

    // Usage Limit Logic
    const MAX_FREE_USAGE = 2;
    const [usageCount, setUsageCount] = useState(0);

    useEffect(() => {
        const count = parseInt(localStorage.getItem('usageCount') || '0');
        setUsageCount(count);
    }, []);

    const checkLimit = () => {
        if (user) return true; // No limit for logged in users
        if (usageCount >= MAX_FREE_USAGE) {
            setLimitModalOpen(true);
            return false;
        }
        return true;
    };

    const incrementUsage = () => {
        if (!user) {
            const newCount = usageCount + 1;
            setUsageCount(newCount);
            localStorage.setItem('usageCount', newCount.toString());
        }
    };

    const fetchDocuments = async () => {
        try {
            // For guests, we could load from localStorage if we wanted to show history
            // For now, we'll just fetch from server which returns empty for guests (as per plan)
            // or we can implement local history. Let's stick to the plan:
            // "If guest: Return empty list (Client will track its own guest files via localStorage)"
            // But for simplicity in this step, let's just fetch.
            const docs = await getDocuments();
            setDocuments(docs);
        } catch (err) {
            console.error('Erreur lors du chargement des documents', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, [user]); // Refetch when user changes

    const handleUploadClick = () => {
        if (checkLimit()) {
            setIsUploadOpen(true);
        }
    };

    const handleTextAnalyzerClick = () => {
        if (checkLimit()) {
            setIsTextAnalyzerOpen(true);
        }
    };

    const handleUploadSuccess = (newDoc) => {
        incrementUsage();
        if (newDoc && newDoc._id) {
            navigate(`/document/${newDoc._id}`);
        } else {
            fetchDocuments();
        }
    };

    const handleDeleteClick = (e, doc) => {
        e.preventDefault();
        e.stopPropagation();
        setDocumentToDelete(doc);
        setDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!documentToDelete) return;

        setDeleting(true);
        try {
            await deleteDocument(documentToDelete._id);
            setDocuments(documents.filter(doc => doc._id !== documentToDelete._id));
            setDeleteModalOpen(false);
            setDocumentToDelete(null);
        } catch (err) {
            console.error('Erreur lors de la suppression:', err);
            alert('Erreur lors de la suppression du document');
        } finally {
            setDeleting(false);
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'analyzed': return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'processing': return <Loader className="w-5 h-5 text-yellow-500 animate-spin" />;
            case 'failed': return <AlertCircle className="w-5 h-5 text-red-500" />;
            default: return <Clock className="w-5 h-5 text-gray-400" />;
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'analyzed': return 'Analysé';
            case 'processing': return 'En traitement';
            case 'failed': return 'Échec';
            default: return 'En attente';
        }
    };

    return (
        <div className="min-h-screen">
            {/* Header */}
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-10 backdrop-blur-sm bg-white/90">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link to="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
                                <FileText className="w-6 h-6 text-white" />
                            </div>
                            <div className="hidden sm:block">
                                <h1 className="text-xl font-bold text-gray-900">Intelligo</h1>
                                <p className="text-xs text-gray-500">Vos documents</p>
                            </div>
                        </Link>

                        {user ? (
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-gray-600 hidden sm:inline">{user.email}</span>
                                <button
                                    onClick={logout}
                                    className="flex items-center gap-2 px-3 sm:px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span className="hidden sm:inline">Déconnexion</span>
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 sm:gap-4">
                                <div className="text-xs sm:text-sm text-gray-500 font-medium bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
                                    <span className="text-primary-600 font-bold">{usageCount}/{MAX_FREE_USAGE}</span>
                                    <span className="hidden sm:inline ml-1">essais gratuits</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Link to="/login" className="btn-secondary px-3 py-1.5 text-xs sm:text-sm">
                                        Connexion
                                    </Link>
                                    <Link to="/register" className="btn-primary px-3 py-1.5 text-xs sm:text-sm">
                                        Inscription
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                {/* En-tête avec boutons d'action */}
                <div className="mb-6">
                    <div className="mb-4">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Analysez vos documents en un clic</h2>
                        <p className="text-sm sm:text-base text-gray-600 mt-1">
                            Ne perdez plus de temps à lire. Laissez l'IA comprendre, résumer et extraire l'essentiel pour vous.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                        <button
                            onClick={handleTextAnalyzerClick}
                            className="w-full sm:w-auto bg-white text-gray-700 px-4 py-3 sm:py-2 rounded-lg font-medium border border-gray-200 transition-all duration-200 hover:bg-gray-50 hover:border-gray-300 flex items-center justify-center gap-2"
                        >
                            <Type className="w-5 h-5" />
                            <span>Analyser du texte</span>
                        </button>
                        <button
                            onClick={handleUploadClick}
                            className="w-full sm:w-auto btn-primary flex items-center justify-center gap-2 py-3 sm:py-2"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Nouveau document</span>
                        </button>
                    </div>
                </div>

                {/* Liste des documents */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="text-center">
                            <Loader className="w-12 h-12 text-primary-500 animate-spin mx-auto mb-4" />
                            <p className="text-gray-600">Chargement...</p>
                        </div>
                    </div>
                ) : documents.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="card text-center py-12 sm:py-16"
                    >
                        <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Aucun document</h3>
                        <p className="text-sm sm:text-base text-gray-600 mb-6">Commencez par téléverser un document ou analyser du texte</p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <button
                                onClick={handleTextAnalyzerClick}
                                className="btn-secondary inline-flex items-center justify-center gap-2"
                            >
                                <Type className="w-5 h-5" />
                                Analyser du texte
                            </button>
                            <button
                                onClick={handleUploadClick}
                                className="btn-primary inline-flex items-center justify-center gap-2"
                            >
                                <Plus className="w-5 h-5" />
                                Téléverser un document
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <div className="grid gap-3 sm:gap-4">
                        {documents.map((doc, index) => (
                            <motion.div
                                key={doc._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Link
                                    to={`/document/${doc._id}`}
                                    className="card hover:border-primary-200 group block"
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                        {/* Partie principale */}
                                        <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-100 to-accent-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                                <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-sm sm:text-base font-semibold text-gray-900 truncate group-hover:text-primary-600 transition-colors">
                                                    {doc.originalName}
                                                </h3>
                                                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                                                    {new Date(doc.createdAt).toLocaleDateString('fr-FR')}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Statut et actions */}
                                        <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3 flex-shrink-0">
                                            <div className="flex items-center gap-2">
                                                <span className="hidden sm:inline">{getStatusIcon(doc.status)}</span>
                                                <span className={`text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 rounded-full ${doc.status === 'analyzed' ? 'bg-green-100 text-green-700' :
                                                    doc.status === 'processing' ? 'bg-yellow-100 text-yellow-700' :
                                                        doc.status === 'failed' ? 'bg-red-100 text-red-700' :
                                                            'bg-gray-100 text-gray-700'
                                                    }`}>
                                                    {getStatusText(doc.status)}
                                                </span>
                                            </div>
                                            <button
                                                onClick={(e) => handleDeleteClick(e, doc)}
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Supprimer"
                                            >
                                                <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </main>

            {/* Modals */}
            <UploadModal
                isOpen={isUploadOpen}
                onClose={() => setIsUploadOpen(false)}
                onUploadSuccess={handleUploadSuccess}
            />

            <Modal
                isOpen={isTextAnalyzerOpen}
                onClose={() => setIsTextAnalyzerOpen(false)}
                title=""
            >
                <TextAnalyzer />
            </Modal>

            <Modal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                title="Supprimer le document"
                onConfirm={handleDeleteConfirm}
                confirmText={deleting ? "Suppression..." : "Supprimer"}
                cancelText="Annuler"
                variant="danger"
            >
                <p>
                    Êtes-vous sûr de vouloir supprimer <strong>{documentToDelete?.originalName}</strong> ?
                </p>
                <p className="text-sm text-gray-500 mt-2">
                    Cette action est irréversible.
                </p>
            </Modal>

            {/* Limit Modal */}
            <Modal
                isOpen={limitModalOpen}
                onClose={() => setLimitModalOpen(false)}
                title="Limite atteinte"
                onConfirm={() => navigate('/register')}
                confirmText="Créer un compte"
                cancelText="Plus tard"
                variant="primary"
            >
                <div className="text-center py-4">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Lock className="w-8 h-8 text-primary-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Vous avez atteint la limite gratuite</h3>
                    <p className="text-gray-600 mb-4">
                        Vous avez utilisé vos {MAX_FREE_USAGE} essais gratuits.
                        Créez un compte gratuitement pour continuer à analyser vos documents sans limite !
                    </p>
                </div>
            </Modal>
        </div>
    );
};

export default Dashboard;
