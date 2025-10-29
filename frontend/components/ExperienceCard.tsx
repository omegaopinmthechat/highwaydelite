import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { Experience } from './types';

// component to display experience cards with image and details
const ExperienceCard: FC<{ experience: Experience }> = ({ experience }) => {
  const { title, location, price, description, image_url } = experience;

  return (
    <div className="bg-gray-100 rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100 flex flex-col w-full min-h-[420px]">
      {/* Image Area */}
      <Image
        src={image_url}
        alt={title}
        width={400}
        height={250}
        unoptimized={true}
        className="w-full h-48 object-cover rounded-t-xl shrink-0"
        // Fallback placeholder for broken images
        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src =
            "https://placehold.co/400x250/D1D5DB/4B5563?text=Image+Missing";
        }}
      />

      {/* Content Body */}
      <div className="p-4 flex-1 flex flex-col min-h-0">
        {/* Title and Location Pill */}
        <div className="flex flex-col gap-2 mb-3">
          <h2 className="text-lg font-semibold text-gray-900 leading-tight line-clamp-2">
            {title}
          </h2>
          <span className="text-xs font-medium bg-gray-300 text-gray-700 px-3 py-1 rounded-lg self-start shadow-inner">
            {location}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 flex-1 line-clamp-3">
          {description}
        </p>

        {/* Price and CTA Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
          {/* Price */}
          <div className="text-sm text-gray-500">
            From{" "}
            <span className="text-lg font-bold text-gray-900 block">
              ₹{price.toFixed(2)}
            </span>
          </div>

          {/* Button (Yellow background) */}
          <Link
            href={`/${title.toLowerCase().replace(/\s+/g, '-')}`}
            className="bg-yellow-400 hover:bg-yellow-500 text-black text-sm font-semibold py-2 px-3 rounded-lg shadow-md transition duration-150 ease-in-out shrink-0"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;