import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/notes';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    let userId = localStorage.getItem('userId');
    // Fallback for legacy sessions that only have userName
    if (!userId) {
      userId = localStorage.getItem('userName');
      if (userId) {
        localStorage.setItem('userId', userId);
      }
    }
    
    if (userId) {
      config.headers['x-user-id'] = userId;
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const fetchNotes = async (search = '', tag = '', sort = 'newest') => {
  const response = await api.get('/', {
    params: { search, tag, sort }
  });
  return response.data;
};

export const fetchArchivedNotes = async () => {
  const response = await api.get('/archived');
  return response.data;
};

export const fetchNote = async (id) => {
  const response = await api.get(`/${id}`);
  return response.data;
};

export const createNote = async (noteData) => {
  const response = await api.post('/', noteData);
  return response.data;
};

export const updateNote = async (id, noteData) => {
  const response = await api.put(`/${id}`, noteData);
  return response.data;
};

export const togglePin = async (id) => {
  const response = await api.patch(`/${id}/pin`);
  return response.data;
};

export const archiveNote = async (id) => {
  const response = await api.patch(`/${id}/archive`);
  return response.data;
};

export const restoreNote = async (id) => {
  const response = await api.patch(`/${id}/restore`);
  return response.data;
};

export const deleteNote = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};

export const fetchTrashNotes = async () => {
  const response = await api.get('/trash');
  return response.data;
};

export const recoverNote = async (id) => {
  const response = await api.patch(`/${id}/recover`);
  return response.data;
};

export const permanentDeleteNote = async (id) => {
  const response = await api.delete(`/${id}/permanent`);
  return response.data;
};
