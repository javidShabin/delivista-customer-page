// ---------- Order Types ----------
export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

export interface Order {
  _id: string;
  orderStatus: string;
  updatedAt: string;
  items: OrderItem[];
  totalAmount: number;
  deliveryFee?: number;
  tax?: number;
  isReviewed: boolean;
  sellerId: string;
  paymentMethod?: string;
}
