import Link from 'next/link';
import Image from 'next/image';

export default function ProductCard({ product }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Product Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
            product.inStock 
              ? 'bg-green text-light' 
              : 'bg-red text-light'
          }`}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2">
          <span className="text-sm text-beige font-medium">{product.category}</span>
        </div>
        
        <h3 className="text-lg font-semibold text-dark mb-2 line-clamp-2 group-hover:text-green transition-colors">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-green">
            {formatPrice(product.price)}
          </span>
          <span className="text-xs text-gray-500">
            Updated {formatDate(product.updatedAt)}
          </span>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link
            href={`/products/${product.id}`}
            className="flex-1 bg-green text-light text-center py-2 px-3 rounded-lg hover:bg-green/90 transition-colors font-medium text-sm"
          >
            View Details
          </Link>
          <Link
            href={`/products/${product.id}/edit`}
            className="flex-1 bg-beige text-dark text-center py-2 px-3 rounded-lg hover:bg-beige/90 transition-colors font-medium text-sm"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
}
