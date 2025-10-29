import Booking from '../models/Booking.js';
import Experience from '../models/Experience.js';

// create a new booking and update availability
const createBooking = async (req, res) => {
  try {
    const { experienceId, date, time, quantity } = req.body;
    
    // Update experience time availability
    const experience = await Experience.findById(experienceId);
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }
    
    const timeSlot = experience.times.find(t => t.time === time);
    if (!timeSlot || timeSlot.available < quantity) {
      return res.status(400).json({ message: 'Not enough availability for this time slot' });
    }
    
    // Decrease availability
    timeSlot.available -= quantity;
    await experience.save();
    
    const booking = new Booking(req.body);
    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// get a booking by its id
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('experienceId');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get all bookings from database
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('experienceId');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export {
  createBooking,
  getBookingById,
  getAllBookings
};