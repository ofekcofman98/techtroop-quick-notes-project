import { CATEGORY_COLORS, NoteCategory } from "./CategoryItem";

interface FilterSectionProps {
    searchValue: string;
    selectedCategories: NoteCategory[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onCategoryChange: (categories: NoteCategory[]) => void;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
    searchValue,
    selectedCategories,
    onChange,
    onCategoryChange
}) => {
    const categories = Object.keys(CATEGORY_COLORS) as NoteCategory[];

    const toggleCategory = (category: NoteCategory) => {
        if (selectedCategories.includes(category)) {
            onCategoryChange(selectedCategories.filter(c => c !== category));
        } else {
            onCategoryChange([...selectedCategories, category]);
        }
    };

    const isAll = selectedCategories.length === 0;

    return (
        <div className="filter-section" style={{ margin: '20px 0', padding: '15px', background: '#f5f5f5', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ margin: 0 }}>Filter & Search Notes</h3>
            <input
                type="text"
                onChange={onChange}
                value={searchValue}
                placeholder="Search Notes..."
                style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    boxSizing: 'border-box',
                    background: '#ffffff',
                    fontSize: '14px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
                }}
            />
            <div className="category-badges">
                <button
                    type="button"
                    className={`category-badge${isAll ? ' selected' : ''}`}
                    style={{ backgroundColor: '#9e9e9e' }}
                    onClick={() => onCategoryChange([])}
                >
                    All
                </button>
                {categories.map(category => (
                    <button
                        key={category}
                        type="button"
                        className={`category-badge${selectedCategories.includes(category) ? ' selected' : ''}`}
                        style={{ backgroundColor: CATEGORY_COLORS[category] }}
                        onClick={() => toggleCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
}; 