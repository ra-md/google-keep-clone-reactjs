import "@testing-library/jest-dom";
import { render, screen, userEvent } from "~/utils/test-utils";
import UpdateNote from "../UpdateNote";

const note = {
	noteName: 'note 1 name',
	noteText: 'note 1 text',
	id: "1",
	labelIds: []
}

describe('UpdateNote', () => {
	beforeEach(() => {
		render(<UpdateNote note={note} openUpdateNote={true} onOpenChange={() => null}/>)
	})

	it('should disable update button if title input and text input are empty', () => {
		userEvent.clear(screen.getByDisplayValue(note.noteName))
		userEvent.clear(screen.getByDisplayValue(note.noteText))

		expect(screen.getByRole('button', { name: "update note" })).toBeDisabled()
	})
})
