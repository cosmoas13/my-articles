import React, { useState } from 'react';
import { useRouter } from 'next/router';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/blog?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-8">
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          className="py-2 px-4 w-full rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-200"
          placeholder="Cari artikel..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button 
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md transition duration-300"
        >
          Cari
        </button>
      </form>
    </div>
  );
};

export default SearchBar;