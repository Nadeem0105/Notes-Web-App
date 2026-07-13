"use client";
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { DashboardProvider, useDashboard } from '@/context/DashboardContext';

function DashboardLayoutContent({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { searchQuery, setSearchQuery, sortOrder, setSortOrder, userName, theme, toggleTheme } = useDashboard();

  const handleLogout = () => {
    localStorage.removeItem('userName');
    router.push('/login');
  };

  // Helper to check active paths
  const isArchive = pathname.includes('/archive');
  const isTrash = pathname.includes('/trash');
  const isNoteDetail = pathname.includes('/note/');
  const isAllNotes = pathname === '/dashboard';
  // Note: we can map Pinned to a query param or a separate route. Let's just keep All Notes for now.

  const bgClass = isArchive ? 'bg-[#dcd9d9]' : 'bg-[color:var(--color-manila-dark)]';

  return (
    <div className={`w-full flex h-screen overflow-hidden font-body-md text-[color:var(--color-on-surface)] ${bgClass}`}>
      {/* SideNavBar */}
      <nav className="opacity-0 animate-slide-in-left fixed left-0 top-0 h-full w-64 bg-[color:var(--color-surface-container)] border-r border-[color:var(--color-outline-variant)] flex flex-col p-[var(--spacing-margin-desktop)] z-20 shrink-0 hidden md:flex">
        <div className="mb-8 flex flex-col items-start gap-4">
          <Image src="/images/logo.png" alt="Archival Catalog Logo" width={64} height={64} className="object-contain" />
          <div>
            <h1 className="font-headline-md text-[length:var(--text-headline-md)] text-[color:var(--color-on-surface)]">Archival Catalog</h1>
            <p className="font-label-md text-[length:var(--text-label-md)] text-[color:var(--color-on-surface-variant)] mt-1">Archives Department</p>
          </div>
        </div>
        
        <Link href="/dashboard/note/new">
          <button className="mb-8 w-full py-3 px-4 border-2 border-[color:var(--color-outline)] text-[color:var(--color-on-surface)] font-headline-sm text-[length:var(--text-headline-sm)] hover:bg-[color:var(--color-primary-container)] transition-colors flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[20px]">add</span>
            New Entry
          </button>
        </Link>
        
        <ul className="flex flex-col gap-2 flex-grow">
          <li>
            <Link href="/dashboard" className={`flex items-center gap-3 px-3 py-2 rounded transition-all duration-150 ${isAllNotes ? 'text-[color:var(--color-on-surface)] font-bold underline transform translate-x-1 bg-[color:var(--color-primary-container)] bg-opacity-20' : 'text-[color:var(--color-on-surface-variant)] hover:bg-black/5'}`}>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: isAllNotes ? "'FILL' 1" : "'FILL' 0" }}>folder</span>
              <span className="font-label-md text-[length:var(--text-label-md)]">All Notes</span>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/archive" className={`flex items-center gap-3 px-3 py-2 rounded transition-all duration-150 ${isArchive ? 'text-[color:var(--color-on-surface)] font-bold underline transform translate-x-1 bg-[color:var(--color-primary-container)] bg-opacity-20' : 'text-[color:var(--color-on-surface-variant)] hover:bg-black/5'}`}>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: isArchive ? "'FILL' 1" : "'FILL' 0" }}>inventory_2</span>
              <span className="font-label-md text-[length:var(--text-label-md)]">Archive</span>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/trash" className={`flex items-center gap-3 px-3 py-2 rounded transition-all duration-150 ${isTrash ? 'text-[color:var(--color-on-surface)] font-bold underline transform translate-x-1 bg-[color:var(--color-primary-container)] bg-opacity-20' : 'text-[color:var(--color-on-surface-variant)] hover:bg-black/5'}`}>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: isTrash ? "'FILL' 1" : "'FILL' 0" }}>delete</span>
              <span className="font-label-md text-[length:var(--text-label-md)]">Trash</span>
            </Link>
          </li>
        </ul>
        
        <div className="mt-auto flex items-center gap-3 pt-4 border-t border-[color:var(--color-outline-variant)]">
          <div className="w-10 h-10 rounded-full border border-[color:var(--color-outline)] bg-gray-300 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-gray-500">person</span>
          </div>
          <span className="font-label-md text-[length:var(--text-label-md)] flex-1 truncate" title={userName}>{userName}</span>
          <button onClick={handleLogout} aria-label="logout" className="text-[color:var(--color-tertiary)] hover:text-[color:var(--color-primary)] transition-colors p-1" title="Logout">
            <span className="material-symbols-outlined">logout</span>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="md:ml-64 flex-1 flex flex-col h-screen overflow-hidden">
        {/* TopAppBar */}
        <header className="flex justify-between items-center w-full px-[var(--spacing-margin-desktop)] h-16 bg-[color:var(--color-surface)] border-b border-[color:var(--color-outline-variant)] shrink-0 z-10">
          <div className="flex items-center gap-4 flex-1">
            <span className="md:hidden material-symbols-outlined cursor-pointer">menu</span>
            <span className="font-headline-lg text-[length:var(--text-headline-lg)] font-bold text-[color:var(--color-on-surface)]">
              {isArchive ? 'Archives' : isTrash ? 'Trash' : isNoteDetail ? 'Entry Editor' : 'Catalog'}
            </span>
            
            {/* Drawer Front Search */}
            {!isNoteDetail && (
              <div className="relative ml-8 flex-1 max-w-md group hidden md:block">
                <span className="material-symbols-outlined absolute left-0 bottom-1 text-[color:var(--color-on-surface-variant)]">search</span>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-0 border-b border-[color:var(--color-outline-variant)] focus:border-[color:var(--color-outline)] focus:ring-0 pl-8 pb-1 font-headline-sm text-[length:var(--text-headline-sm)] text-[color:var(--color-on-surface)] placeholder-[color:var(--color-on-surface-variant)] transition-colors" 
                  placeholder="Search catalog..." 
                />
              </div>
            )}
          </div>
          
          <div className="flex gap-4">
            {!isNoteDetail && (
              <div className="relative group flex items-center">
                <button aria-label="sort" className="text-[color:var(--color-tertiary)] hover:text-[color:var(--color-primary)] transition-colors flex items-center">
                  <span className="material-symbols-outlined">sort</span>
                </button>
                <div className="absolute right-0 top-full mt-2 bg-white shadow-lg border border-gray-200 hidden group-hover:flex flex-col z-50 w-32">
                  <button onClick={() => setSortOrder('newest')} className="px-4 py-2 hover:bg-gray-100 text-sm text-left">Newest</button>
                  <button onClick={() => setSortOrder('oldest')} className="px-4 py-2 hover:bg-gray-100 text-sm text-left">Oldest</button>
                  <button onClick={() => setSortOrder('az')} className="px-4 py-2 hover:bg-gray-100 text-sm text-left">A-Z</button>
                </div>
              </div>
            )}
            <button onClick={toggleTheme} aria-label="toggle theme" className="text-[color:var(--color-tertiary)] hover:text-[color:var(--color-primary)] transition-colors" title="Toggle Theme">
              <span className="material-symbols-outlined">{theme === 'light' ? 'dark_mode' : 'light_mode'}</span>
            </button>
          </div>
        </header>

        {/* Canvas */}
        <div className="flex-1 overflow-y-auto relative">
          {children}
        </div>
      </main>
    </div>
  );
}

export default function DashboardLayout({ children }) {
  return (
    <DashboardProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </DashboardProvider>
  );
}
