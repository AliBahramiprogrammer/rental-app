import axios from 'axios';
import { LoginFormData } from './pages/LoginPage';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const register = async (formData: FormData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/auth/register`, formData);
        if (!response.data) {
            throw new Error("No data returned from server");
        }
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message || error.message);
    }
}

export const login = async (formData: LoginFormData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/auth/login`, JSON.stringify(formData), {
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.data) {
            throw new Error("No data returned from server");
        }
        
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message || error.message);
    }
}