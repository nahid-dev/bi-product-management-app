'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Input from './Input.jsx';
import Textarea from './Textarea.jsx';
import Select from './Select.jsx';

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
    { value: 'Electronics', label: 'Electronics' },
    { value: 'Clothing', label: 'Clothing' },
    { value: 'Accessories', label: 'Accessories' },
    { value: 'Food & Beverage', label: 'Food & Beverage' },
    { value: 'Home & Office', label: 'Home & Office' }
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
      <Input
        name="name"
        label="Product Name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter product name"
        error={errors.name}
        required
      />

      {/* Description */}
      <Textarea
        name="description"
        label="Description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Enter product description"
        error={errors.description}
        required
        rows={4}
      />

      {/* Price and Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          name="price"
          label="Price (USD)"
          type="number"
          value={formData.price}
          onChange={handleChange}
          step="0.01"
          min="0"
          placeholder="0.00"
          error={errors.price}
          required
        />

        <Select
          name="category"
          label="Category"
          value={formData.category}
          onChange={handleChange}
          options={categories}
          placeholder="Select a category"
          error={errors.category}
          required
        />
      </div>

      {/* Image URL */}
      <Input
        name="image"
        label="Image URL"
        type="url"
        value={formData.image}
        onChange={handleChange}
        placeholder="https://example.com/image.jpg"
        error={errors.image}
        required
      />

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
