import api from './api';
import { RegisterData, AuthResponse, LoginData } from '../types/auth';
import axios from 'axios';

export const authService = {
    register: async (data: RegisterData): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/users/register', data);
        return response.data;
    },

    login: async (data: LoginData): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/users/login', data);
        return response.data;
    },

    checkAuth: async () => {
        try {
            const response = await axios.get('/api/auth/check', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    }
};


