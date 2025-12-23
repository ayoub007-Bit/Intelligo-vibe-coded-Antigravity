import { useState } from 'react';
import { FileText, Sparkles, Loader2 } from 'lucide-react';
import { analyzeText } from '../../api/documents';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const TextAnalyzer = () => {
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleAnalyze = async () => {
        if (!text.trim()) {
            setError('Veuillez entrer du texte à analyser');
            return;
        }

        setIsAnalyzing(true);
        setError('');

        try {
            const result = await analyzeText(text, title || 'Texte collé');
            // Rediriger vers la page d'analyse
            navigate(`/document/${result._id}`);
        } catch (err) {
            console.error('Erreur lors de l\'analyse:', err);
            setError('Erreur lors de l\'analyse du texte. Veuillez réessayer.');
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
        >
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary-100 rounded-xl">
                    <FileText className="text-primary-600" size={24} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Analyser du texte</h2>
                    <p className="text-gray-600">Collez votre texte pour une analyse instantanée</p>
                </div>
            </div>

            {/* Titre optionnel */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Titre (optionnel)
                </label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ex: Email de mon propriétaire"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all outline-none"
                />
            </div>

            {/* Zone de texte */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Texte à analyser
                </label>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Collez votre texte ici (email, lettre, document administratif, etc.)"
                    rows={12}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all outline-none resize-none"
                />
                <div className="flex justify-between items-center mt-2">
                    <p className="text-sm text-gray-500">
                        {text.length} caractères
                    </p>
                    {text.length > 0 && (
                        <button
                            onClick={() => setText('')}
                            className="text-sm text-gray-500 hover:text-gray-700"
                        >
                            Effacer
                        </button>
                    )}
                </div>
            </div>

            {/* Erreur */}
            {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                    {error}
                </div>
            )}

            {/* Bouton d'analyse */}
            <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !text.trim()}
                className="w-full bg-primary-600 text-white px-6 py-4 rounded-lg font-medium transition-all duration-200 hover:bg-primary-700 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {isAnalyzing ? (
                    <>
                        <Loader2 className="animate-spin" size={20} />
                        Analyse en cours...
                    </>
                ) : (
                    <>
                        <Sparkles size={20} />
                        Analyser avec l'IA
                    </>
                )}
            </button>

            {/* Info */}
            <p className="text-sm text-gray-500 text-center mt-4">
                L'analyse prend généralement 5 à 10 secondes
            </p>
        </motion.div>
    );
};

export default TextAnalyzer;
