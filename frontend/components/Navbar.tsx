"use client";

import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";

interface NavbarProps {
  searchInput: string;
  setSearchInput: (value: string) => void;
  onSearch: () => void;
}

// navbar component with logo and search bar
const Navbar: FC<NavbarProps> = ({ searchInput, setSearchInput, onSearch }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <div className="relative h-12 w-48">
            <Image 
              src="/logo.png" 
              alt="NH Highway Delights" 
              fill
              className="object-contain"
            />
          </div>
        </Link>

        {/* Search Component */}
        <div className="flex w-full md:w-auto">
          <input
            type="text"
            placeholder="Search experiences"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSearch()}
            className="w-full md:w-80 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button 
            onClick={onSearch}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-r-lg transition duration-150 ease-in-out shadow-sm active:bg-yellow-600"
          >
            Search
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;