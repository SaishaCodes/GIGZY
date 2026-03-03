'use client';

import Navigation from '@/components/layout/Navigation';
import GigzyItForm from '@/components/task/GigzyItForm';

export default function CreateTaskPage() {
  return (
    <div className="min-h-screen bg-dark-900">
      <Navigation />
      
      <main className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto py-8">
            <GigzyItForm />
          </div>
        </div>
      </main>
    </div>
  );
}