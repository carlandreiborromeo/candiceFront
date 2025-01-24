import { useState } from "react";
import "./CSS/notes.css";


function StickyNotes() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [username, setUsername] = useState("");
  const [newName, setNewName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSetName = () => {
    if (newName) {
      setUsername(newName);
      setNewName("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !newNote) {
      alert("Please provide both a name and a message.");
      return;
    }

    const noteData = {
      name: username,
      message: newNote,
    };

    try {
      const response = await fetch(
        "https://noted-cdfhhbhjahf5exgv.southeastasia-01.azurewebsites.net/Votes", // Replace with your actual backend API URL
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(noteData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit the note.");
      }

      const result = await response.json();
      console.log(result.msg);

      // Add the note to the local list for immediate feedback
      const colors = ["#FFDDC1", "#FFABAB", "#FFC3A0", "#D4A5A5", "#E2F0CB", "#A0E7E5", "#B4F8C8", "#FFAEBC"];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      setNotes([...notes, { ...noteData, color: randomColor }]);
      setNewNote("");
      setSubmitted(true);
    } catch (error) {
      alert("An error occurred while submitting your note. Please try again later.");
      console.error(error);
    }
  };

  return (
    <div className="notes-container">
      <h1>Sticky Notes</h1>
      <div className="name-box">
        <input
          type="text"
          placeholder="Enter your name..."
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button onClick={handleSetName}>Set Name</button>
      </div>
      <div className="notes-box">
        <h2>Welcome, {username || "Please set your name first"}</h2>
        <textarea
          placeholder="Write a note..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <div className="button-group">
          <button
            onClick={handleSubmit}
            disabled={!username}
            className={!username ? "disabled-button" : ""}
          >
            Submit Note
          </button>
        </div>
        <div className="notes-display">
          {notes.map((note, index) => (
            <div
              key={index}
              className="note"
              style={{ backgroundColor: note.color }}
            >
              <strong>{note.name}:</strong> {note.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StickyNotes;
