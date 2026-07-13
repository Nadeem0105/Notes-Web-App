"use client";
import { useState, useEffect, useCallback } from 'react';
import { fetchArchivedNotes, restoreNote, deleteNote } from '@/api/notesApi';
import { useDashboard } from '@/context/DashboardContext';

export default function ArchivePage() {
  const { searchQuery, sortOrder } = useDashboard();
  const [notes, setNotes] = useState([]);
  const [fetchError, setFetchError] = useState(false);

  const loadNotes = useCallback(async () => {
    try {
      setFetchError(false);
      const res = await fetchArchivedNotes();
      let data = res.data;
      if (searchQuery) {
        data = data.filter(n => n.title.includes(searchQuery) || n.content.includes(searchQuery));
      }
      setNotes(data);
    } catch (err) {
      console.error("Failed to load archived notes", err);
      setFetchError(true);
    }
  }, [searchQuery, sortOrder]);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  const handleRestore = async (id, e) => {
    e.stopPropagation();
    
    // Optimistic UI Update
    const previousNotes = [...notes];
    setNotes(prev => prev.filter(n => n._id !== id));
    
    try {
      await restoreNote(id);
    } catch (err) {
      console.error(err);
      setNotes(previousNotes); // Revert
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    
    // Optimistic UI Update
    const previousNotes = [...notes];
    setNotes(prev => prev.filter(n => n._id !== id));
    
    try {
      await deleteNote(id);
    } catch (err) {
      console.error(err);
      setNotes(previousNotes); // Revert
    }
  };

  return (
    <div className="max-w-[1280px] mx-auto p-[var(--spacing-margin-desktop)] min-h-full">
      <div className="mb-8 flex items-center justify-between">
        <p className="font-body-lg text-[length:var(--text-body-lg)] text-[color:var(--color-on-surface-variant)]">Reviewing out-of-circulation records.</p>
        <span className="font-timestamp text-[length:var(--text-timestamp)] text-[color:var(--color-outline)]">Total Items: {notes.length}</span>
      </div>
      
      {fetchError ? (
        <div className="text-center py-20 flex flex-col items-center">
          <span className="material-symbols-outlined text-4xl text-[color:var(--color-error)] mb-2">cloud_off</span>
          <h2 className="font-headline-md text-[length:var(--text-headline-md)] text-[color:var(--color-error)]">Cannot connect to the Archives.</h2>
          <button onClick={loadNotes} className="mt-6 px-4 py-2 font-label-md text-[length:var(--text-label-md)] bg-[color:var(--color-surface-container-high)] border border-[color:var(--color-outline)]">
            Retry Connection
          </button>
        </div>
      ) : notes.length === 0 ? (
        <div className="text-center py-20 text-[color:var(--color-outline)] font-headline-sm">The archive is empty.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--spacing-gutter)]">
          {notes.map((note, index) => (
            <article key={note._id} className="bg-[color:var(--color-primary-container)] border border-[color:var(--color-manila-border)] p-[var(--spacing-card-padding)] relative group hover:-translate-y-1 hover:border-[color:var(--color-outline)] transition-all duration-200 shadow-[2px_2px_0px_0px_rgba(45,45,45,0.1)] flex flex-col min-h-[250px]">
              <div className="absolute inset-0 ruled-bg opacity-50 pointer-events-none"></div>
              <div className="absolute top-0 left-0 bottom-0 w-1 bg-[color:var(--color-tertiary)]"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-timestamp text-[length:var(--text-timestamp)] text-[color:var(--color-on-surface-variant)]">
                    {new Date(note.updatedAt).toLocaleDateString()}
                  </span>
                  {note.tags.length > 0 && (
                    <div className="px-2 py-1 bg-[color:var(--color-surface)] border border-[color:var(--color-outline-variant)] font-label-md text-[length:var(--text-label-md)] text-[color:var(--color-on-surface-variant)] rounded-sm shadow-sm truncate max-w-[100px]">
                      {note.tags[0]}
                    </div>
                  )}
                </div>
                <h2 className="font-headline-md text-[length:var(--text-headline-md)] text-[color:var(--color-on-surface)] mb-2 line-clamp-2">{note.title}</h2>
                <p className="font-body-md text-[length:var(--text-body-md)] text-[color:var(--color-on-surface-variant)] flex-grow line-clamp-4">
                  {note.content}
                </p>

                {/* ARCHIVED Stamp */}
                <div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-headline-lg text-[length:var(--text-headline-lg)] font-bold px-4 py-1 pointer-events-none z-20"
                  style={{
                    transform: `rotate(${index % 2 === 0 ? '10deg' : '-5deg'})`,
                    color: '#4e6073',
                    border: '3px solid #4e6073',
                    opacity: 0.8
                  }}
                >
                  ARCHIVED
                </div>
                
                <div className="mt-4 pt-4 border-t border-[color:var(--color-manila-border)] flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={(e) => handleRestore(note._id, e)} className="font-headline-sm text-[length:var(--text-headline-sm)] text-[color:var(--color-primary)] hover:underline flex items-center gap-1 z-30">
                    <span className="material-symbols-outlined text-sm">restore</span> Restore
                  </button>
                  <button onClick={(e) => handleDelete(note._id, e)} className="font-headline-sm text-[length:var(--text-headline-sm)] text-[color:var(--color-tertiary)] hover:underline flex items-center gap-1 z-30">
                    <span className="material-symbols-outlined text-sm">delete_forever</span> Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
