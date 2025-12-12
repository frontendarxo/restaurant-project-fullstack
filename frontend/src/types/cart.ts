export interface CartItem {
    foodId: string;
    quantity: number;
    price: number;
}

export interface Cart {
    
    items: CartItem[];
}