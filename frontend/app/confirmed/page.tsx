"use client";

import React, { FC, useState, useEffect } from "react";
import { Check } from "lucide-react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import LoadingSpinner from "../../components/LoadingSpinner";
import { bookingAPI } from "../api/api";

// component that shows the booking confirmation with details
const ConfirmationView: FC = () => {
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState<{
    _id: string;
    experienceTitle: string;
    date: string;
    time: string;
    quantity: number;
    total: number;
  } | null>(null);

  useEffect(() => {
    const fetchBooking = async () => {
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('bookingId') || '';
        
        // Fetch booking details
        if (id) {
          try {
            const data = await bookingAPI.getBookingById(id);
            setBooking(data);
          } catch (error) {
            console.error('Error fetching booking:', error);
          }
        }
        setLoading(false);
      }
    };
    
    fetchBooking();
  }, []);

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="flex flex-col items-center text-center px-4 sm:px-6 md:px-8">
      <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6">
        <Check className="w-10 h-10 text-white" />
      </div>

      <h2 className="text-4xl font-semibold text-gray-900 mb-2">Booking Confirmed</h2>

      <p className="text-sm text-gray-500 mb-6">Booking ID: <span className="font-medium text-gray-700">{booking?._id || 'N/A'}</span></p>

      {booking && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6 max-w-md w-full text-left">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Experience:</span>
              <span className="font-medium text-gray-900">{booking.experienceTitle}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium text-gray-900">{booking.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Time:</span>
              <span className="font-medium text-gray-900">{booking.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Quantity:</span>
              <span className="font-medium text-gray-900">{booking.quantity}</span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-2 mt-2">
              <span className="text-gray-600">Total:</span>
              <span className="font-semibold text-gray-900">₹{booking.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}

      <Link
        href="/"
        className="inline-block px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-md transition duration-150 ease-in-out border border-gray-200"
      >
        Back to Home
      </Link>
    </div>
  );
};

// main app component for the confirmation page
const App: FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 antialiased">
      <Navbar searchInput="" setSearchInput={() => {}} onSearch={() => {}} />

      {/* Main Content Area - Full page centering for confirmation */}
      <main className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4 sm:p-6 lg:p-8">
        <ConfirmationView />
      </main>
    </div>
  );
};

export default App;
