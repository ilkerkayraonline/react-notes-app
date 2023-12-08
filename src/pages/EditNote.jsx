import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineDeleteOutline } from "react-icons/md";
import useCreateDate from "../components/useCreateDate";

const EditNote = ({ notes, setNotes }) => {
  const { id } = useParams();
  const note = notes.find((item) => item.id == id);
  //console.log(note)

  const [title, setTitle] = useState(note.title);
  const [details, setDetails] = useState(note.details);
  const date = useCreateDate();
  const navigate = useNavigate();

  //! TİTLE VE DETAIL DEĞİŞTİĞİNDE ÇALIŞIR
  const handleForm = (e) => {
    e.preventDefault();
    if (title && details) {
      const newNote = { ...note, title, details, date };
      const newNotes = notes.map((item) => {
        if (item.id == id) {
          item = newNote;
        }
        return item;
      });

      setNotes(newNotes);
    } else {
      return;
    }
    navigate("/");
  };

  //! NOTU SİLME
  const handleDelete = () => {
    if (window.confirm("Silmek İstediğinize Emin Misiniz?")) {
      const newNotes = notes.filter((item) => item.id != id);
      setNotes(newNotes);
      navigate("/");
    }
  };

  return (
    <section>
      <header className="create-note-header">
        <Link to="/" className="btn btn-edit-note">
          <IoIosArrowBack />
        </Link>
        <button className="btn lg primary" onClick={handleForm}>
          Kaydet
        </button>
        <button className="btn lg delete" onClick={handleDelete}>
          <MdOutlineDeleteOutline />
        </button>
      </header>
      <form className="create-note-form" onSubmit={handleForm}>
        <input
          type="text"
          placeholder="Başlık"
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          rows="28"
          placeholder="Not detayı..."
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        ></textarea>
      </form>
    </section>
  );
};

export default EditNote;
