// src/services/authApi.js
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const BASE_URL = 'http://localhost:8080/genspark/api/v1/auth';

// Create an Axios instance that sends cookies with every request
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

const authApi = {
    sendOtp: async (data) => {
        const response = await axiosInstance.post(`/send-otp`, data);
        return response.data;
    },
    validateOtp: async (data) => {
        const response = await axiosInstance.post(`/validate-otp`, data);
        return response.data;
    },
    registerUser: async (data) => {
        const response = await axiosInstance.post(`/register`, data);
        return response.data;
    },
    login: async (data) => {
        const response = await axiosInstance.post(`/login`, data);
        return response.data;
    },
    // New logout endpoint
    logout: async () => {
        const response = await axiosInstance.post(`/logout`);
        return response.data;
    },
    forgotPassword: async (data) => {
        const response = await axiosInstance.post(`/forgot-password`, data);
        return response.data;
    },
    resetPassword: async (data) => {
        const response = await axiosInstance.post(`/reset-password`, data);
        return response.data;
    },
    verifyEmail: async (data) => {
        const response = await axiosInstance.post(`/verify-email`, data);
        return response.data;
    }
};


const authService = {
    login: async (email, password) => {
        try {
            
            const response = await authApi.login({ email, password });
            const expirationTime=Date.now()+(5*60*1000);
            // console.log(response.username);
            // console.log(response.token);
            // console.log(response.role);
            
            
            
            const user = {
                token: response.token,
                role:response.role,
                email: response.username,
                expirationTime:expirationTime
            };

            localStorage.setItem('currentUser', JSON.stringify(user));
            setTimeout(() => {
                authService.logout();
                window.location.href = '/login';
            }, 5 * 60 * 1000); 
            return user;
        } catch (error) {
            console.error("Login failed: - authService.js", error);
            return null;
        }
    },

    logout: async () => {
        try {
            await authApi.logout(); 
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            localStorage.removeItem('currentUser');
            localStorage.removeItem('authToken'); 
        }
    },

    getCurrentUser: () => {
        const user = localStorage.getItem('currentUser');
        try {
            return user ? JSON.parse(user) : null;
        } catch (error) {
            localStorage.removeItem('currentUser');
            return null;
        }
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('currentUser');
    },

    getUserRole: () => {
        const user = authService.getCurrentUser();
        return user?.role || null;
    },

    isAuthorized: (allowedRoles) => {
        const user = authService.getCurrentUser();
        if (!user) return false;
        return allowedRoles.includes(user.role);
    }
};

export default authService;