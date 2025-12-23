import api from './axios';

// Récupérer tous les documents de l'utilisateur
export const getDocuments = async () => {
    const response = await api.get('/documents');
    return response.data;
};

// Récupérer un document par ID
export const getDocument = async (id) => {
    const response = await api.get(`/documents/${id}`);
    return response.data;
};

// Uploader un fichier
export const uploadDocument = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/documents/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};

// Traiter un document (extraction + analyse)
export const processDocument = async (id) => {
    const response = await api.post(`/documents/${id}/process`);
    return response.data;
};

// Analyser du texte copié-collé directement
export const analyzeText = async (text, title = 'Texte collé') => {
    const response = await api.post('/documents/analyze-text', { text, title });
    return response.data;
};

// Supprimer un document
export const deleteDocument = async (id) => {
    const response = await api.delete(`/documents/${id}`);
    return response.data;
};

// Effectuer une action sur un document (reformulation, etc.)
export const performAction = async (id, instruction) => {
    const response = await api.post(`/documents/${id}/action`, { instruction });
    return response.data;
};
