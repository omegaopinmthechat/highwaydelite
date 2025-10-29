// type definitions for the app data structures
export interface Experience {
  _id?: string;
  title: string;
  location: string;
  price: number;
  description: string;
  image_url: string;
  details?: string;
  basePrice?: number;
  taxRate?: number;
  dates?: string[];
  times?: { time: string; available: number }[];
}

export interface BookingData {
  experienceId: string;
  experienceTitle: string;
  date: string;
  time: string;
  quantity: number;
  subtotal: number;
  taxes: number;
  total: number;
  customerInfo?: {
    fullName: string;
    email: string;
  };
  status?: 'confirmed' | 'cancelled' | 'completed';
}

export interface Booking extends BookingData {
  _id: string;
  createdAt: string;
  updatedAt: string;
}