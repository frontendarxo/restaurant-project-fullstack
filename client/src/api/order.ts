import { BASE_URL } from './config';
import { handleApiError } from './utils';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
    };
};

export const getUserOrders = async () => {
    const response = await fetch(`${BASE_URL}/orders`, {
        headers: getAuthHeaders(),
        credentials: 'include'
    });
    
    if (!response.ok) {
        await handleApiError(response, 'Ошибка загрузки заказов');
    }
    
    return response.json();
};

export const getOrderById = async (orderId: string) => {
    const response = await fetch(`${BASE_URL}/orders/${orderId}`, {
        headers: getAuthHeaders(),
        credentials: 'include'
    });
    
    if (!response.ok) {
        await handleApiError(response, 'Ошибка загрузки заказа');
    }
    
    return response.json();
};

export const createOrder = async () => {
    const response = await fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: getAuthHeaders(),
        credentials: 'include'
    });
    
    if (!response.ok) {
        await handleApiError(response, 'Ошибка создания заказа');
    }
    
    return response.json();
};


