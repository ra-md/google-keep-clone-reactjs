import Masonry from "react-masonry-component";
import NoteItem from "./NoteItem";
import { Note } from "~/types";
import { useEffect, useRef, useState } from "react";
import Spinner from "~/components/ui/Spinner";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const loadingRef = useRef<HTMLHeadingElement>(null);
  const [inc, setInc] = useState(12);

  if (notes.length === 0) {
    return <h1 className="text-center mt-8">Notes you add appear here</h1>;
  }

  useEffect(() => {
    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setInc((inc) => inc + 12);
        }
      });
    };

    let observer = new IntersectionObserver(callback, {
      root: null,
      threshold: 1.0,
      rootMargin: "0px",
    });

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }
  }, []);

  return (
    <>
      <Masonry
        className={"note-list"}
        elementType={"ul"}
        options={{
          columnWidth: 60,
          gutter: 5,
          fitWidth: true,
        }}
      >
        {notes.slice(0, inc).map((note: Note) => {
          return <NoteItem key={note.id} note={note} />;
        })}
      </Masonry>
      {notes.length > 12 && inc < notes.length && (
        <div ref={loadingRef} className="mb-4">
          <Spinner />
        </div>
      )}
    </>
  );
}
