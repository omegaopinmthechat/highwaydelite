"use client"
import React, { FC, useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useRouter } from "next/navigation";
import { experienceAPI, bookingAPI } from "../../api/api";
import { Experience } from "../../../components/types";
import { decryptData } from "@/utils/encryption";

// helper component for displaying summary rows with currency formatting
const SummaryRow: FC<{
  label: string;
  value: string | number;
  isTotal?: boolean;
  isCurrency?: boolean;
}> = ({ label, value, isTotal = false, isCurrency = true }) => (
  <div
    className={`flex justify-between items-center ${
      isTotal
        ? "text-xl font-bold pt-4 mt-4 border-t-2 border-gray-100"
        : "text-gray-700"
    }`}
  >
    <span className={isTotal ? "text-gray-900" : ""}>{label}</span>
    <span className={isTotal ? "text-gray-900" : "font-medium"}>
      {typeof value === "number" && isCurrency ? `₹${value.toFixed(2)}` : value}
    </span>
  </div>
);

// component that shows the order summary and handles booking creation
const OrderSummary: FC<{ 
  experience: Experience | null;
  bookingData: {
    quantity: number;
    subtotal: number;
    taxes: number;
    total: number;
    date: string;
    time: string;
  } | null;
  agreedToTerms: boolean;
  formData: {
    fullName: string;
    email: string;
    promoCode: string;
  };
}> = ({ experience, bookingData, agreedToTerms, formData }) => {
  const router = useRouter();
  
  if (!experience || !bookingData) return null;

  const { quantity, subtotal, taxes, total, date, time } = bookingData;

  const isFormValid = formData.fullName.trim() && formData.email.trim();
  const canProceed = agreedToTerms && isFormValid;

  return (
    <div className="p-6 bg-white rounded-xl shadow-xl w-full">
      <div className="space-y-3">
        <SummaryRow label="Experience" value={experience.title} />
        <SummaryRow label="Date" value={date} />
        <SummaryRow label="Time" value={time} />
        <SummaryRow label="Qty" value={quantity} isCurrency={false} />

        <div className="pt-2">
          <SummaryRow label="Subtotal" value={subtotal} />
          <SummaryRow label="Taxes" value={taxes} />
        </div>
      </div>

      {/* Total */}
      <SummaryRow label="Total" value={total} isTotal={true} />

      {/* Pay and Confirm Button (Yellow) */}
      <button
        className={`w-full mt-6 py-3 font-semibold rounded-lg transition duration-150 ease-in-out shadow-lg ${
          canProceed
            ? 'bg-yellow-400 hover:bg-yellow-500 text-black'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
        onClick={async () => {
          if (!canProceed) return;
          
          try {
            const booking = await bookingAPI.createBooking({
              experienceId: experience._id || '',
              experienceTitle: experience.title,
              date: date,
              time: time,
              quantity: quantity,
              subtotal: subtotal,
              taxes: taxes,
              total: total,
              customerInfo: {
                fullName: formData.fullName,
                email: formData.email
              }
            });
            
            router.push(`/confirmed?bookingId=${booking._id}`);
          } catch (error) {
            console.error('Error creating booking:', error);
            alert('Failed to create booking. Please try again.');
          }
        }}
        disabled={!canProceed}
      >
        {canProceed ? 'Pay and Confirm' : 
         !isFormValid ? 'Please fill name and email' : 
         'Please agree to terms'}
      </button>
    </div>
  );
};

// component for the checkout form with customer details
const CheckoutForm: FC<{ 
  experience: Experience | null;
  agreedToTerms: boolean;
  setAgreedToTerms: (agreed: boolean) => void;
  formData: {
    fullName: string;
    email: string;
    promoCode: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    fullName: string;
    email: string;
    promoCode: string;
  }>>;
}> = ({ experience, agreedToTerms, setAgreedToTerms, formData, setFormData }) => {

  // handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      alert("Please agree to the terms and safety policy.");
      return;
    }
    console.log("Form submitted:", formData);
  };

  const inputClasses =
    "w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 placeholder-gray-500 text-gray-900";

  return (
    <div className="space-y-6">
      {/* Back Link */}
      <Link
        href={`/${experience?.title.toLowerCase().replace(/\s+/g, '-') || ''}`}
        className="flex items-center text-gray-600 hover:text-gray-900 transition text-lg font-semibold"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Booking
      </Link>

      {/* Form Container */}
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white rounded-xl shadow-xl space-y-6"
      >
        {/* Name and Email Row */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 space-y-1">
            <label
              htmlFor="fullName"
              className="text-sm font-medium text-gray-700"
            >
              Full name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Your name"
              required
              className={inputClasses}
            />
          </div>
          <div className="flex-1 space-y-1">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Your email"
              required
              className={inputClasses}
            />
          </div>
        </div>

        {/* Promo Code Row */}
        <div className="flex gap-4 items-end">
          <div className="grow space-y-1">
            <label
              htmlFor="promoCode"
              className="text-sm font-medium text-gray-700"
            >
              Promo code
            </label>
            <input
              type="text"
              id="promoCode"
              name="promoCode"
              value={formData.promoCode}
              onChange={handleInputChange}
              placeholder="Enter promo code"
              className={inputClasses}
            />
          </div>
          <button
            type="button"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition duration-150 ease-in-out shadow-md"
          >
            Apply
          </button>
        </div>

        {/* Terms and Policy Checkbox */}
        <div className="pt-4">
          <label className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="h-4 w-4 text-yellow-400 rounded border-gray-300 focus:ring-yellow-400"
            />
            <span>I agree to the terms and safety policy</span>
          </label>
        </div>
      </form>
    </div>
  );
};

// main app component for the checkout page
const App: FC = () => {
  const [experience, setExperience] = useState<Experience | null>(null);
  const [bookingData, setBookingData] = useState<{
    quantity: number;
    subtotal: number;
    taxes: number;
    total: number;
    date: string;
    time: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    promoCode: ""
  });

  // fetch experience and booking data when component loads
  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const pathSegments = window.location.pathname.split('/');
        const experienceName = pathSegments[1]?.replace(/-/g, ' ') || '';
        
        // Get encrypted booking data from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const encryptedData = urlParams.get('data');
        
        if (encryptedData) {
          const bookingInfo = decryptData(encryptedData);
          if (bookingInfo) {
            setBookingData(bookingInfo);
          }
        }
        
        if (experienceName) {
          const experiences = await experienceAPI.searchByName(experienceName);
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
          {/* Left: Checkout Form (Takes 2/3 width on desktop) */}
          <div className="lg:w-2/3 mb-10 lg:mb-0">
            <CheckoutForm 
              experience={experience}
              agreedToTerms={agreedToTerms}
              setAgreedToTerms={setAgreedToTerms}
              formData={formData}
              setFormData={setFormData}
            />
          </div>

          {/* Right: Order Summary (Takes 1/3 width on desktop) */}
          <div className="lg:w-1/3">
            <OrderSummary 
              experience={experience} 
              bookingData={bookingData}
              agreedToTerms={agreedToTerms}
              formData={formData}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
