'use client';

import React, { useState } from 'react';
import { Lock, X } from 'lucide-react';

interface LoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginDialog({ isOpen, onClose }: LoginDialogProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const correctPassword = process.env.NEXT_PUBLIC_LOGIN_PASSWORD || 'learningdemo';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!password.trim()) {
      setError('Please enter a password');
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (password === correctPassword) {
      sessionStorage.setItem('login_authenticated', 'true');
      sessionStorage.setItem('login_timestamp', new Date().toISOString());
      onClose();
      setPassword('');
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || '/';
      window.location.assign(appUrl);
      return;
    }

    setError('Incorrect password. Please try again.');
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative mx-4 w-full max-w-md rounded-lg bg-white shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 transition-colors hover:text-gray-600"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg bg-gray-100 p-2">
              <Lock className="h-6 w-6 text-gray-700" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">Login Required</h2>
          </div>

          <p className="mb-6 text-gray-600">Please enter your password to continue.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:ring-2 focus:ring-gray-900 focus:border-transparent focus:outline-none"
                placeholder="Enter password"
                autoFocus
                disabled={isLoading}
              />
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading || !password.trim()}
              className="w-full rounded-lg bg-gray-900 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? 'Logging in...' : 'Log in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
