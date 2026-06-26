import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Note } from "./NoteItem";

interface NoteModalProps {
    isOpen: boolean;
    note: Note | null;
    onClose: () => void;
    onUpdate: (id: string, updatedTitle: string, updatedText: string) => void;
}

export const NoteModal: React.FC<NoteModalProps> = ({ 
        isOpen, 
        note, 
        onClose, 
        onUpdate 
    }) => {
        const [editTitle, setEditTitle] = useState<string>("");
        const [editText, setEditText] = useState<string>("");

        useEffect(() => {
            if (note) {
                setEditTitle(note.title || "");
                setEditText(note.text);
            }
        }, [note]);

        const handleSave = () => {
            if (!note || editText.trim() === "") return;
            onUpdate(note.id, editTitle, editText);
        };

        return (
                <Modal
                    isOpen={isOpen}
                    onRequestClose={onClose}
                    contentLabel="Note Details"
                    className="note-modal"
                    overlayClassName="note-modal-overlay"
                >
                    {note && (
                        <div className="note-modal-form">
                            <p className="note-modal-created">Created: {note.createdAt}</p>
                            <input 
                                type="text" 
                                value={editTitle} 
                                onChange={(e) => setEditTitle(e.target.value)} 
                            />
                            <textarea 
                                value={editText} 
                                onChange={(e) => setEditText(e.target.value)} 
                            />
                            <div className="note-modal-actions">
                                <button onClick={handleSave}>Update</button>
                            </div>
                        </div>
                    )}
            </Modal>
        )
}