import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import {
    ArrowLeft, Send, FileText, AlertTriangle,
    CheckCircle, Target, Brain, Theater, Sparkles, Loader
} from 'lucide-react';

const DocumentView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [document, setDocument] = useState(null);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [actionInput, setActionInput] = useState('');
    const [actionResult, setActionResult] = useState('');
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        const fetchDocument = async () => {
            try {
                const res = await api.get(`/documents/${id}`);
                setDocument(res.data);
                // Auto-process if status is uploaded
                if (res.data.status === 'uploaded') {
                    handleProcess(res.data._id); // Pass ID explicitly or use closure
                }
            } catch (err) {
                console.error('Erreur lors du chargement du document', err);
                navigate('/dashboard');
            } finally {
                setLoading(false);
            }
        };
        fetchDocument();
    }, [id, navigate]);

    // Modified handleProcess to accept optional ID
    const handleProcess = async (docId = id) => {
        setProcessing(true);
        try {
            const res = await api.post(`/documents/${docId}/process`);
            setDocument(res.data);
        } catch (err) {
            console.error('Erreur lors du traitement du document', err);
        } finally {
            setProcessing(false);
        }
    };

    const handleAction = async () => {
        if (!actionInput.trim()) return;
        setActionLoading(true);
        try {
            const res = await api.post(`/documents/${id}/action`, {
                instruction: actionInput
            });
            setActionResult(res.data.result);
        } catch (err) {
            console.error('Erreur lors de l\'action', err);
        } finally {
            setActionLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Loader className="w-12 h-12 text-primary-500 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Chargement...</p>
                </div>
            </div>
        );
    }

    if (!document) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
            {/* Header - Responsive */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10 backdrop-blur-sm bg-white/90">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
                    <div className="flex items-center gap-2 sm:gap-4">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                        >
                            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                        </button>
                        <div className="flex-1 min-w-0">
                            <h1 className="text-base sm:text-xl font-bold text-gray-900 truncate">{document.originalName}</h1>
                            <div className="flex items-center gap-2 mt-0.5 sm:mt-1">
                                <span className={`text-xs font-medium px-2 py-0.5 sm:py-1 rounded-full ${document.status === 'analyzed' ? 'bg-green-100 text-green-700' :
                                    document.status === 'processing' ? 'bg-yellow-100 text-yellow-700' :
                                        document.status === 'failed' ? 'bg-red-100 text-red-700' :
                                            'bg-gray-100 text-gray-700'
                                    }`}>
                                    {document.status === 'analyzed' ? 'Analysé' :
                                        document.status === 'processing' ? 'En traitement' :
                                            document.status === 'failed' ? 'Échec' : 'En attente'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <div className="space-y-4 sm:space-y-6">
                    {/* Analyse IA */}
                    {document.analysis && document.analysis.summary ? (
                        <>
                            {/* Résumé */}
                            <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                                        <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                                    </div>
                                    <h3 className="text-sm sm:text-base font-bold text-gray-900">Résumé</h3>
                                </div>
                                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{document.analysis.summary}</p>
                            </div>

                            {/* Points clés */}
                            {document.analysis.keyPoints && document.analysis.keyPoints.length > 0 && (
                                <div className="card">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                                            <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                                        </div>
                                        <h3 className="text-sm sm:text-base font-bold text-gray-900">Points Clés</h3>
                                    </div>
                                    <ul className="space-y-2">
                                        {document.analysis.keyPoints.map((point, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <span className="text-purple-500 mt-1">•</span>
                                                <span className="text-sm sm:text-base text-gray-700">{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Actions requises */}
                            {document.analysis.requiredActions && document.analysis.requiredActions.length > 0 && (
                                <div className="card bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-green-500 rounded-lg flex items-center justify-center">
                                            <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                                        </div>
                                        <h3 className="text-sm sm:text-base font-bold text-gray-900">Actions à Entreprendre</h3>
                                    </div>
                                    <ol className="space-y-2">
                                        {document.analysis.requiredActions.map((action, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <span className="font-semibold text-green-600">{i + 1}.</span>
                                                <span className="text-sm sm:text-base text-gray-700">{action}</span>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            )}

                            {/* Explication simple */}
                            {document.analysis.simpleExplanation && (
                                <div className="card">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                                            <Brain className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                                        </div>
                                        <h3 className="text-sm sm:text-base font-bold text-gray-900">Explication Simple</h3>
                                    </div>
                                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{document.analysis.simpleExplanation}</p>
                                </div>
                            )}

                            {/* Ton & Intention */}
                            {(document.analysis.tone || document.analysis.intent) && (
                                <div className="card">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-pink-500 rounded-lg flex items-center justify-center">
                                            <Theater className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                                        </div>
                                        <h3 className="text-sm sm:text-base font-bold text-gray-900">Ton & Intention</h3>
                                    </div>
                                    <div className="space-y-2">
                                        {document.analysis.tone && (
                                            <p className="text-sm sm:text-base text-gray-700"><span className="font-semibold">Ton :</span> {document.analysis.tone}</p>
                                        )}
                                        {document.analysis.intent && (
                                            <p className="text-sm sm:text-base text-gray-700"><span className="font-semibold">Intention :</span> {document.analysis.intent}</p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Avertissements */}
                            {document.analysis.warnings && document.analysis.warnings.length > 0 && (
                                <div className="card bg-gradient-to-br from-red-50 to-red-100 border-red-200">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-red-500 rounded-lg flex items-center justify-center">
                                            <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                                        </div>
                                        <h3 className="text-sm sm:text-base font-bold text-gray-900">Avertissements</h3>
                                    </div>
                                    <ul className="space-y-2">
                                        {document.analysis.warnings.map((warning, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                                                <span className="text-sm sm:text-base text-gray-700">{warning}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Action IA */}
                            <div className="card">
                                <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-4">Demander à l'IA</h3>
                                <div className="space-y-4">
                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <input
                                            type="text"
                                            className="input-field flex-1 text-sm sm:text-base"
                                            placeholder="Ex: Reformule ce texte..."
                                            value={actionInput}
                                            onChange={(e) => setActionInput(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleAction()}
                                        />
                                        <button
                                            onClick={handleAction}
                                            disabled={actionLoading || !actionInput}
                                            className="btn-primary px-4 py-2 disabled:opacity-50 flex items-center justify-center gap-2"
                                        >
                                            {actionLoading ? <Loader className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                                            <span className="hidden sm:inline">Envoyer</span>
                                        </button>
                                    </div>

                                    {actionResult && (
                                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                            <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">Résultat :</h4>
                                            <p className="text-sm sm:text-base text-gray-700 whitespace-pre-wrap">{actionResult}</p>
                                            <button
                                                onClick={() => navigator.clipboard.writeText(actionResult)}
                                                className="mt-3 text-xs sm:text-sm text-primary-600 hover:text-primary-700 font-medium"
                                            >
                                                Copier dans le presse-papiers
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="card text-center py-12">
                            <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-sm sm:text-base text-gray-600 mb-4">
                                {document.status === 'processing'
                                    ? 'L\'IA analyse votre document...'
                                    : 'Lancez l\'analyse pour voir les résultats.'}
                            </p>
                            {document.status === 'uploaded' && (
                                <button
                                    onClick={handleProcess}
                                    disabled={processing}
                                    className="btn-primary inline-flex items-center gap-2"
                                >
                                    {processing ? (
                                        <>
                                            <Loader className="w-5 h-5 animate-spin" />
                                            Analyse en cours...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="w-5 h-5" />
                                            Analyser avec l'IA
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default DocumentView;
