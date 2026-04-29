import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-8">
      <div className="space-y-4">
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight sm:text-6xl">
          Find Your <span className="text-blue-600">Dream College</span>
        </h1>
        <p className="max-w-2xl text-xl text-gray-500 mx-auto">
          Discover top colleges, compare them side-by-side, and predict your admission chances based on your rank. Your journey starts here.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <Link 
          href="/colleges" 
          className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all transform hover:-translate-y-1"
        >
          Explore Colleges
        </Link>
        <Link 
          href="/predictor" 
          className="px-8 py-4 bg-white text-blue-600 border border-blue-200 rounded-full font-semibold shadow-md hover:bg-gray-50 hover:shadow-lg transition-all transform hover:-translate-y-1"
        >
          Rank Predictor
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 w-full max-w-5xl">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 text-xl">🔍</div>
          <h3 className="text-xl font-bold mb-2">Search & Filter</h3>
          <p className="text-gray-600">Easily find colleges based on location, fees, and courses offered.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4 text-xl">⚖️</div>
          <h3 className="text-xl font-bold mb-2">Compare</h3>
          <p className="text-gray-600">Put colleges head-to-head to compare fees, placements, and ratings.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 text-xl">🎯</div>
          <h3 className="text-xl font-bold mb-2">Predict</h3>
          <p className="text-gray-600">Enter your competitive exam rank and see where you can get admission.</p>
        </div>
      </div>
    </div>
  );
}
