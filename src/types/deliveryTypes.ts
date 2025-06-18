export interface DeliveryStatus {
  PENDING : "PENDING",
  ASSIGNED : "ASSIGNED",
  PICKED_UP : "PICKED_UP",
  IN_TRANSIT : "IN_TRANSIT",
  DELIVERED : "DELIVERED",
  CANCELLED : "CANCELLED",
}

export interface PaymentMethod {
  CASH_ON_DELIVERY : "CASH_ON_DELIVERY",
  PAID : "PAID",
}

export interface Location {
  address: string;
  mobileNumber: string;
  coordinates: [number, number];
}

export interface CompleteDelivery {
  orderId: string;
  restaurantId: string;
  userId: string;
  pickUpLocation: Location;
  deliveryLocation: Location;
  totalOrderAmount: number;
  deliveryFee: number;
  paymentMethod: PaymentMethod;
}

export interface Delivery extends CompleteDelivery {
  status: DeliveryStatus;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedDeliveries {
  data: Delivery[];
  total: number;
  page: number;
  limit: number;
}
