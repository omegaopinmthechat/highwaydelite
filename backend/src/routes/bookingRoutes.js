import express from 'express';
import {
  createBooking,
  getBookingById,
  getAllBookings
} from '../controller/bookingController.js';

// routes for handling booking operations
const router = express.Router();

// create a new booking
router.post('/', createBooking);

// get all bookings
router.get('/', getAllBookings);

// get booking by id
router.get('/:id', getBookingById);


export default router;