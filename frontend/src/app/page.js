import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="w-full bg-[color:var(--color-manila-dark)] font-body-md text-[color:var(--color-on-surface)] antialiased pt-20 min-h-screen">
      {/* TopAppBar */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-[var(--spacing-margin-desktop)] h-20 bg-[color:var(--color-surface)] dark:bg-[color:var(--color-surface-dim)] border-b border-[color:var(--color-outline-variant)] dark:border-[color:var(--color-outline)]">
        <div className="flex items-center gap-4">
          <span className="font-headline-md text-[length:var(--text-headline-md)] font-[var(--text-headline-md--font-weight)] text-[color:var(--color-primary)] dark:text-[color:var(--color-primary-fixed-dim)]">Archival Catalog</span>
        </div>

        <div>
          <Link href="/login">
            <button className="ink-stamp px-4 py-2 font-label-md text-[length:var(--text-label-md)] transition-all hover:bg-[color:var(--color-surface-container-high)] duration-150 active:scale-95 cursor-pointer">
              Open Your Catalog
            </button>
          </Link>
        </div>
      </nav>

      <main className="max-w-[1280px] mx-auto px-[var(--spacing-margin-mobile)] md:px-[var(--spacing-margin-desktop)]">
        {/* Hero Section */}
        <section className="py-24 grid md:grid-cols-2 gap-12 items-center min-h-[80vh]">
          <div className="space-y-8">
            <h1 className="opacity-0 animate-slide-up font-headline-lg text-[length:var(--text-headline-lg)] leading-[var(--text-headline-lg--line-height)] tracking-[var(--text-headline-lg--letter-spacing)] font-[var(--text-headline-lg--font-weight)] text-[color:var(--color-primary)] max-w-lg" style={{ animationDelay: '0.1s' }}>
              Notes for the Analog Soul.
            </h1>
            <p className="opacity-0 animate-slide-up font-body-lg text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-on-surface-variant)] max-w-md" style={{ animationDelay: '0.2s' }}>
              A digital sanctuary for your thoughts, built on the timeless tactile tradition of the library catalog.
            </p>
            <Link href="/login" className="inline-block opacity-0 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <button className="ink-stamp px-8 py-4 font-headline-sm text-[length:var(--text-headline-sm)] bg-[color:var(--color-primary)] text-[color:var(--color-on-primary)] hover:bg-[color:var(--color-primary-container)] hover:text-[color:var(--color-primary)] transition-colors cursor-pointer">
                Open Your Catalog
              </button>
            </Link>
          </div>
          
          <div className="relative h-[500px] w-full hidden md:block">
            {/* Decorative Cards */}
            <div className="opacity-0 animate-fade-in absolute top-10 left-10 w-64 h-80 bg-[color:var(--color-primary-container)] border border-[color:var(--color-manila-border)] card-ruled card-shadow transform -rotate-6 p-[var(--spacing-card-padding)] z-10 transition-transform duration-300 hover:rotate-0 hover:z-30" style={{ animationDelay: '0.4s' }}>
              <div className="absolute top-0 right-0 w-8 h-12 bg-[color:var(--color-tertiary)] opacity-80" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)' }}></div>
              <h3 className="font-['Caveat'] text-3xl font-bold text-[color:var(--color-primary)] mb-2 mt-6 leading-tight">The First Entry</h3>
              <p className="font-['Caveat'] text-2xl text-[color:var(--color-on-surface)] leading-relaxed">
                Every notebook begins<br/>
                with a single page.<br/>
                Every achievement begins<br/>
                with a single idea.
              </p>
            </div>
            
            <div className="opacity-0 animate-fade-in absolute top-24 left-32 w-72 h-96 bg-[color:var(--color-surface)] border border-[color:var(--color-manila-border)] card-ruled card-shadow transform rotate-3 p-[var(--spacing-card-padding)] z-20 transition-transform duration-300 hover:rotate-0 hover:z-30" style={{ animationDelay: '0.6s' }}>
              <h3 className="font-['Caveat'] text-4xl font-bold text-[color:var(--color-primary)] mb-4 mt-2 leading-tight">A Thought Worth Keeping</h3>
              <p className="font-['Caveat'] text-3xl text-[color:var(--color-on-surface)] leading-relaxed">
                Write freely.<br/>
                Organize effortlessly.<br/>
                Remember forever.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 border-t border-[color:var(--color-outline-variant)]">
          <div className="text-center mb-16">
            <h2 className="font-headline-lg text-[length:var(--text-headline-lg)] text-[color:var(--color-primary)]">System Mechanics</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="opacity-0 animate-slide-up bg-[color:var(--color-primary-container)] border border-[color:var(--color-manila-border)] card-ruled p-[var(--spacing-card-padding)] card-shadow card-hover transition-all duration-300 min-h-[300px] flex flex-col relative" style={{ animationDelay: '0.2s' }}>
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[color:var(--color-tertiary)]"></div>
              <span className="material-symbols-outlined text-[color:var(--color-primary)] text-4xl mb-6">push_pin</span>
              <h3 className="font-headline-sm text-[length:var(--text-headline-sm)] text-[color:var(--color-primary)] mb-4">Tactile Organization</h3>
              <p className="font-body-md text-[length:var(--text-body-md)] text-[color:var(--color-on-surface-variant)] flex-grow">Physical pins and clips for your most important thoughts. Organize by stack, not by endless scroll.</p>
            </div>
            
            <div className="opacity-0 animate-slide-up bg-[color:var(--color-surface)] border border-[color:var(--color-manila-border)] card-ruled p-[var(--spacing-card-padding)] card-shadow card-hover transition-all duration-300 min-h-[300px] flex flex-col" style={{ animationDelay: '0.3s' }}>
              <span className="material-symbols-outlined text-[color:var(--color-primary)] text-4xl mb-6">search</span>
              <h3 className="font-headline-sm text-[length:var(--text-headline-sm)] text-[color:var(--color-primary)] mb-4">Searchable Archives</h3>
              <p className="font-body-md text-[length:var(--text-body-md)] text-[color:var(--color-on-surface-variant)] flex-grow">Instant retrieval with a vintage search feel. Pull the drawer, find the card.</p>
            </div>
            
            <div className="opacity-0 animate-slide-up bg-[color:var(--color-primary-container)] border border-[color:var(--color-manila-border)] card-ruled p-[var(--spacing-card-padding)] card-shadow card-hover transition-all duration-300 min-h-[300px] flex flex-col" style={{ animationDelay: '0.4s' }}>
              <span className="material-symbols-outlined text-[color:var(--color-primary)] text-4xl mb-6">edit_document</span>
              <h3 className="font-headline-sm text-[length:var(--text-headline-sm)] text-[color:var(--color-primary)] mb-4">Autosave Ink</h3>
              <p className="font-body-md text-[length:var(--text-body-md)] text-[color:var(--color-on-surface-variant)] flex-grow">Your words are permanent. We save as you type, just like ink setting into paper stock.</p>
              <div className="mt-4 text-right">
                <span className="font-timestamp text-[length:var(--text-timestamp)] text-[color:var(--color-outline)] opacity-50 italic">saving...</span>
              </div>
            </div>
          </div>
        </section>

        {/* Metaphor Section */}
        <section className="py-24 border-t border-[color:var(--color-outline-variant)] relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
            <h2 className="font-headline-lg text-[length:var(--text-headline-lg)] text-[color:var(--color-primary)]">The Philosophy of the Drawer</h2>
            <div className="bg-[color:var(--color-surface)] border border-[color:var(--color-manila-border)] p-12 card-shadow text-left space-y-6">
              <p className="font-body-md text-[length:var(--text-body-md)] text-[color:var(--color-on-surface)] leading-relaxed">
                Digital spaces often feel ephemeral. Words typed into the void can vanish with a misplaced click. We sought to return to a time when recording a thought felt intentional.
              </p>
              <p className="font-body-md text-[length:var(--text-body-md)] text-[color:var(--color-on-surface)] leading-relaxed">
                The index card is the perfect constraint. It demands brevity, focus, and clarity. It exists within a spatial hierarchy—a drawer, a tab, a stack. 
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 px-[var(--spacing-margin-desktop)] flex flex-col md:flex-row justify-between items-center gap-[var(--spacing-gutter)] bg-[color:var(--color-surface-container)] dark:bg-[color:var(--color-surface-container-lowest)] border-t border-[color:var(--color-outline-variant)] dark:border-[color:var(--color-outline)]">
        <div className="flex items-center gap-2">
          <span className="font-headline-sm text-[length:var(--text-headline-sm)] text-[color:var(--color-secondary)]">Archival Catalog</span>
        </div>
      </footer>
    </div>
  );
}
