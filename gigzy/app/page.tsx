import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Gigzy - Home',
  description: 'Hyperlocal micro-task ecosystem for students',
};

export default function Home() {
  // For demo purposes, redirect to dashboard
  // In production, this would check authentication
  redirect('/dashboard');
}