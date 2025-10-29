import axios from 'axios';
import { Experience, BookingData, Booking } from '../../components/types';

const API_BASE_URL = 'http://localhost:5500/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// api functions for handling experiences
export const experienceAPI = {
  // get all experiences from the server
  getAllExperiences: async (): Promise<Experience[]> => {
    const response = await api.get('/experiences');
    return response.data;
  },

  // get single experience by its id
  getExperienceById: async (id: string): Promise<Experience> => {
    const response = await api.get(`/experiences/${id}`);
    return response.data;
  },

  // search experiences with a query
  searchExperiences: async (query: string): Promise<Experience[]> => {
    const response = await api.get(`/experiences/search?q=${query}`);
    return response.data;
  },

  // search experience by name (same as search but for names)
  searchByName: async (name: string): Promise<Experience[]> => {
    const response = await api.get(`/experiences/search?q=${name}`);
    return response.data;
  },

  // create a new experience in the database
  createExperience: async (experience: Omit<Experience, '_id'>): Promise<Experience> => {
    const response = await api.post('/experiences', experience);
    return response.data;
  },

  // upload multiple experiences at once
  bulkUploadExperiences: async (experiences: Experience[]): Promise<{ message: string; count: number; data: Experience[] }> => {
    const response = await api.post('/experiences/bulk', experiences);
    return response.data;
  },
};

// api functions for handling bookings
export const bookingAPI = {
  // create a new booking
  createBooking: async (bookingData: BookingData): Promise<Booking> => {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  },

  // get booking details by id
  getBookingById: async (id: string): Promise<Booking> => {
    const response = await api.get(`/bookings/${id}`);
    return response.data;
  },

  // get all bookings from the server
  getAllBookings: async (): Promise<Booking[]> => {
    const response = await api.get('/bookings');
    return response.data;
  },
};