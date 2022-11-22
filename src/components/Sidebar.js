function Sidebar(props) {
	const noteElements = props.notes.map((note, index) => (
		<li
			key={note.id}
			className={`notes__list-item ${
				note.id === props.currentNote.id ? "notes__list-item--selected" : ""
			}`}
			onClick={() => props.setCurrentNoteId(note.id)}
		>
			<h4 className="notes__text-snippet">{note.body.split("\n")[0]}</h4>
			<button
				className="notes__delete-button"
				onClick={(event) => props.deleteNote(event, note.id)}
			>
				<i className="gg-trash trash-icon"></i>
			</button>
		</li>
	));

	return (
		<section className="sidebar">
			<div className="sidebar__header">
				<h3 className="sidebar__heading">Notes</h3>
				<button className="sidebar__new-note-button" onClick={props.newNote}>
					+
				</button>
			</div>
			<ul className="notes__list">{noteElements}</ul>
		</section>
	);
}

export default Sidebar;
