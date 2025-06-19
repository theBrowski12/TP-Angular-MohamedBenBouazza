// src/app/models/order.model.ts
export enum OrderStatus {
  PENDING = 'En cours',
  SHIPPED = 'Expédiée',
  DELIVERED = 'Livrée',
  CANCELLED = 'Annulée'
}

export interface OrderItem {
  productId: string;
  productTitle: string;
  productImage: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  shippingAddress: {
    street: string;
    city: string;
    zipCode: string;
    country: string;
  };
  trackingNumber?: string;
}