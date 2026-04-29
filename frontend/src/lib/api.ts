const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const getColleges = async (search = '', location = '', minFees = '', maxFees = '') => {
  const query = new URLSearchParams();
  if (search) query.append('search', search);
  if (location) query.append('location', location);
  if (minFees) query.append('minFees', minFees);
  if (maxFees) query.append('maxFees', maxFees);

  const res = await fetch(`${API_URL}/colleges?${query.toString()}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch colleges');
  return res.json();
};

export const getCollegeById = async (id: string) => {
  const res = await fetch(`${API_URL}/colleges/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch college details');
  return res.json();
};

export const getCompareColleges = async (ids: number[]) => {
  const res = await fetch(`${API_URL}/compare?ids=${ids.join(',')}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch comparison data');
  return res.json();
};

export const predictColleges = async (rank: string) => {
  const res = await fetch(`${API_URL}/predictor?rank=${rank}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch prediction');
  return res.json();
};
