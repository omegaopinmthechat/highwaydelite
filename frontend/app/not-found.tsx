"use client";

import React, { FC } from "react";
import Link from "next/link";
import { Home, Compass, ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar";

// cool 404 not found page component
const NotFoundPage: FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 antialiased">
      <Navbar searchInput="" setSearchInput={() => {}} onSearch={() => {}} />

      {/* Main Content */}
      <main className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          {/* Large 404 Number */}
          <div className="relative mb-8">
            <h1 className="text-9xl font-extrabold text-gray-200 select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <Compass className="w-24 h-24 text-yellow-400" />
            </div>
          </div>

          {/* Error Message */}
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Oops! Page Not Found
          </h2>

          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            Looks like you&apos;ve ventured off the beaten path. The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>

          {/* Fun Message */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
            <p className="text-gray-700 italic">
              &quot;Not all who wander are lost, but this page definitely is!&quot;
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg transition duration-150 ease-in-out shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Home className="w-5 h-5 mr-2" />
              Go Back Home
            </Link>

            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-lg transition duration-150 ease-in-out shadow-md border border-gray-200 hover:border-gray-300"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </button>
          </div>

          {/* Additional Help */}
          <div className="mt-12 text-sm text-gray-500">
            <p>Need help finding something specific?</p>
            <p className="mt-1">
              Try searching for experiences or{" "}
              <Link href="/" className="text-yellow-600 hover:text-yellow-700 font-medium">
                browse our collection
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFoundPage;