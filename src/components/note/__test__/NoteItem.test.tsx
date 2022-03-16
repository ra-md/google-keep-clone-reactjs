import { render, screen, userEvent } from "~/utils/test-utils";
import NoteItem from "../NoteItem";

const note = {
	noteName: 'note 1 name',
	noteText: 'note 1 text',
	id: "1",
	labelIds: []
}

describe('NoteItem', () => {
	it('should render note correctly', () => {
		render(<NoteItem note={note} />)
	})
})
