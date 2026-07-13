"use client";
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { fetchNotes, togglePin } from '@/api/notesApi';
import { useDashboard } from '@/context/DashboardContext';

export default function DashboardPage() {
  const router = useRouter();
  const { searchQuery, sortOrder } = useDashboard();
  const [notes, setNotes] = useState([]);
  const [tagFilter, setTagFilter] = useState('');
  const [fetchError, setFetchError] = useState(false);

  const loadNotes = useCallback(async () => {
    try {
      setFetchError(false);
      const res = await fetchNotes(searchQuery, tagFilter, sortOrder);
      setNotes(res.data);
    } catch (err) {
      console.error("Failed to load notes", err);
      setFetchError(true);
    }
  }, [searchQuery, tagFilter, sortOrder]);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  const handleTogglePin = async (id, e) => {
    e.stopPropagation();
    
    // Optimistic UI Update
    setNotes(prev => prev.map(n => n._id === id ? { ...n, pinned: !n.pinned } : n));
    
    try {
      await togglePin(id);
    } catch (err) {
      console.error(err);
      // Revert on failure
      setNotes(prev => prev.map(n => n._id === id ? { ...n, pinned: !n.pinned } : n));
    }
  };

  const handleOpenNote = (id) => {
    router.push(`/dashboard/note/${id}`);
  };

  const pinnedNotes = notes.filter(n => n.pinned && !n.archived);
  const generalNotes = notes.filter(n => !n.pinned && !n.archived);
  const allTags = [...new Set(notes.flatMap(n => n.tags))];

  if (fetchError) {
    return (
      <div className="p-[var(--spacing-margin-desktop)] h-full flex flex-col items-center justify-center mt-20">
        <span className="material-symbols-outlined text-4xl text-[color:var(--color-error)] mb-2">cloud_off</span>
        <h2 className="font-headline-md text-[length:var(--text-headline-md)] text-[color:var(--color-error)]">Cannot connect to the Archives.</h2>
        <p className="font-body-md text-[length:var(--text-body-md)] text-[color:var(--color-on-surface-variant)] mt-2">Please contact the head librarian.</p>
        <button onClick={loadNotes} className="mt-6 px-4 py-2 font-label-md text-[length:var(--text-label-md)] bg-[color:var(--color-surface-container-high)] border border-[color:var(--color-outline)] hover:bg-[color:var(--color-surface-container-highest)]">
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Tag Filter Row */}
      {allTags.length > 0 && (
        <div className="px-[var(--spacing-margin-desktop)] py-4 flex gap-3 overflow-x-auto border-b border-[color:var(--color-manila-border)] bg-[color:var(--color-surface-container-low)] shadow-sm shrink-0 sticky top-0 z-10">
          <button 
            onClick={() => setTagFilter('')}
            className={`px-3 py-1 bg-[color:var(--color-surface-lowest)] border border-[color:var(--color-outline-variant)] font-label-md text-[length:var(--text-label-md)] text-[color:var(--color-on-surface)] shadow-[2px_2px_0px_rgba(45,45,45,0.1)] hover:bg-[color:var(--color-surface-container-high)] transition-colors whitespace-nowrap ${tagFilter === '' ? 'ring-2 ring-primary' : ''}`}
          >
            all
          </button>
          {allTags.map(tag => (
            <button 
              key={tag}
              onClick={() => setTagFilter(tag)}
              className={`px-3 py-1 bg-[color:var(--color-surface-lowest)] border border-[color:var(--color-outline-variant)] font-label-md text-[length:var(--text-label-md)] text-[color:var(--color-on-surface)] shadow-[2px_2px_0px_rgba(45,45,45,0.1)] hover:bg-[color:var(--color-surface-container-high)] transition-colors whitespace-nowrap ${tagFilter === tag ? 'ring-2 ring-[color:var(--color-primary)]' : ''}`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Main Grid Canvas */}
      <div className="p-[var(--spacing-margin-desktop)] min-h-full">
        {pinnedNotes.length > 0 && (
          <div className="mb-8">
            <h2 className="font-headline-sm text-[length:var(--text-headline-sm)] text-[color:var(--color-on-surface-variant)] mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">push_pin</span>
              Pinned
            </h2>
            <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-[var(--spacing-gutter)]">
              {pinnedNotes.map((note, index) => (
                <NoteCard key={note._id} note={note} index={index} onOpen={() => handleOpenNote(note._id)} onTogglePin={handleTogglePin} />
              ))}
            </div>
          </div>
        )}

        <div>
          {pinnedNotes.length > 0 && (
            <h2 className="font-headline-sm text-[length:var(--text-headline-sm)] text-[color:var(--color-on-surface-variant)] mb-4">General</h2>
          )}
          {generalNotes.length === 0 ? (
            <p className="text-center text-gray-600 mt-10">No notes found.</p>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-[var(--spacing-gutter)]">
              {generalNotes.map((note, index) => (
                <NoteCard key={note._id} note={note} index={index} onOpen={() => handleOpenNote(note._id)} onTogglePin={handleTogglePin} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function NoteCard({ note, onOpen, onTogglePin, index = 0 }) {
  return (
    <div 
      onClick={onOpen}
      className="opacity-0 animate-slide-up relative bg-[color:var(--color-primary-container)] border border-[color:var(--color-manila-border)] p-[var(--spacing-card-padding)] card-lift shadow-[0_2px_0_rgba(45,45,45,0.1)] cursor-pointer overflow-hidden min-h-[250px] flex flex-col group transition-all duration-200 hover:-translate-y-1 hover:border-outline"
      style={{ backgroundColor: note.color !== '#FFFFFF' ? note.color : undefined, animationDelay: `${index * 0.05}s` }}
    >
      {note.pinned && (
        <div className="absolute top-[-10px] right-4 z-10 cursor-pointer hover:scale-110 transition-transform" onClick={(e) => onTogglePin(note._id, e)}>
          <div className="transform rotate-12 drop-shadow-sm">
            <Image src="/images/paperclip.png" alt="Pinned" width={48} height={48} className="object-contain mix-blend-multiply" />
          </div>
        </div>
      )}
      {!note.pinned && (
        <div className="absolute top-[-10px] right-4 z-10 opacity-0 group-hover:opacity-50 transition-opacity cursor-pointer hover:scale-110" onClick={(e) => onTogglePin(note._id, e)}>
          <div className="transform rotate-12">
            <Image src="/images/paperclip.png" alt="Pin Note" width={48} height={48} className="object-contain mix-blend-multiply grayscale" />
          </div>
        </div>
      )}
      
      <div className="absolute top-4 left-4 w-3 h-3 rounded-full border border-[color:var(--color-manila-border)] bg-[color:var(--color-surface-lowest)] shadow-inner"></div>
      
      <div className="absolute top-0 right-0 w-1 h-full bg-[color:var(--color-primary)] opacity-80"></div>
      
      <div className="pl-6 mb-3">
        <h3 
          className="font-headline-md text-[length:var(--text-headline-md)] line-clamp-2"
          style={{ color: getContrastColor(note.color) || 'var(--color-ink-blue)' }}
        >
          {note.title}
        </h3>
      </div>
      <div className="flex-1 ruled-bg pt-[5px]">
        <p 
          className="font-body-md text-[length:var(--text-body-md)] leading-[24px] line-clamp-5 whitespace-pre-wrap"
          style={{ color: getContrastColor(note.color) || 'var(--color-on-surface)' }}
        >
          {note.content}
        </p>
      </div>
      <div className="mt-4 flex justify-between items-end border-t border-[color:var(--color-manila-border)] pt-2 relative">
        <span className="font-timestamp text-[length:var(--text-timestamp)] text-[color:var(--color-outline)]">
          {new Date(note.updatedAt).toLocaleDateString()}
        </span>
        <div className="flex gap-1 flex-wrap justify-end max-w-[60%]">
          {note.tags.map(tag => (
            <span key={tag} className="font-label-md text-[length:var(--text-label-md)] bg-[color:var(--color-surface-lowest)] px-2 border border-[color:var(--color-outline-variant)] truncate">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// Helper to ensure text is readable against the background color
function getContrastColor(hexcolor) {
  if (!hexcolor || hexcolor === '#FFFFFF') return undefined; // Fallback to CSS classes
  
  // Expand short hex codes
  if (hexcolor.length === 4) {
    hexcolor = '#' + hexcolor[1] + hexcolor[1] + hexcolor[2] + hexcolor[2] + hexcolor[3] + hexcolor[3];
  }
  
  // Convert to RGB
  const r = parseInt(hexcolor.slice(1, 3), 16);
  const g = parseInt(hexcolor.slice(3, 5), 16);
  const b = parseInt(hexcolor.slice(5, 7), 16);
  
  // Get YIQ ratio
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  
  // If color is dark, return very light manila. If color is light, return very dark ink.
  return (yiq >= 128) ? '#1C1B1A' : '#F6F3F2';
}
