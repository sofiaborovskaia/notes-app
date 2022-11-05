import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import Split from "react-split";
// import { data } from "./data";
import { nanoid } from "nanoid";
import "./style.css";

function App() {
	const [notes, setNotes] = useState(
		() => JSON.parse(localStorage.getItem("notes")) || [],
	);
	const [currentNoteId, setCurrentNoteId] = useState(
		(notes[0] && notes[0].id) || "",
	);

	useEffect(() => {
		localStorage.setItem("notes", JSON.stringify(notes));
	}, [notes]);

	function createNewNote() {
		const newNote = {
			id: nanoid(),
			body: "# Type your markdown note's title here",
		};
		setNotes((prevNotes) => [newNote, ...prevNotes]);
		setCurrentNoteId(newNote.id);
	}

	function updateNote(text) {
		setNotes((prevNotes) => {
			let newArr = [];
			prevNotes.forEach((currentNote) => {
				if (currentNote.id === currentNoteId) {
					newArr.unshift({ ...currentNote, body: text });
				} else {
					newArr.push(currentNote);
				}
			});
			return newArr;
		});
	}

	function deleteNote(event, noteId) {
		event.stopPropagation();
		setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
	}

	function findCurrentNote() {
		return (
			notes.find((note) => {
				return note.id === currentNoteId;
			}) || notes[0]
		);
	}

	return (
		<main>
			{notes.length > 0 ? (
				<Split sizes={[30, 70]} direction="horizontal" className="split">
					<Sidebar
						notes={notes}
						currentNote={findCurrentNote()}
						setCurrentNoteId={setCurrentNoteId}
						newNote={createNewNote}
						deleteNote={deleteNote}
					/>
					{currentNoteId && notes.length > 0 && (
						<Editor currentNote={findCurrentNote()} updateNote={updateNote} />
					)}
				</Split>
			) : (
				<div className="no-notes">
					<img
						className="first-note-img"
						src={require("./images/notebook.png")}
						alt="notebook"
					></img>
					<h1>Welcome to notebook</h1>
					<button className="first-note-btn" onClick={createNewNote}>
						Create one now
					</button>
				</div>
			)}
		</main>
	);
}

export default App;
