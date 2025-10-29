"use client";

import React, { FC, useState, useMemo, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import LoadingSpinner from "../../components/LoadingSpinner";
import { experienceAPI } from "../api/api";
import { Experience } from "../../components/types";
import { encryptData } from "../../utils/encryption";

// component that shows the booking summary with price and quantity
const BookingSummary: FC<{ 
  experience: Experience | null;
  selectedDate: string;
  selectedTime: string | null;
}> = ({ experience, selectedDate, selectedTime }) => {
  const [quantity, setQuantity] = useState(1);
  
  const price = experience?.basePrice || experience?.price || 0;
  const taxRate = experience?.taxRate || 0.05;

  // calculate totals using memo for performance
  const calculations = useMemo(() => {
    const subtotal = quantity * price;
    const taxes = subtotal * taxRate;
    const total = subtotal + taxes;
    return { subtotal, taxes, total };
  }, [quantity, price, taxRate]);

  if (!experience) return null;

  const isBookingReady = selectedDate && selectedTime;

  const { subtotal, taxes, total } = calculations;

  return (
    <div className="p-6 bg-gray-200 rounded-xl shadow-xl sticky top-24 lg:top-28 w-full">
      <div className="space-y-4">
        {/* Starts At Price */}
        <div className="flex justify-between items-center text-lg font-semibold border-b pb-3">
          <span className="text-gray-700">Starts at</span>
          <span className="text-gray-900">₹{price.toFixed(2)}</span>
        </div>

        {/* Quantity Selector */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Quantity</span>
          <div className="flex items-center space-x-2">
            <button
              className="p-1 bg-gray-100 rounded-full hover:bg-gray-200 disabled:opacity-50 transition w-8 h-8 flex items-center justify-center"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
            >
              <span className="text-gray-700 font-bold text-lg">-</span>
            </button>
            <span className="font-semibold text-gray-900 w-6 text-center">
              {quantity}
            </span>
            <button
              className="p-1 bg-gray-100 rounded-full hover:bg-gray-200 transition w-8 h-8 flex items-center justify-center"
              onClick={() => setQuantity((q) => q + 1)}
            >
              <span className="text-gray-700 font-bold text-lg">+</span>
            </button>
          </div>
        </div>

        {/* Subtotal */}
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-900">₹{subtotal.toFixed(2)}</span>
        </div>

        {/* Taxes */}
        <div className="flex justify-between">
          <span className="text-gray-600">Taxes</span>
          <span className="text-gray-900">₹{taxes.toFixed(2)}</span>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center pt-4 mt-4 border-t-2 border-gray-100">
        <span className="text-xl font-bold text-gray-900">Total</span>
        <span className="text-xl font-bold text-gray-900">
          ₹{total.toFixed(2)}
        </span>
      </div>

      {/* Confirm Button */}
      {isBookingReady ? (
        <Link
          href={`/${experience.title.toLowerCase().replace(/\s+/g, '-')}/checkout?data=${encryptData({ quantity, subtotal, taxes, total, date: selectedDate, time: selectedTime })}`}
          className="w-full mt-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg transition duration-150 ease-in-out shadow-lg text-center block"
        >
          Confirm
        </Link>
      ) : (
        <div className="w-full mt-6 py-3 bg-gray-300 text-gray-500 font-semibold rounded-lg text-center cursor-not-allowed">
          Please select date and time
        </div>
      )}
    </div>
  );
};

// component that shows the booking details and date/time selection
const BookingDetails: FC<{ 
  experience: Experience | null;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  selectedTime: string | null;
  setSelectedTime: (time: string | null) => void;
}> = ({ experience, selectedDate, setSelectedDate, selectedTime, setSelectedTime }) => {

  if (!experience) {
    return (
      <div className="text-center py-8">
        <LoadingSpinner size="md" />
      </div>
    );
  }

  // helper function for button styling
  const getPillClasses = (isActive: boolean, isAvailable: boolean = true) => {
    if (!isAvailable) {
      return "bg-gray-200 text-gray-500 line-through cursor-not-allowed";
    }
    return isActive
      ? "bg-yellow-400 text-black shadow-md font-semibold"
      : "bg-gray-100 text-gray-800 hover:bg-gray-200 hover:shadow-sm";
  };

  return (
    <div className="space-y-8">
      {/* Back Link */}
      <Link
        href="/"
        className="flex items-center text-black hover:text-gray-900 transition mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Experiences
      </Link>

      {/* Image Section */}
      <Image
        src={experience.image_url}
        alt={experience.title}
        width={800}
        height={400}
        unoptimized={true}
        className="w-full h-auto object-cover rounded-xl shadow-lg"
      />

      {/* Details Section */}
      <h1 className="text-4xl font-extrabold text-gray-900 mt-4">
        {experience.title}
      </h1>
      <p className="text-base text-gray-600 max-w-3xl">
        {experience.description}
      </p>

      {/* --- Date Selector --- */}
      <div className="space-y-4 pt-4 border-t border-gray-200">
        <h3 className="text-xl font-bold text-gray-800">Choose date</h3>
        <div className="flex flex-wrap gap-3">
          {experience.dates?.map((date) => (
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              className={`px-5 py-2 rounded-lg text-sm transition duration-150 ${getPillClasses(
                selectedDate === date
              )}`}
            >
              {date}
            </button>
          )) || <p className="text-gray-500">No dates available</p>}
        </div>
      </div>

      {/* --- Time Selector --- */}
      <div className="space-y-4 pt-4 border-t border-gray-200">
        <h3 className="text-xl font-bold text-gray-800">Choose time</h3>
        <div className="flex flex-wrap gap-3">
          {experience.times?.map(({ time, available }) => {
            const isSoldOut = available === 0;
            const isSelected = selectedTime === time && !isSoldOut;
            const label = isSoldOut ? "Sold out" : `${available} left`;

            return (
              <button
                key={time}
                onClick={() => !isSoldOut && setSelectedTime(time)}
                disabled={isSoldOut}
                className={`px-5 py-2 rounded-lg text-sm transition duration-150 relative ${getPillClasses(
                  isSelected,
                  !isSoldOut
                )}`}
              >
                <div className="font-medium">{time}</div>
                <div
                  className={`text-xs ${
                    isSoldOut ? "text-gray-500" : available < 3 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {label}
                </div>
              </button>
            );
          }) || <p className="text-gray-500">No times available</p>}
        </div>
        <p className="text-xs text-gray-500 pt-1">
          All times are in IST (GMT +5:30)
        </p>
      </div>

      {/* --- About Section --- */}
      <div className="space-y-4 pt-4 border-t border-gray-200">
        <h3 className="text-xl font-bold text-gray-800">About</h3>
        <div className="bg-gray-200 p-4 rounded-lg">
          <p className="text-base text-gray-500 max-w-3xl">
            {experience.details || experience.description}
          </p>
        </div>
      </div>
    </div>
  );
};

// main app component for the booking page
const App: FC = () => {
  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // fetch experience data when component loads
  useEffect(() => {
    const fetchExperience = async () => {
      try {
        // Get experience name from URL
        const pathName = window.location.pathname.split('/').pop() || '';
        const experienceName = pathName.replace(/-/g, ' ');
        
        if (experienceName) {
          const experiences = await experienceAPI.searchByName(experienceName);
          if (experiences.length > 0) {
            setExperience(experiences[0]);
          }
        } else {
          // Fallback to first experience
          const experiences = await experienceAPI.getAllExperiences();
          if (experiences.length > 0) {
            setExperience(experiences[0]);
          }
        }
      } catch (error) {
        console.error('Error fetching experience:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchExperience();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner fullScreen />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 antialiased">
      <Navbar searchInput="" setSearchInput={() => {}} onSearch={() => {}} />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row lg:space-x-10">
          {/* Left: Details (Takes 2/3 width on desktop) */}
          <div className="lg:w-2/3 mb-10 lg:mb-0">
            <BookingDetails 
              experience={experience} 
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
            />
          </div>

          {/* Right: Summary/Checkout (Takes 1/3 width on desktop) */}
          <div className="lg:w-1/3">
            <BookingSummary 
              experience={experience}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;