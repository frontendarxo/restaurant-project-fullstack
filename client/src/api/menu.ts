import { BASE_URL } from './config';
import { handleApiError } from './utils';

export const getAllMenu = async () => {
    const response = await fetch(`${BASE_URL}/foods`);
    
    if (!response.ok) {
        await handleApiError(response, 'Ошибка загрузки меню');
    }
    
    return response.json();
};

export const getCategory = async (category: string) => {
    const response = await fetch(`${BASE_URL}/foods/${category}`);
    
    if (!response.ok) {
        await handleApiError(response, 'Ошибка загрузки категории');
    }
    
    return response.json();
};
