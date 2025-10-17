'use client';

import { useAuth } from '../lib/hooks.js';
import ProtectedRoute from '../components/ProtectedRoute.jsx';
import { Button } from '../../components/ui/button.jsx';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">
                    {user?.email?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <h1 className="text-3xl font-bold text-dark mb-2">
                  Welcome to Dashboard
                </h1>
                <p className="text-gray-600">
                  Hello, {user?.email || 'User'}! You are successfully authenticated.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-green/10 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-dark mb-3">
                    Authentication Status
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className="text-green font-medium">Authenticated</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="text-dark font-medium">{user?.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">User ID:</span>
                      <span className="text-dark font-medium">{user?.id}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-beige/10 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-dark mb-3">
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    <Button asChild variant="default" className="w-full">
                      <Link href="/products/new">Add New Product</Link>
                    </Button>
                    <Button asChild variant="secondary" className="w-full">
                      <Link href="/">View All Products</Link>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-gray-500 text-sm">
                  This is a protected route that only authenticated users can access.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
