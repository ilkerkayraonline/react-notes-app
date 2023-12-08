import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { v4 as uuid } from "uuid";
import useCreateDate from "../components/useCreateDate";

const CreateNote = ({setNotes}) => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const date = useCreateDate()
  console.log(date)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    if(title && details){
      const note={
        id:uuid(),
        title,
        details,
        date,
      }

      //! NOTLARI NOTLAR DİZİSİNE EKLEME
      setNotes((prevNotes)=> [note, ...prevNotes]);
      //console.log(note)
      navigate("/")

    }
  }
  
  return (
    <section>
      <header className="create-note-header">
        <Link to={"/"} className="btn">
          <IoIosArrowBack />
        </Link>
        <button className="btn lg primary" onClick={handleSubmit} >
          Kaydet
        </button>
      </header>
      <form className="create-note-form" onClick={handleSubmit} >
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

export default CreateNote;
