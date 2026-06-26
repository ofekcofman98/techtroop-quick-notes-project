import React from "react";
import { NoteItem, Note } from "./NoteItem";

interface NotesGridProps {
    notes: Note[];
    onDelete: (id: string) => void;
    onSelect: (note: Note) => void;
}

export const NotesGrid: React.FC<NotesGridProps> = ({ notes, onDelete, onSelect }) => {
    if (notes.length === 0) {
        return (
            <div className="no-notes-message" style={{ textAlign: 'center', margin: '20px 0', color: 'gray' }}>
                No notes found...
            </div>
        );
    }

    return (
        <div className="notes-grid" style={{ display: "grid", gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '20px' }}>
            {notes.map((item) => (
                <NoteItem
                    key={item.id}
                    note={item}
                    onDelete={onDelete}
                    onSelect={onSelect}
                />
            ))}
        </div>
    );

    
};
