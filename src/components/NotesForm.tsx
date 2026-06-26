import React, { useEffect, useState } from "react";
import { NoteItem, Note } from "./NoteItem";
import Modal from "react-modal";
import { NoteModal } from "./NoteModal";
import { type NoteCategory } from "./CategoryItem";
import { CategoryGrid } from "./CategoryGrid";
import { FilterSection } from "./FilterSection";
import { NotesGrid } from "./NotesGrid";

Modal.setAppElement('#root');
const LOCAL_STORAGE_KEY = "quick_notes";

const NotesForm = () => {
    const [items, setItems] = useState<Note[]>(() => {
        const savedNotes = localStorage.getItem(LOCAL_STORAGE_KEY);
        return savedNotes ? JSON.parse(savedNotes) : [];
    });

    const [noteTitle, setNoteTitle] = useState<string>("");
    const [noteText, setNoteText] = useState<string>("");
    const [noteCategory, setnoteCategory] = useState<NoteCategory>('Personal');

    const [isModalOpen, setisModalOpen] = useState<boolean>(false);
    const [selectedNote, setselectedNote] = useState<Note | null>(null);

    const [searchInput, setSearchInput] = useState<string>("");
    const [filterCategories, setFilterCategories] = useState<NoteCategory[]>([]);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    },[items]);

    const updateNoteText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNoteText(event.target.value);
    };

    const updateNoteTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNoteTitle(event.target.value);
    };

    const handleInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    };

    const handleAddItem = () => {
        if (noteText.trim() === "") return;

        const newNote: Note = {
            id: crypto.randomUUID(),
            title: noteTitle,
            text: noteText,
            createdAt: new Date().toLocaleDateString('he-IL'),
            category: noteCategory
        }

        setItems(prevItems => [...prevItems, newNote]);

        console.log("new note:", newNote.text);
        setNoteText("");
        setNoteTitle("");
        setnoteCategory("Other");
    }

    const filteredItems = items.filter(item => {
        const matchesSearch = 
            item.text.toLowerCase().includes(searchInput.toLowerCase()) || 
            (item.title && item.title.toLowerCase().includes(searchInput.toLowerCase()));
        const matchesCategory = filterCategories.length === 0 || filterCategories.includes(item.category);

        return matchesSearch && matchesCategory;
    });

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
        updatedText: string,
        updateCategory: NoteCategory
    ) => {
        setItems(prevItems =>
            prevItems.map(item => {
                if (item.id === id) {
                    return {
                        ...item,
                        title: updatedTitle.trim() !== "" ? updatedTitle : undefined,
                        text: updatedText,
                        category: updateCategory,
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
                    <CategoryGrid 
                        selectedCategory={noteCategory} 
                        onSelectCategory={setnoteCategory} 
                    />
                    <button onClick={handleAddItem}>Add</button>
                </div>
            </div>

            <FilterSection
                searchValue={searchInput}
                onChange={handleInputChanged}
                selectedCategories={filterCategories}
                onCategoryChange={setFilterCategories}
            />

            <NotesGrid 
                notes={filteredItems} 
                onDelete={deleteItem} 
                onSelect={openModal} 
            />

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