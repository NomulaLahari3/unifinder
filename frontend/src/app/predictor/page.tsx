'use client';

import { useState } from 'react';
import { predictColleges } from '@/lib/api';
import Link from 'next/link';

export default function PredictorPage() {
  const [rank, setRank] = useState('');
  const [exam, setExam] = useState('JEE Main');
  const [results, setResults] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rank) return;
    setLoading(true);
    try {
      const data = await predictColleges(rank);
      setResults(data);
    } catch (error) {
      console.error('Prediction failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-10 rounded-3xl shadow-xl text-white text-center">
        <h1 className="text-4xl font-extrabold mb-4">College Predictor</h1>
        <p className="text-blue-100 mb-8 max-w-xl mx-auto text-lg">
          Enter your competitive exam rank to predict which colleges you have the best chance of getting into.
        </p>

        <form onSubmit={handlePredict} className="bg-white p-6 rounded-2xl shadow-lg flex flex-col md:flex-row gap-4 max-w-2xl mx-auto text-left">
          <div className="flex-1">
            <label className="block text-sm font-bold text-gray-700 mb-2">Exam</label>
            <select 
              value={exam} 
              onChange={(e) => setExam(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-gray-50"
            >
              <option value="JEE Main">JEE Main</option>
              <option value="JEE Advanced">JEE Advanced</option>
              <option value="NEET">NEET</option>
              <option value="BITSAT">BITSAT</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-bold text-gray-700 mb-2">Your Rank</label>
            <input 
              type="number" 
              placeholder="e.g. 5000" 
              value={rank}
              onChange={(e) => setRank(e.target.value)}
              required
              min="1"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-gray-50"
            />
          </div>
          <div className="flex items-end">
            <button 
              type="submit" 
              disabled={loading}
              className="h-[52px] px-8 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow disabled:opacity-70 w-full md:w-auto"
            >
              {loading ? 'Predicting...' : 'Predict'}
            </button>
          </div>
        </form>
      </div>

      {results && (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            🎯 Based on your {exam} Rank ({rank}), you can get into:
          </h2>

          {results.length === 0 ? (
            <div className="text-center py-10 bg-gray-50 rounded-2xl border border-gray-200">
              <p className="text-gray-500 text-lg">No colleges found within this rank range based on our mock data.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {results.map((college: any, index: number) => (
                <div key={college.id} className="flex flex-col md:flex-row items-center justify-between p-5 border border-gray-100 rounded-2xl hover:shadow-md transition bg-gray-50/30">
                  <div className="flex items-center gap-4 mb-4 md:mb-0">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 font-bold rounded-full flex items-center justify-center text-xl shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{college.name}</h3>
                      <p className="text-gray-500 text-sm">📍 {college.location} &nbsp;|&nbsp; Cutoff: {college.mockCutoffRank}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-center px-4 border-r border-gray-200">
                      <p className="text-xs text-gray-500 font-bold uppercase">Placement</p>
                      <p className="font-bold text-green-600">{college.placementPercentage}%</p>
                    </div>
                    <Link href={`/colleges/${college.id}`} className="px-5 py-2 bg-white border border-blue-200 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition self-center">
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
