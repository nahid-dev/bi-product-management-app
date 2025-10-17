'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getProductById } from '../../../lib/data';
import ProductForm from '../../../components/ProductForm.jsx';

export default function EditProduct() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) {
    return (
      <div className="bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green mx-auto mb-4"></div>
              <p className="text-gray-600">Loading product...</p>
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
            <p className="text-gray-500 mb-6">The product you're trying to edit doesn't exist.</p>
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
            <Link href={`/products/${product.id}`} className="hover:text-green transition-colors">
              {product.name}
            </Link>
            <span>/</span>
            <span className="text-dark font-medium">Edit</span>
          </div>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-dark mb-2">Edit Product</h1>
          <p className="text-gray-600">
            Update the product information below. All fields are required.
          </p>
        </div>

        {/* Form Container */}
        <div className="max-w-2xl">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <ProductForm product={product} isEdit={true} />
          </div>
        </div>
      </div>
    </div>
  );
}
