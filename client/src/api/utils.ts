export const handleApiError = async (response: Response, defaultMessage: string): Promise<never> => {
  let errorMessage = defaultMessage;
  
  try {
    // Читаем response body напрямую, так как после этой функции он не будет использоваться
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      const error = await response.json();
      
      // Приоритет: детальное сообщение с сервера
      if (error?.message) {
        errorMessage = String(error.message);
      } else if (error?.error) {
        errorMessage = String(error.error);
      }
    } else {
      const text = await response.text();
      if (text) {
        errorMessage = text;
      }
    }
  } catch {
    // Если не удалось распарсить ответ, используем статус
    errorMessage = `Ошибка ${response.status}: ${response.statusText}`;
  }
  
  // Всегда бросаем ошибку с детальным сообщением
  // Redux Toolkit извлечет message из Error через action.error.message
  throw new Error(errorMessage);
};

