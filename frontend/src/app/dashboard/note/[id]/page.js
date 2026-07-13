"use client";
import { useState, useEffect, useCallback, use, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { fetchNote, createNote, updateNote, deleteNote, archiveNote } from '@/api/notesApi';
import debounce from 'lodash/debounce';

export default function NoteDetailPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const router = useRouter();
  const isNew = params.id === 'new';
  
  const noteIdRef = useRef(isNew ? null : params.id);
  const [note, setNote] = useState({ title: '', content: '', tags: [], color: '#FFFFFF', pinned: false });
  const [saveStatus, setSaveStatus] = useState('');
  const [loading, setLoading] = useState(!isNew);

  useEffect(() => {
    if (!isNew) {
      fetchNote(params.id).then(res => {
        setNote(res.data);
        setLoading(false);
      }).catch(err => {
        console.error(err);
        setLoading(false);
      });
    }
  }, [params.id, isNew]);

  const debouncedSave = useCallback(
    debounce(async (data) => {
      setSaveStatus('Saving...');
      try {
        if (!noteIdRef.current) {
          const res = await createNote(data);
          noteIdRef.current = res.data._id;
          router.replace(`/dashboard/note/${res.data._id}`);
        } else {
          await updateNote(noteIdRef.current, data);
        }
        setSaveStatus('Saved');
        setTimeout(() => setSaveStatus(''), 2000);
      } catch (err) {
        setSaveStatus('Error saving');
      }
    }, 800),
    [router]
  );

  const handleChange = (field, value) => {
    const updatedNote = { ...note, [field]: value };
    setNote(updatedNote);
    debouncedSave(updatedNote);
  };

  const handleArchive = async () => {
    if (!isNew) {
      await archiveNote(params.id);
      router.push('/dashboard');
    }
  };

  const handleDelete = async () => {
    if (!isNew) {
      await deleteNote(params.id);
      router.push('/dashboard');
    }
  };

  if (loading) return <div className="p-[var(--spacing-margin-desktop)] font-headline-sm">Retrieving record...</div>;

  return (
    <div className="flex-1 overflow-y-auto p-[var(--spacing-margin-desktop)] flex justify-center items-start min-h-full">
      <div className="w-full max-w-4xl relative mt-8">
        
        {/* Editor Controls Overlay */}
        <div className="absolute -top-12 left-0 right-0 flex justify-between items-center z-20">
          <button onClick={() => router.push('/dashboard')} className="flex items-center gap-1 text-[color:var(--color-primary)] hover:underline font-headline-sm text-[length:var(--text-headline-sm)]">
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Back to Catalog
          </button>
          
          <div className="flex gap-4">
            {!isNew && (
              <>
                <button onClick={handleArchive} className="flex items-center gap-1 text-[color:var(--color-tertiary)] hover:underline font-headline-sm text-[length:var(--text-headline-sm)]">
                  <span className="material-symbols-outlined text-[18px]">inventory_2</span>
                  Archive
                </button>
                <button onClick={handleDelete} className="flex items-center gap-1 text-[color:var(--color-error)] hover:underline font-headline-sm text-[length:var(--text-headline-sm)]">
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                  Delete
                </button>
              </>
            )}
          </div>
        </div>

        {/* The Main Index Card */}
        <article 
          className="opacity-0 animate-scale-in border border-[color:var(--color-manila-border)] card-shadow p-[var(--spacing-card-padding)] min-h-[600px] relative transition-all duration-200"
          style={{ backgroundColor: note.color !== '#FFFFFF' ? note.color : '#Fcf9f8' }}
        >
          {/* Color Tag Edge Stripe */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[color:var(--color-primary)]"></div>

          {/* Header Section */}
          <header className="mb-6 border-b-2 border-[color:var(--color-manila-border)] pb-4 flex flex-col md:flex-row justify-between items-start gap-4">
            <div className="flex-1 w-full">
              <input 
                type="text" 
                value={note.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full bg-transparent border-none focus:ring-0 font-headline-lg text-[length:var(--text-headline-lg)] font-bold p-0 outline-none"
                style={{ 
                  color: getContrastColor(note.color !== '#FFFFFF' ? note.color : '#Fcf9f8') || 'var(--color-on-surface)',
                  '--tw-placeholder-opacity': '0.5'
                }}
                placeholder="Entry Title..."
              />
              <div className="flex items-center gap-4 mt-2">
                <span className="font-timestamp text-[length:var(--text-timestamp)] text-[color:var(--color-outline)] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                  {new Date(note.updatedAt || Date.now()).toLocaleDateString()}
                </span>
                <span className="font-timestamp text-[length:var(--text-timestamp)] text-[color:var(--color-outline)] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">folder_open</span>
                  Active File
                </span>
              </div>
            </div>
            
            {/* Metadata / Controls */}
            <div className="flex flex-col items-end gap-3 w-full md:w-auto">
              <div className="flex gap-2">
                <button onClick={() => handleChange('color', '#a6392e')} className={`w-6 h-6 rounded-full border border-outline bg-[color:var(--color-tertiary)] ${note.color === '#a6392e' ? 'ring-2 ring-offset-2 ring-outline' : ''}`} aria-label="Red"></button>
                <button onClick={() => handleChange('color', '#4e6073')} className={`w-6 h-6 rounded-full border border-outline bg-[color:var(--color-secondary)] ${note.color === '#4e6073' ? 'ring-2 ring-offset-2 ring-outline' : ''}`} aria-label="Blue"></button>
                <button onClick={() => handleChange('color', '#685e31')} className={`w-6 h-6 rounded-full border border-outline bg-[color:var(--color-primary)] ${note.color === '#685e31' ? 'ring-2 ring-offset-2 ring-outline' : ''}`} aria-label="Green"></button>
                <button onClick={() => handleChange('color', '#FFFFFF')} className={`w-6 h-6 rounded-full border border-outline bg-white ${note.color === '#FFFFFF' ? 'ring-2 ring-offset-2 ring-outline' : ''}`} aria-label="White"></button>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[color:var(--color-outline)] text-[18px]">sell</span>
                <input 
                  type="text" 
                  placeholder="Comma separated tags..." 
                  value={note.tags.join(', ')}
                  onChange={(e) => handleChange('tags', e.target.value.split(',').map(t => t.trim()).filter(Boolean))}
                  className="bg-[color:var(--color-surface-container-lowest)] border border-[color:var(--color-outline-variant)] rounded px-2 py-1 font-label-md text-[length:var(--text-label-md)] text-[color:var(--color-on-surface)] focus:outline-none focus:border-[color:var(--color-primary)] w-full md:w-48"
                />
              </div>
            </div>
          </header>

          {/* Body Content */}
          <div className="min-h-[400px]" style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, var(--color-outline-variant) 31px, var(--color-outline-variant) 32px)', backgroundPosition: '0 4px' }}>
            <textarea 
              value={note.content}
              onChange={(e) => handleChange('content', e.target.value)}
              className="w-full h-full min-h-[400px] bg-transparent border-none focus:ring-0 resize-none font-body-md text-[length:var(--text-body-md)] p-0 outline-none leading-[32px]" 
              style={{ color: getContrastColor(note.color !== '#FFFFFF' ? note.color : '#Fcf9f8') || 'var(--color-on-surface)' }}
              placeholder="Begin typing entry details here..."
            ></textarea>
          </div>

          {/* Footer / Saving Indicator */}
          <footer className="absolute bottom-4 right-6 flex items-center gap-2 text-[color:var(--color-outline-variant)] font-timestamp text-[length:var(--text-timestamp)]">
            <span className="material-symbols-outlined text-[14px]">edit</span>
            <span className="italic">{saveStatus || 'Ready'}</span>
          </footer>
        </article>
      </div>
    </div>
  );
}

// Helper to ensure text is readable against the background color
function getContrastColor(hexcolor) {
  if (!hexcolor) return undefined;
  
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
