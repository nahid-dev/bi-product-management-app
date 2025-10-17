'use client';

import Header from '../../components/Header';
import ProductForm from '../../components/ProductForm';

export default function NewProduct() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <a href="/" className="hover:text-green transition-colors">Products</a>
            <span>/</span>
            <span className="text-dark font-medium">New Product</span>
          </div>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-dark mb-2">Create New Product</h1>
          <p className="text-gray-600">
            Fill in the details below to add a new product to your inventory.
          </p>
        </div>

        {/* Form Container */}
        <div className="max-w-2xl">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <ProductForm />
          </div>
        </div>
      </main>
    </div>
  );
}
