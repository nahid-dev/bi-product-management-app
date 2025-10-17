'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getProductById } from '../../lib/data';

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchProduct = () => {
      setIsLoading(true);
      const foundProduct = getProductById(params.id);
      
      setTimeout(() => {
        setProduct(foundProduct);
        setIsLoading(false);
      }, 500);
    };

    fetchProduct();
  }, [params.id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDelete = () => {
    // In a real app, this would make an API call
    console.log('Deleting product:', product.id);
    setShowDeleteModal(false);
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green mx-auto mb-4"></div>
              <p className="text-gray-600">Loading product details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">❌</div>
            <h1 className="text-3xl font-bold text-gray-600 mb-4">Product Not Found</h1>
            <p className="text-gray-500 mb-6">The product you're looking for doesn't exist.</p>
            <Link 
              href="/"
              className="bg-green text-light px-6 py-3 rounded-lg hover:bg-green/90 transition-colors font-medium"
            >
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-green transition-colors">Products</Link>
            <span>/</span>
            <span className="text-dark font-medium">{product.name}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative h-96 w-full overflow-hidden rounded-xl shadow-lg">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* Stock Status */}
            <div className="flex items-center justify-center">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                product.inStock 
                  ? 'bg-green text-light' 
                  : 'bg-red text-light'
              }`}>
                {product.inStock ? '✅ In Stock' : '❌ Out of Stock'}
              </span>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="mb-2">
                <span className="inline-block bg-beige text-dark px-3 py-1 rounded-full text-sm font-medium">
                  {product.category}
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-dark mb-4">{product.name}</h1>
              
              <div className="text-4xl font-bold text-green mb-6">
                {formatPrice(product.price)}
              </div>
              
              <p className="text-gray-700 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Product Info */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-dark mb-4">Product Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-medium">{formatPrice(product.price)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-medium ${product.inStock ? 'text-green' : 'text-red'}`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Created:</span>
                  <span className="font-medium">{formatDate(product.createdAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Updated:</span>
                  <span className="font-medium">{formatDate(product.updatedAt)}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/products/${product.id}/edit`}
                className="flex-1 bg-beige text-dark text-center py-3 px-6 rounded-lg hover:bg-beige/90 transition-colors font-semibold"
              >
                Edit Product
              </Link>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="flex-1 bg-red text-light text-center py-3 px-6 rounded-lg hover:bg-red/90 transition-colors font-semibold"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-dark mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{product.name}"? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 bg-gray-200 text-dark py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-red text-light py-2 px-4 rounded-lg hover:bg-red/90 transition-colors font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
