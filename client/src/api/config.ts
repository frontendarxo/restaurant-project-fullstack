const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';

if (!import.meta.env.VITE_BASE_URL) {
  console.warn('⚠️ VITE_BASE_URL не настроен. Используется значение по умолчанию: http://localhost:3000');
  console.warn('📝 Создайте файл client/.env с содержимым: VITE_BASE_URL=http://localhost:3000');
}

export { BASE_URL };

