import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-dark text-light shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green rounded-lg flex items-center justify-center">
              <span className="text-light font-bold text-lg">P</span>
            </div>
            <span className="text-xl font-bold">Product Manager</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/" 
              className="text-light hover:text-beige transition-colors font-medium"
            >
              Products
            </Link>
            <Link 
              href="/products/new" 
              className="bg-green text-light px-4 py-2 rounded-lg hover:bg-green/90 transition-colors font-medium"
            >
              Add Product
            </Link>
          </nav>
          
          {/* Mobile menu button */}
          <button className="md:hidden text-light hover:text-beige transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
