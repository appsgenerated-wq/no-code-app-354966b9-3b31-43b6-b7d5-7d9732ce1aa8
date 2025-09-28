import React, { useEffect, useState } from 'react';
import config from '../constants.js';

const DashboardPage = ({ user, sightings, onLogout, onLoadSightings, onCreateSighting }) => {
  const [newSighting, setNewSighting] = useState({
    chickenName: '',
    notes: '',
    location: '',
    moonPhase: 'New Moon',
  });

  useEffect(() => {
    onLoadSightings();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSighting(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateSighting = async (e) => {
    e.preventDefault();
    if (!newSighting.chickenName.trim()) {
        alert('Chicken Name is required.');
        return;
    }
    await onCreateSighting(newSighting);
    setNewSighting({ chickenName: '', notes: '', location: '', moonPhase: 'New Moon' });
  };

  const moonPhases = ['New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous', 'Full Moon', 'Waning Gibbous', 'Third Quarter', 'Waning Crescent'];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Moon Chicken Dashboard</h1>
            <p className="text-sm text-gray-500">Welcome, {user.name}!</p>
          </div>
          <div className="flex items-center space-x-4">
             <a href={`${config.BACKEND_URL}/admin`} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-600 hover:text-indigo-500 transition duration-150">
              Admin Panel
            </a>
            <button
              onClick={onLogout}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Create New Sighting Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Log a New Sighting</h2>
          <form onSubmit={handleCreateSighting} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="chickenName" className="block text-sm font-medium text-gray-700">Chicken Name</label>
              <input
                type="text"
                name="chickenName"
                id="chickenName"
                placeholder="e.g., Henrietta" 
                value={newSighting.chickenName}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="md:col-span-2">
               <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Observation Notes</label>
              <textarea
                name="notes"
                id="notes"
                placeholder="What was the chicken doing?"
                value={newSighting.notes}
                onChange={handleInputChange}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                id="location"
                placeholder="e.g., The Coop"
                value={newSighting.location}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="moonPhase" className="block text-sm font-medium text-gray-700">Moon Phase</label>
              <select
                name="moonPhase"
                id="moonPhase"
                value={newSighting.moonPhase}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                {moonPhases.map(phase => <option key={phase} value={phase}>{phase}</option>)}
              </select>
            </div>
            <div className="md:col-span-2 text-right">
                <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Add Sighting
                </button>
            </div>
          </form>
        </div>

        {/* Sightings List */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Sightings</h2>
          {sightings.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                 <p className="text-gray-500">No chicken sightings yet. Log your first one above!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sightings.map(sighting => (
                <div key={sighting.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                  {sighting.photo?.thumbnail?.url && <img src={sighting.photo.thumbnail.url} alt={sighting.chickenName} className="w-full h-48 object-cover"/>}
                  <div className="p-4 flex-grow flex flex-col">
                    <h3 className="font-bold text-lg text-gray-900">{sighting.chickenName}</h3>
                    <p className="text-sm text-gray-600 mt-1 flex-grow">{sighting.notes}</p>
                    <div className="mt-4 text-xs text-gray-500">
                        <p><strong>Location:</strong> {sighting.location || 'N/A'}</p>
                        <p><strong>Moon Phase:</strong> {sighting.moonPhase}</p>
                        <p><strong>Observer:</strong> {sighting.owner?.name || 'Unknown'}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
