interface Note {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  content: string;
  tag: Tag;
}

type Tag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

interface NoteForm {
  title: string;
  content: string;
  tag: Tag;
}

export type { Note, Tag, NoteForm };
