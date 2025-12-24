import css from "./App.module.css";
import { useState, useEffect } from "react";
import SearchBox from "../SearchBox/SearchBox";
import { useDebouncedCallback } from "use-debounce";
import NoteList from "../NoteList/NoteList";
import toast from "react-hot-toast";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../services/noteService";
import Modal from "../Modal/Modal";
import Pagination from "../Pagination/Pagination";
import NoteForm from "../NoteForm/NoteForm";

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isFetching, isSuccess, isError } = useQuery({
    queryKey: ["notes", page, query],
    queryFn: () => fetchNotes(page, query),
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes ?? [];
  const totalPage = data?.totalPages ?? 0;
  const hasPending = isLoading || isFetching;

  useEffect(() => {
    if (isSuccess && notes.length === 0) {
      toast.error("No notes");
    }
  }, [isSuccess, notes.length]);

  useEffect(() => {
    if (isError) {
      toast.error("Failed to load notes");
    }
  }, [isError]);

  const handleChangeQuery = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPage(1);
      setQuery(event.target.value);
    },
    600
  );

  function openModal(): void {
    setIsModalOpen(true);
  }

  function closeModal(): void {
    setIsModalOpen(false);
  }

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleChangeQuery} />
        {totalPage > 1 && (
          <Pagination page={page} totalPages={totalPage} setPage={setPage} />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {hasPending && <p>Loading...</p>}
      {notes.length > 0 && <NoteList notes={notes} />}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onCloseModal={closeModal} />
        </Modal>
      )}
    </div>
  );
}
