'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProductForm({ product = null, isEdit = false }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    inStock: true,
    image: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    'Electronics',
    'Clothing',
    'Accessories',
    'Food & Beverage',
    'Home & Office'
  ];

  useEffect(() => {
    if (isEdit && product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price?.toString() || '',
        category: product.category || '',
        inStock: product.inStock ?? true,
        image: product.image || ''
      });
    }
  }, [isEdit, product]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Product name must be at least 3 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Product description is required';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Product description must be at least 10 characters';
    }

    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be a valid positive number';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.image.trim()) {
      newErrors.image = 'Image URL is required';
    } else {
      // Basic URL validation
      try {
        new URL(formData.image);
      } catch {
        newErrors.image = 'Please enter a valid image URL';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        id: isEdit ? product.id : Date.now(),
        createdAt: isEdit ? product.createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      console.log(isEdit ? 'Updating product:' : 'Creating product:', productData);
      
      setIsSubmitting(false);
      router.push('/');
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Product Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-dark mb-2">
          Product Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green focus:border-transparent outline-none transition-all duration-200 ${
            errors.name ? 'border-red' : 'border-gray-300'
          }`}
          placeholder="Enter product name"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red">{errors.name}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-dark mb-2">
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green focus:border-transparent outline-none transition-all duration-200 resize-none ${
            errors.description ? 'border-red' : 'border-gray-300'
          }`}
          placeholder="Enter product description"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red">{errors.description}</p>
        )}
      </div>

      {/* Price and Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-dark mb-2">
            Price (USD) *
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            min="0"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green focus:border-transparent outline-none transition-all duration-200 ${
              errors.price ? 'border-red' : 'border-gray-300'
            }`}
            placeholder="0.00"
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red">{errors.price}</p>
          )}
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-dark mb-2">
            Category *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green focus:border-transparent outline-none transition-all duration-200 ${
              errors.category ? 'border-red' : 'border-gray-300'
            }`}
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red">{errors.category}</p>
          )}
        </div>
      </div>

      {/* Image URL */}
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-dark mb-2">
          Image URL *
        </label>
        <input
          type="url"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green focus:border-transparent outline-none transition-all duration-200 ${
            errors.image ? 'border-red' : 'border-gray-300'
          }`}
          placeholder="https://example.com/image.jpg"
        />
        {errors.image && (
          <p className="mt-1 text-sm text-red">{errors.image}</p>
        )}
      </div>

      {/* Stock Status */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="inStock"
          name="inStock"
          checked={formData.inStock}
          onChange={handleChange}
          className="h-4 w-4 text-green focus:ring-green border-gray-300 rounded"
        />
        <label htmlFor="inStock" className="ml-2 block text-sm text-dark">
          Product is in stock
        </label>
      </div>

      {/* Image Preview */}
      {formData.image && (
        <div>
          <label className="block text-sm font-medium text-dark mb-2">
            Image Preview
          </label>
          <div className="relative h-48 w-full overflow-hidden rounded-lg border border-gray-300">
            <img
              src={formData.image}
              alt="Product preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="hidden absolute inset-0 bg-gray-100 items-center justify-center">
              <span className="text-gray-500">Invalid image URL</span>
            </div>
          </div>
        </div>
      )}

      {/* Submit Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-green text-light py-3 px-6 rounded-lg hover:bg-green/90 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-light mr-2"></div>
              {isEdit ? 'Updating...' : 'Creating...'}
            </span>
          ) : (
            isEdit ? 'Update Product' : 'Create Product'
          )}
        </button>
        
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 bg-gray-200 text-dark py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
