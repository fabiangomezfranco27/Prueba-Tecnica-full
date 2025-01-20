import api from './api';
import { RegisterData, AuthResponse } from '../types/auth';

export const registerUser = async (data: RegisterData): Promise<AuthResponse> => {
    try {
        const response = await api.post<AuthResponse>('/auth/register', data);
        return response.data;
    } catch (error) {
        throw new Error('Error en el registro');
    }
};