import { BASE_URL } from './config';
import { handleApiError } from './utils';

const getHeaders = () => ({
    'Content-Type': 'application/json'
});

export const getCart = async () => {
    const response = await fetch(`${BASE_URL}/cart`, {
        headers: getHeaders(),
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
        headers: getHeaders(),
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
        headers: getHeaders(),
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
        headers: getHeaders(),
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
        headers: getHeaders(),
        credentials: 'include'
    });
    
    if (!response.ok) {
        await handleApiError(response, 'Ошибка очистки корзины');
    }
    
    return response.json();
};
