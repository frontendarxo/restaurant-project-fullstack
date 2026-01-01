import './style.css';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  const handleCategoryClick = (category: string) => {
    onCategoryChange(category);
  };

  return (
    <div className="category-filter">
      <button
        className={`category-button ${selectedCategory === 'all' ? 'active' : ''}`}
        onClick={() => handleCategoryClick('all')}
      >
        Все
      </button>
      {categories.map((category) => (
        <button
          key={category}
          className={`category-button ${selectedCategory === category ? 'active' : ''}`}
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

