import { useState, useRef } from 'react';
import api from '../api/axios';
import { X, Upload, FileText, Image as ImageIcon, Loader } from 'lucide-react';

const UploadModal = ({ isOpen, onClose, onUploadSuccess }) => {
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const inputRef = useRef(null);

    if (!isOpen) return null;

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        setUploading(true);
        setError('');

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await api.post('/documents/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            onUploadSuccess(res.data);
            onClose();
            setFile(null);
        } catch (err) {
            setError('Échec du téléversement. Veuillez réessayer.');
            console.error(err);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm animate-fade-in" onClick={onClose}>
            <div className="flex items-center justify-center min-h-screen p-4">
                <div
                    className="bg-white rounded-2xl shadow-2xl max-w-lg w-full animate-slide-up"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-100">
                        <h3 className="text-xl font-bold text-gray-900">Téléverser un document</h3>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="p-6">
                        <div
                            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${dragActive
                                ? 'border-primary-500 bg-primary-50'
                                : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
                                }`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                        >
                            {!file ? (
                                <>
                                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <div className="mb-4">
                                        <label
                                            htmlFor="file-upload"
                                            className="cursor-pointer text-primary-600 hover:text-primary-700 font-medium"
                                        >
                                            Cliquez pour choisir
                                            <input
                                                id="file-upload"
                                                type="file"
                                                className="sr-only"
                                                ref={inputRef}
                                                onChange={handleChange}
                                                accept=".pdf,image/*,.txt"
                                            />
                                        </label>
                                        <span className="text-gray-600"> ou glissez-déposez</span>
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        PDF, PNG, JPG, TXT jusqu'à 10 Mo
                                    </p>
                                </>
                            ) : (
                                <div className="flex flex-col items-center">
                                    {file.type.includes('image') ? (
                                        <ImageIcon className="w-12 h-12 text-primary-500 mb-3" />
                                    ) : (
                                        <FileText className="w-12 h-12 text-primary-500 mb-3" />
                                    )}
                                    <p className="font-medium text-gray-900 mb-2">{file.name}</p>
                                    <p className="text-sm text-gray-500 mb-4">
                                        {(file.size / 1024 / 1024).toFixed(2)} Mo
                                    </p>
                                    <button
                                        onClick={() => setFile(null)}
                                        className="text-sm text-red-600 hover:text-red-700 font-medium"
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            )}
                        </div>

                        {error && (
                            <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="flex gap-3 p-6 border-t border-gray-100">
                        <button
                            onClick={onClose}
                            className="btn-secondary flex-1"
                        >
                            Annuler
                        </button>
                        <button
                            onClick={handleUpload}
                            disabled={uploading || !file}
                            className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {uploading ? (
                                <>
                                    <Loader className="w-5 h-5 animate-spin" />
                                    Téléversement...
                                </>
                            ) : (
                                <>
                                    <Upload className="w-5 h-5" />
                                    Téléverser
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadModal;
