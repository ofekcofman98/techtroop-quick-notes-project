export interface Note {
    id: string;
    title?: string,
    text: string;
    createdAt: string;
}

interface NoteItemProps {
    note: Note;
    onDelete: (id: string) => void;
}

export const NoteItem: React.FC<NoteItemProps> = ({ note, onDelete }) => {
    return (
        <div>
            <p>{note.createdAt}</p>
            {note.title && (
                <h4>{note.title}</h4>
            )}
            <p>{note.text}</p>
            <br />
            <button
                onClick={() => onDelete(note.id)}
            >
                X
            </button>
        </div>
    )
};
