# Архитектура компонента Cart

## Структура Feature-Sliced Design

```
cart/
├── model/          # Бизнес-логика и состояние
│   ├── useCart.ts          # Хук для получения данных корзины
│   ├── useCartActions.ts   # Хук для действий с корзиной
│   └── index.ts            # Публичный API модели
├── ui/             # UI компоненты
│   ├── CartItem.tsx        # Компонент одного товара
│   ├── CartList.tsx        # Список товаров
│   ├── CartTotal.tsx       # Итоговая сумма
│   └── index.ts            # Публичный API UI
├── lib/            # Вспомогательные функции
│   ├── calculateTotal.ts   # Расчет общей суммы
│   ├── formatPrice.ts      # Форматирование цены
│   └── index.ts            # Публичный API библиотеки
└── index.tsx       # Главный компонент (публичный API)
```

## Правила работы

### 1. **model/** - Бизнес-логика
- Содержит хуки для работы с состоянием
- Использует Redux через типизированные хуки
- НЕ содержит UI логику
- Экспортирует только через `index.ts`

**Пример добавления нового хука:**
```typescript
// model/useCartValidation.ts
export const useCartValidation = () => {
  // логика валидации
};
```

### 2. **ui/** - UI компоненты
- Только представление, без бизнес-логики
- Получает данные через props
- Использует хуки из `model/` для действий
- Использует утилиты из `lib/` для вычислений

**Пример создания нового UI компонента:**
```typescript
// ui/CartButton.tsx
interface CartButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export const CartButton = ({ onClick, disabled }: CartButtonProps) => {
  return <button onClick={onClick} disabled={disabled}>Оформить заказ</button>;
};
```

### 3. **lib/** - Утилиты
- Чистые функции без побочных эффектов
- Легко тестируются
- Не зависят от React или Redux

**Пример добавления утилиты:**
```typescript
// lib/getItemCount.ts
export const getItemCount = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.quantity, 0);
};
```

### 4. **index.tsx** - Публичный API
- Собирает все части вместе
- Единственная точка входа для использования компонента
- Минимальная логика, только композиция

## Как использовать

```typescript
// В любом месте приложения
import { Cart } from '@/features/api/cart';

<Cart />
```

## Как расширять

1. **Добавить новое действие**: создай хук в `model/useCartActions.ts` или новый файл в `model/`
2. **Добавить новый UI**: создай компонент в `ui/` и экспортируй через `ui/index.ts`
3. **Добавить утилиту**: создай функцию в `lib/` и экспортируй через `lib/index.ts`
4. **Использовать в главном компоненте**: импортируй в `index.tsx`

## Принципы

- ✅ Разделение ответственности (model/ui/lib)
- ✅ Публичный API через index.ts
- ✅ Переиспользуемость компонентов
- ✅ Легкое тестирование
- ✅ Понятная структура

