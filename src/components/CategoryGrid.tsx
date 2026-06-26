import React from "react";
import { CATEGORY_COLORS, type NoteCategory } from "./CategoryItem";

interface CategoryGridProps {
    selectedCategory: NoteCategory | null;
    onSelectCategory: (category: NoteCategory) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ selectedCategory, onSelectCategory }) => {
    const categories = Object.keys(CATEGORY_COLORS) as NoteCategory[];

    return (
        <div className="category-badges">
            {categories.map((category) => (
                <button
                    key={category}
                    type="button"
                    className={`category-badge${selectedCategory === category ? ' selected' : ''}`}
                    style={{ backgroundColor: CATEGORY_COLORS[category] }}
                    onClick={() => onSelectCategory(category)}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};
