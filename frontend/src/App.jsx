import React, { useState, useEffect } from 'react';
import Manifest from '@mnfst/sdk';
import LandingPage from './screens/LandingPage';
import DashboardPage from './screens/DashboardPage';
import { testBackendConnection } from './services/apiService.js';
import config from './constants.js';
import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const [sightings, setSightings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [backendConnected, setBackendConnected] = useState(false);
  const manifest = new Manifest({ appId: config.APP_ID, baseURL: config.BACKEND_URL });

  useEffect(() => {
    const initializeApp = async () => {
      console.log('🚀 [APP] Starting backend connection test...');
      const result = await testBackendConnection();
      setBackendConnected(result.success);

      if (result.success) {
        console.log('✅ [APP] Backend connection successful. Checking auth status...');
        try {
          const currentUser = await manifest.from('User').me();
          setUser(currentUser);
          console.log('👤 [APP] User is logged in:', currentUser.email);
        } catch (error) {
          setUser(null);
          console.log('👤 [APP] No active session found.');
        }
      } else {
        console.error('❌ [APP] Backend connection failed. App may not function correctly.');
        console.error('❌ [APP] Connection error:', result.error);
      }
      setIsLoading(false);
    };

    initializeApp();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      await manifest.login(email, password);
      const currentUser = await manifest.from('User').me();
      setUser(currentUser);
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleLogout = async () => {
    await manifest.logout();
    setUser(null);
    setSightings([]);
  };

  const loadSightings = async () => {
    try {
      const response = await manifest.from('Sighting').find({ 
        include: ['owner'],
        sort: { createdAt: 'desc' } 
      });
      setSightings(response.data);
    } catch (error) {
      console.error('Failed to load sightings:', error);
    }
  };

  const createSighting = async (sightingData) => {
    try {
      const newSighting = await manifest.from('Sighting').create(sightingData);
      // To get the owner data included, we reload the list.
      await loadSightings();
    } catch (error) {
      console.error('Failed to create sighting:', error);
      alert(`Failed to create sighting: ${error.message}`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Initializing App...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
        <span className={`h-3 w-3 rounded-full ${backendConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
        <span className="text-xs text-gray-600">{backendConnected ? 'API Connected' : 'API Disconnected'}</span>
      </div>
      
      {user ? (
        <DashboardPage
          user={user}
          sightings={sightings}
          onLogout={handleLogout}
          onLoadSightings={loadSightings}
          onCreateSighting={createSighting}
        />
      ) : (
        <LandingPage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
