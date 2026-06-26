import { useState } from "react";
import { NoteItem, Note } from "./NoteItem";
import Modal from "react-modal";
import { NoteModal } from "./NoteModal";

Modal.setAppElement('#root');

const NotesForm = () => {
    const [items, setItems] = useState<Note[]>([]);
    const [noteTitle, setNoteTitle] = useState<string>("");
    const [noteText, setNoteText] = useState<string>("");

    const [isModalOpen, setisModalOpen] = useState<boolean>(false);
    const [selectedNote, setselectedNote] = useState<Note | null>(null);

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

    const openModal = (note: Note) => {
        setselectedNote(note);
        setisModalOpen(true);
    };

    const closeModal = () => {
        setisModalOpen(false);
        setselectedNote(null);
    }

    const handleUpdateNote = (
        id: string,
        updatedTitle: string,
        updatedText: string
    ) => {
        setItems(prevItems =>
            prevItems.map(item => {
                if (item.id === id) {
                    return {
                        ...item,
                        title: updatedTitle.trim() !== "" ? updatedTitle : undefined,
                        text: updatedText,
                        updatedAt: new Date().toLocaleDateString('he-IL'),
                    };
                }
                return item;
            })
        )

        closeModal();
    }

    return (
        <div className="notes-app">
            <h1 className="notes-app-title">Quick Notes</h1>

            <div className="notes-form">
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
                <div className="notes-action">
                    <button onClick={handleAddItem}>Add</button>
                </div>
            </div>
            
            <div className="notes-grid">
                {items.map((item) => (
                    <NoteItem
                        key={item.id}
                        note={item}
                        onDelete={deleteItem}
                        onSelect={openModal}
                    />
                ))}
            </div>

            <NoteModal 
                isOpen={isModalOpen}
                note={selectedNote}
                onClose={closeModal}
                onUpdate={handleUpdateNote}
            />        
        </div>
    )
};

export default NotesForm;