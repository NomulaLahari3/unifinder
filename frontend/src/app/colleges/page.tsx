'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getColleges } from '@/lib/api';

export default function CollegesPage() {
  const [colleges, setColleges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  
  const fetchColleges = async () => {
    setLoading(true);
    try {
      const data = await getColleges(search, location);
      setColleges(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchColleges();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchColleges();
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold mb-4">Search Colleges</h2>
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="College Name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="text"
            placeholder="Location (e.g. Mumbai)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button type="submit" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
            Search
          </button>
        </form>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {colleges.length === 0 ? (
            <p className="text-gray-500 col-span-full text-center py-12">No colleges found.</p>
          ) : (
            colleges.map((college) => (
              <div key={college.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all group flex flex-col">
                <div className="h-48 overflow-hidden bg-gray-200 relative">
                  {college.imageUrl ? (
                    <img src={college.imageUrl} alt={college.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                  )}
                  <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-sm font-bold text-gray-800 shadow">
                    ⭐ {college.rating}
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-2">{college.name}</h3>
                  <p className="text-gray-500 text-sm mb-4 flex items-center">
                    <span className="mr-1">📍</span> {college.location}
                  </p>
                  
                  <div className="flex justify-between items-center mt-auto mb-4 bg-gray-50 p-3 rounded-lg">
                    <div>
                      <p className="text-xs text-gray-500 font-semibold uppercase">Avg Fees</p>
                      <p className="font-bold text-gray-900">₹{college.fees.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 font-semibold uppercase">Placement</p>
                      <p className="font-bold text-green-600">{college.placementPercentage}%</p>
                    </div>
                  </div>

                  <Link href={`/colleges/${college.id}`} className="block w-full text-center bg-blue-50 text-blue-600 font-semibold py-2 rounded-lg hover:bg-blue-100 transition">
                    View Details
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
