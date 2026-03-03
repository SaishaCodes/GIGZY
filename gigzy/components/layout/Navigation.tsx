'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Search, 
  Plus, 
  Calendar, 
  Wallet, 
  Trophy,
  User,
  Bell,
  Menu,
  X,
  LogOut,
  Settings
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { useUnreadNotifications } from '@/lib/store';
import ModeSwitcher from '@/ui/ModeSwitcher';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { mode, user } = useAppStore();
  const unreadNotifications = useUnreadNotifications();

  const navItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard', active: true },
    { icon: Search, label: 'Explore', href: '/explore', active: false },
    { icon: Plus, label: 'Gigzy It!', href: '/create', active: false, highlight: true },
    { icon: Calendar, label: 'My Tasks', href: '/tasks', active: false },
    { icon: Wallet, label: 'Wallet', href: '/wallet', active: false },
    { icon: Trophy, label: 'Rewards', href: '/rewards', active: false },
  ];

  const getNavColor = () => {
    return mode === 'SEEKER' ? 'text-seeker-500' : 'text-provider-500';
  };

  const getNavBg = () => {
    return mode === 'SEEKER' ? 'bg-seeker-500/10' : 'bg-provider-500/10';
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-800/95 backdrop-blur-md border-b border-dark-600">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className={`w-10 h-10 rounded-xl ${getNavBg()} flex items-center justify-center ${getNavColor()}`}>
              <span className="text-xl font-bold">G</span>
            </div>
            <span className="text-xl font-bold text-gradient">Gigzy</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  item.active
                    ? item.highlight
                      ? `btn ${mode === 'SEEKER' ? 'btn-seeker' : 'btn-provider'}`
                      : `${getNavBg()} ${getNavColor()}`
                    : 'text-dark-400 hover:text-dark-300 hover:bg-dark-700'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </a>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Mode Switcher */}
            <div className="hidden lg:block">
              <ModeSwitcher />
            </div>

            {/* Notifications */}
            <button className="relative p-2 rounded-lg hover:bg-dark-700 transition-colors">
              <Bell className="w-5 h-5 text-dark-400" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-error-500 rounded-full text-xs text-white flex items-center justify-center">
                  {unreadNotifications > 9 ? '9+' : unreadNotifications}
                </span>
              )}
            </button>

            {/* User Menu */}
            <div className="relative group">
              <button className="flex items-center gap-2 p-1 rounded-lg hover:bg-dark-700 transition-colors">
                <img
                  src={user?.seekerProfile?.avatar || user?.providerProfile?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
                  alt="User"
                  className="w-8 h-8 rounded-full border-2 border-turquoise-500"
                />
                <span className="hidden lg:block text-sm font-medium">{user?.username || 'User'}</span>
              </button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 top-full mt-2 w-48 bg-dark-700 rounded-lg border border-dark-600 shadow-large opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="py-2">
                  <a href="/profile" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-dark-600">
                    <User className="w-4 h-4" />
                    Profile
                  </a>
                  <a href="/settings" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-dark-600">
                    <Settings className="w-4 h-4" />
                    Settings
                  </a>
                  <div className="border-t border-dark-600 my-2" />
                  <button className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-dark-600 w-full text-error-500">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-dark-700 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-dark-600 overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {/* Mobile Mode Switcher */}
                <div className="flex justify-center mb-4">
                  <ModeSwitcher />
                </div>

                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      item.active
                        ? item.highlight
                          ? `btn ${mode === 'SEEKER' ? 'btn-seeker' : 'btn-provider'}`
                          : `${getNavBg()} ${getNavColor()}`
                        : 'text-dark-400 hover:text-dark-300 hover:bg-dark-700'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </a>
                ))}

                <div className="border-t border-dark-600 my-2 pt-2">
                  <a href="/profile" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-dark-400 hover:bg-dark-700">
                    <User className="w-5 h-5" />
                    Profile
                  </a>
                  <a href="/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-dark-400 hover:bg-dark-700">
                    <Settings className="w-5 h-5" />
                    Settings
                  </a>
                  <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-error-500 w-full hover:bg-dark-700">
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}