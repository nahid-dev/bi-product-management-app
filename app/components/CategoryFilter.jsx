export default function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            selectedCategory === category
              ? 'bg-green text-light shadow-lg'
              : 'bg-white text-dark border border-gray-300 hover:bg-beige hover:border-beige'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
