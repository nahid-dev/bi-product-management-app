'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { mockProducts, categories, searchProducts, getProductsByCategory } from './lib/data';
import ProductCard from './components/ProductCard.jsx';
import SearchBar from './components/SearchBar.jsx';
import CategoryFilter from './components/CategoryFilter.jsx';
import { Button } from "../components/ui/button.jsx";

export default function Home() {
  const [products, setProducts] = useState(mockProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(false);

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsLoading(true);
    
    setTimeout(() => {
      let filteredProducts = mockProducts;
      
      if (query.trim()) {
        filteredProducts = searchProducts(query);
      }
      
      if (selectedCategory !== 'All') {
        filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
      }
      
      setProducts(filteredProducts);
      setIsLoading(false);
    }, 300);
  };

  // Handle category filter
  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    setIsLoading(true);
    
    setTimeout(() => {
      let filteredProducts = mockProducts;
      
      if (searchQuery.trim()) {
        filteredProducts = searchProducts(searchQuery);
      }
      
      if (category !== 'All') {
        filteredProducts = filteredProducts.filter(product => product.category === category);
      }
      
      setProducts(filteredProducts);
      setIsLoading(false);
    }, 300);
  };

  // Reset filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setProducts(mockProducts);
  };

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-dark mb-4">
            Product Manager
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover, manage, and organize your products with our intuitive
            platform. Create, edit, and track your inventory with ease.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild variant="default" size="lg">
              <Link href="/products/new">Add New Product</Link>
            </Button>
            <Button onClick={resetFilters} variant="secondary" size="lg">
              Reset Filters
            </Button>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryFilter}
          />
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green"></div>
                Searching...
              </span>
            ) : (
              `Showing ${products.length} product${
                products.length !== 1 ? "s" : ""
              }`
            )}
          </p>
        </div>

        {/* Products Grid */}
        {products.length === 0 && !isLoading ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">
              No products found
            </h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search terms or category filter
            </p>
            <Button onClick={resetFilters} variant="default" size="sm">
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
