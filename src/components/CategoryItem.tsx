export type NoteCategory = 'Personal' | 'Work' | 'Study' | 'Other';

interface CategoryProps {
    category: NoteCategory,
}

export const CATEGORY_COLORS: Record<NoteCategory, string> = {
    Personal: '#ffeb3b', 
    Work: '#2196f3',
    Study: '#4caf50',
    Other: '#e0e0e0'
};

export const CategoryItem: React.FC<CategoryProps> = ({ category }) => {
    return (
        <span
            className="category-badge selected"
            style={{ backgroundColor: CATEGORY_COLORS[category] }}
        >
            {category}
        </span>
    )
};