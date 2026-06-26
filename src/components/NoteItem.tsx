export interface Note {
    id: string;
    title?: string,
    text: string;
    createdAt: string;
    updatedAt?: string;
}

interface NoteItemProps {
    note: Note;
    onDelete: (id: string) => void;
    onSelect: (note: Note) => void;
}

export const NoteItem: React.FC<NoteItemProps> = ({ note, onDelete, onSelect }) => {
    return (
        <div className="note-card" onClick={() => onSelect(note)}>
            <p className="note-meta">{note.createdAt}</p>
            {note.title && (
                <h4>{note.title}</h4>
            )}
            <p className="note-text">{note.text}</p>
            <button className="note-delete-btn" onClick={() => onDelete(note.id)}>
                ×
            </button>
        </div>
    )
};
