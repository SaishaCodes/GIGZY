'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import Navigation from '@/components/layout/Navigation';
import SeekerDashboard from '@/components/dashboard/SeekerDashboard';
import ProviderDashboard from '@/components/dashboard/ProviderDashboard';

export default function DashboardPage() {
  const { mode, userLocation } = useAppStore();

  useEffect(() => {
    // Request user's location when page loads
    if (navigator.geolocation && !userLocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          
          // In a real app, you would send this to your API
          console.log('User location:', location);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, [userLocation]);

  return (
    <div className="min-h-screen bg-dark-900">
      <Navigation />
      
      <main className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          {mode === 'SEEKER' ? <SeekerDashboard /> : <ProviderDashboard />}
        </div>
      </main>
    </div>
  );
}