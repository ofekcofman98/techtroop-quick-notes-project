import { useState } from "react";
import { NoteItem, Note } from "./NoteItem";

const NotesForm = () => {
    const [items, setItems] = useState<Note[]>([]);
    const [noteTitle, setNoteTitle] = useState<string>("");
    const [noteText, setNoteText] = useState<string>("");

    const updateNoteText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNoteText(event.target.value);
    };

    const updateNoteTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNoteTitle(event.target.value);
    };

    const handleAddItem = () => {
        if (noteText.trim() === "") return;

        const newNote: Note = {
            id: crypto.randomUUID(),
            title: noteTitle,
            text: noteText,
            createdAt: new Date().toLocaleDateString('he-IL')
        }

        setItems(prevItems => [...prevItems, newNote]);

        console.log("new note:", newNote.text);
        setNoteText("");
        setNoteTitle("");
    }

    const deleteItem = (idToDelete: string) => {
        const isConfirmed = window.confirm("Are you sure you want to delete your note?");

        if (isConfirmed) {
            setItems(prevItems => 
                prevItems.filter(item => item.id !== idToDelete)
            );
        }
    }

    return (
        <div style={{ padding: '20px' }}>
            <input 
                type="text" 
                placeholder="Note title"
                value={noteTitle}
                onChange={updateNoteTitle}/>
            <textarea 
                placeholder="Your notes..."
                value={noteText}
                onChange={updateNoteText}
            />
            <button onClick={handleAddItem}>Add</button>
            
            <div className="notes-grid" style={{display: "grid",gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '20px'}}>
                {items.map((item) => (
                    <NoteItem
                        key={item.id}
                        note={item}
                        onDelete={deleteItem}
                    />
                ))}
            </div>
        </div>
    )
};

export default NotesForm;