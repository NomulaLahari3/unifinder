'use client';

import { useState, useEffect } from 'react';
import { getColleges, getCompareColleges } from '@/lib/api';

export default function ComparePage() {
  const [allColleges, setAllColleges] = useState<any[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>(['', '']); // Start with 2 slots
  const [compareData, setCompareData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getColleges().then(data => setAllColleges(data.data));
  }, []);

  const handleSelectChange = (index: number, value: string) => {
    const newSelected = [...selectedIds];
    newSelected[index] = value;
    setSelectedIds(newSelected);
  };

  const addSlot = () => {
    if (selectedIds.length < 4) {
      setSelectedIds([...selectedIds, '']);
    }
  };

  const removeSlot = (index: number) => {
    if (selectedIds.length > 2) {
      const newSelected = [...selectedIds];
      newSelected.splice(index, 1);
      setSelectedIds(newSelected);
    }
  };

  const handleCompare = async () => {
    const validIds = selectedIds.filter(id => id !== '');
    if (validIds.length < 2) {
      alert('Please select at least 2 colleges to compare.');
      return;
    }
    setLoading(true);
    try {
      const data = await getCompareColleges(validIds.map(Number));
      setCompareData(data);
    } catch (error) {
      console.error('Failed to compare');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center">
        <h1 className="text-3xl font-extrabold mb-4">Compare Colleges</h1>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">Select up to 4 colleges to compare their fees, placement records, and ratings side-by-side.</p>
        
        <div className="flex flex-wrap justify-center gap-4 items-end mb-8">
          {selectedIds.map((id, index) => (
            <div key={index} className="flex flex-col items-start bg-gray-50 p-4 rounded-xl border border-gray-200">
              <div className="flex justify-between w-full mb-2">
                <label className="text-sm font-semibold text-gray-700">College {index + 1}</label>
                {selectedIds.length > 2 && (
                  <button onClick={() => removeSlot(index)} className="text-red-500 text-xs hover:underline">Remove</button>
                )}
              </div>
              <select
                value={id}
                onChange={(e) => handleSelectChange(index, e.target.value)}
                className="p-3 bg-white border border-gray-300 rounded-lg w-64 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">-- Select College --</option>
                {allColleges.map(c => (
                  <option key={c.id} value={c.id} disabled={selectedIds.includes(String(c.id)) && c.id !== Number(id)}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          ))}
          {selectedIds.length < 4 && (
            <button onClick={addSlot} className="h-[74px] px-6 border-2 border-dashed border-gray-300 text-gray-500 rounded-xl hover:bg-gray-50 transition flex items-center justify-center font-semibold">
              + Add College
            </button>
          )}
        </div>

        <button 
          onClick={handleCompare} 
          disabled={loading}
          className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-xl transition disabled:opacity-50"
        >
          {loading ? 'Comparing...' : 'Compare Now'}
        </button>
      </div>

      {compareData.length > 0 && (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="p-4 border-b border-gray-200 bg-gray-50 min-w-[150px] font-bold text-gray-700">Feature</th>
                {compareData.map(c => (
                  <th key={c.id} className="p-4 border-b border-gray-200 bg-gray-50 min-w-[250px] align-top">
                    <div className="font-extrabold text-xl text-gray-900 mb-2">{c.name}</div>
                    <div className="text-sm text-gray-500 font-normal">📍 {c.location}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4 border-b border-gray-100 font-semibold text-gray-700 bg-gray-50">Rating</td>
                {compareData.map(c => (
                  <td key={c.id} className="p-4 border-b border-gray-100">
                    <span className="font-bold text-lg">⭐ {c.rating}</span> / 5.0
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 border-b border-gray-100 font-semibold text-gray-700 bg-gray-50">Average Fees</td>
                {compareData.map(c => (
                  <td key={c.id} className="p-4 border-b border-gray-100">
                    <span className="font-bold text-lg">₹{c.fees.toLocaleString()}</span> / year
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 border-b border-gray-100 font-semibold text-gray-700 bg-gray-50">Placement %</td>
                {compareData.map(c => (
                  <td key={c.id} className="p-4 border-b border-gray-100">
                    <span className="font-bold text-lg text-green-600">{c.placementPercentage}%</span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-gray-700 bg-gray-50">Top Courses</td>
                {compareData.map(c => (
                  <td key={c.id} className="p-4">
                    <ul className="list-disc pl-5 space-y-1">
                      {c.courses?.slice(0,3).map((course: any) => (
                        <li key={course.id} className="text-sm text-gray-600">{course.name}</li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
