import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import notes from "../dummy_notes";
import NoteItem from "./NoteItem";

import { Link } from "react-router-dom";

const Notes = ({ notes }) => {
  const [showsSearch, setShowSearch] = useState(false);
  const [text, setText] = useState("");
  const [filteredNotes, setFilteredNotes] = useState(notes);
  const handleSearch = () => {
    setFilteredNotes(
      notes.filter((note) => {
        if (note.title.toLowerCase().match(text.toLowerCase())) {
          return note;
        }
      })
    );
  };

  useEffect(handleSearch, [text]);

  return (
    <section className="container">
      <header className="notes-header">
        {!showsSearch && <h2>Notlarım</h2>}
        {showsSearch && (
          <input
            type="text"
            placeholder="Aramak İstediğiniz Kelimeyi Giriniz"
            onChange={(e) => {
              setText(e.target.value);
              handleSearch();
            }}
          />
        )}

        <button
          className="btn"
          onClick={() => setShowSearch((prevState) => !prevState)}
        >
          {showsSearch ? <IoClose /> : <IoSearchOutline />}
        </button>
      </header>

      <div className="notes-container">
        {filteredNotes.length == 0 && (
          <p className="empty_notes">Not Eklemek İster Misiniz?</p>
        )}
        {filteredNotes.map((note) => (
          <NoteItem key={note.id} note={note} />
        ))}
      </div>
      <Link className="btn add-btn" to="create-note">
        <FiPlus />
      </Link>
    </section>
  );
};

export default Notes;
