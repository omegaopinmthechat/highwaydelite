"use client";

import React, { FC, useState, useMemo, useEffect } from "react";
import Navbar from "../components/Navbar";
import ExperienceCard from "../components/ExperienceCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { experienceAPI } from "./api/api";
import { Experience } from "../components/types";

// main app component that shows all the experiences
const App: FC = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  // fetch all experiences when component loads
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const data = await experienceAPI.getAllExperiences();
        setExperiences(data);
      } catch (error) {
        console.error('Error fetching experiences:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  // filter experiences based on search term
  const filteredExperiences = useMemo(() => {
    const activeSearch = searchInput === "" ? "" : searchTerm;
    if (!activeSearch) return experiences;
    return experiences.filter(exp => 
      exp.title.toLowerCase().includes(activeSearch.toLowerCase())
    );
  }, [searchTerm, searchInput, experiences]);

  // handle search when user clicks search button
  const handleSearch = () => {
    setSearchTerm(searchInput);
  };


  return (
    <div className="min-h-screen bg-gray-50 antialiased">
      <Navbar 
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        onSearch={handleSearch}
      />

      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 hidden">
          Featured Experiences
        </h2>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {loading ? (
            <div className="col-span-full flex justify-center py-8">
              <LoadingSpinner fullScreen />
            </div>
          ) : filteredExperiences.length > 0 ? (
            filteredExperiences.map((exp, index) => (
              <ExperienceCard key={exp._id || index} experience={exp} />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">No experiences found.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
