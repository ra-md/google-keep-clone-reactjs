import { Note } from "~/types"

export function filterNotes(notes: Note[], query: string) {
  return Array.from(
    new Set([
      ...notes.filter(({ noteName }) => noteName?.includes(query)),
      ...notes.filter(({ noteText }) => noteText?.includes(query)),
    ])
  )
}