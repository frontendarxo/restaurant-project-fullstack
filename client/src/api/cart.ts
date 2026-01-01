import { BASE_URL } from './config';
import { handleApiError } from './utils';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
    };
};

export const getCart = async () => {
    const response = await fetch(`${BASE_URL}/cart`, {
        headers: getAuthHeaders(),
        credentials: 'include'
    });
    
    if (!response.ok) {
        await handleApiError(response, 'Ошибка загрузки корзины');
    }
    
    return response.json();
};

export const addToCart = async (foodId: string, quantity: number) => {
    const response = await fetch(`${BASE_URL}/cart`, {
        method: 'POST',
        headers: getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify({ foodId, quantity })
    });
    
    if (!response.ok) {
        await handleApiError(response, 'Ошибка добавления в корзину');
    }
    
    return response.json();
};

export const updateCartItem = async (foodId: string, quantity: number) => {
    const response = await fetch(`${BASE_URL}/cart`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify({ foodId, quantity })
    });
    
    if (!response.ok) {
        await handleApiError(response, 'Ошибка обновления корзины');
    }
    
    return response.json();
};

export const removeFromCart = async (foodId: string) => {
    const response = await fetch(`${BASE_URL}/cart`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify({ foodId })
    });
    
    if (!response.ok) {
        await handleApiError(response, 'Ошибка удаления из корзины');
    }
    
    return response.json();
};

export const clearCart = async () => {
    const response = await fetch(`${BASE_URL}/cart/clear`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
        credentials: 'include'
    });
    
    if (!response.ok) {
        await handleApiError(response, 'Ошибка очистки корзины');
    }
    
    return response.json();
};
