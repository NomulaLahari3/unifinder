'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getCollegeById } from '@/lib/api';
import Link from 'next/link';
import { use } from 'react';

export default function CollegeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const [college, setCollege] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollege = async () => {
      try {
        const data = await getCollegeById(id as string);
        setCollege(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchCollege();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!college) {
    return <div className="text-center py-20 text-gray-500">College not found</div>;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <Link href="/colleges" className="text-blue-600 hover:underline mb-4 inline-block">&larr; Back to Colleges</Link>
      
      {/* Header Section */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden relative">
        <div className="h-64 w-full bg-gray-300">
          {college.imageUrl && (
            <img src={college.imageUrl} alt={college.name} className="w-full h-full object-cover" />
          )}
        </div>
        <div className="p-8 relative">
          <div className="absolute -top-12 right-8 bg-white p-4 rounded-2xl shadow-lg flex flex-col items-center border border-gray-100">
            <span className="text-3xl font-black text-yellow-500">{college.rating}</span>
            <span className="text-xs text-gray-500 uppercase font-bold">Rating</span>
          </div>
          
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{college.name}</h1>
          <p className="text-lg text-gray-600 mb-6 flex items-center">
            📍 {college.location}
          </p>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="bg-blue-50 px-4 py-2 rounded-lg border border-blue-100">
              <span className="text-sm text-blue-600 font-semibold uppercase block">Average Fees</span>
              <span className="font-bold text-gray-900 text-lg">₹{college.fees.toLocaleString()} / year</span>
            </div>
            <div className="bg-green-50 px-4 py-2 rounded-lg border border-green-100">
              <span className="text-sm text-green-600 font-semibold uppercase block">Placement</span>
              <span className="font-bold text-gray-900 text-lg">{college.placementPercentage}%</span>
            </div>
          </div>
          
          <p className="text-gray-700 leading-relaxed text-lg">{college.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Courses */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">🎓 Courses Offered</h2>
            <div className="space-y-4">
              {college.courses?.map((course: any) => (
                <div key={course.id} className="p-5 border border-gray-100 rounded-xl hover:shadow-md transition bg-gray-50/50 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{course.name}</h3>
                    <p className="text-gray-500 text-sm">Duration: {course.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-900 font-bold">₹{course.fees.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 uppercase font-bold">Total Fees</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Reviews */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">💬 Student Reviews</h2>
            <div className="space-y-6">
              {college.reviews?.length > 0 ? college.reviews.map((review: any) => (
                <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-gray-900">{review.userName}</span>
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded font-bold">
                      ⭐ {review.rating}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm italic">"{review.comment}"</p>
                </div>
              )) : (
                <p className="text-gray-500">No reviews yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
