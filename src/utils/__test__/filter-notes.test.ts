import { filterNotes } from "../filter-notes"

const notes = [
	{
		id: "1",
		noteName: "note 1",
		noteText: "",
		labelIds: []
	},
	{
		id: "2",
		noteName: "",
		noteText: "note 2",
		labelIds: []
	},
	{
		id: "3",
		noteName: "note 2",
		noteText: "note 1",
		labelIds: []
	}
]

describe('filter-notes', () => {
	it('should return filtered notes', () => {
		const filteredNotes = filterNotes(notes, 'note 1')

		expect(filteredNotes).toEqual([notes[0], notes[2]])
	})

	it('should return empty array when the notes is not containing searched text', () => {
		const filteredNotes = filterNotes(notes, 'test 1')

		expect(filteredNotes).toEqual([])
	})
})
