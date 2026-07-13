"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Mock Authentication Logic
    const email = e.target.librarian_id.value.toLowerCase().trim();
    localStorage.setItem('userId', email);

    if (!isLogin && e.target.librarian_name) {
      localStorage.setItem('userName', e.target.librarian_name.value);
    } else if (isLogin) {
      if (!localStorage.getItem('userName')) {
        localStorage.setItem('userName', email.split('@')[0]);
      }
    }
    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <div className="w-full min-h-screen flex flex-col font-body-md text-[color:var(--color-on-surface)] bg-[color:var(--color-manila-dark)]">
      {/* TopAppBar */}
      <header className="bg-[color:var(--color-surface)] dark:bg-[color:var(--color-surface-dim)] border-b border-[color:var(--color-outline-variant)] dark:border-[color:var(--color-outline)] flex justify-between items-center px-[var(--spacing-margin-desktop)] w-full h-16 z-50 transition-colors duration-200">
        <div className="flex items-center gap-4">
          <Link href="/" aria-label="Go to Home" className="text-[color:var(--color-primary)] hover:bg-[color:var(--color-surface-container-high)] p-2 rounded transition-colors duration-200 flex items-center justify-center">
            <span className="material-symbols-outlined">home</span>
          </Link>
          <div className="flex items-center gap-3">
            <Image src="/images/logo.png" alt="Archival Catalog Logo" width={40} height={40} className="object-contain" />
            <span className="font-headline-md text-[length:var(--text-headline-md)] text-[color:var(--color-primary)] dark:text-[color:var(--color-primary-fixed-dim)]">Archival Catalog</span>
          </div>
        </div>
        <div className="flex items-center gap-4 hidden md:flex">
          {/* Suppressed Nav Shell for Linear Intent (Login) */}
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow flex items-center justify-center p-[var(--spacing-gutter)] md:p-[var(--spacing-margin-desktop)]">
        {/* Login Index Card */}
        <div 
          className="opacity-0 animate-slide-up w-full max-w-md p-[var(--spacing-card-padding)] relative group transition-transform duration-300 hover:-translate-y-1"
          style={{
            backgroundColor: '#F3E5AB', // Lighter active card
            border: '1px solid #D4C49A',
            boxShadow: '2px 2px 0px 0px rgba(45,45,45,0.1)',
            backgroundImage: 'repeating-linear-gradient(transparent, transparent 23px, #E6D5AC 23px, #E6D5AC 24px)',
            backgroundPosition: 'top 48px left 0'
          }}
        >
          {/* Edge Stripe */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[color:var(--color-primary)]"></div>
          
          <div className="flex flex-col items-center mb-8 relative z-10">
            <h1 className="font-headline-lg text-[length:var(--text-headline-lg)] text-[color:var(--color-on-surface)] text-center bg-[#F3E5AB] px-2 py-1">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
            <p className="font-label-md text-[length:var(--text-label-md)] text-[color:var(--color-on-surface-variant)] mt-2 bg-[#F3E5AB] px-2">{isLogin ? 'Sign in to your account' : 'Register for a new account'}</p>
          </div>
          
          <form onSubmit={handleSubmit} autoComplete="off" className="space-y-6 relative z-10">
            {!isLogin && (
              <div className="flex flex-col bg-[#F3E5AB]">
                <label className="font-label-md text-[length:var(--text-label-md)] text-[color:var(--color-on-surface-variant)] mb-1" htmlFor="librarian_name">FULL NAME</label>
                <input 
                  id="librarian_name" 
                  name="librarian_name"
                  placeholder="Enter Name..." 
                  type="text"
                  required
                  style={{
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '2px solid #D4C49A',
                    borderRadius: 0,
                    paddingLeft: 0,
                    paddingRight: 0
                  }}
                  className="font-label-md text-[length:var(--text-label-md)] text-[color:var(--color-on-surface)] w-full h-8 focus:outline-none focus:border-[color:var(--color-primary)]"
                  autoComplete="off"
                />
              </div>
            )}
            <div className="flex flex-col bg-[#F3E5AB]">
              <label className="font-label-md text-[length:var(--text-label-md)] text-[color:var(--color-on-surface-variant)] mb-1" htmlFor="librarian_id">EMAIL ADDRESS</label>
              <input 
                id="librarian_id" 
                placeholder="Enter email..." 
                type="text"
                required
                style={{
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '2px solid #D4C49A',
                  borderRadius: 0,
                  paddingLeft: 0,
                  paddingRight: 0
                }}
                className="font-label-md text-[length:var(--text-label-md)] text-[color:var(--color-on-surface)] w-full h-8 focus:outline-none focus:border-[color:var(--color-primary)]"
                autoComplete="off"
              />
            </div>
            <div className="flex flex-col bg-[#F3E5AB]">
              <label className="font-label-md text-[length:var(--text-label-md)] text-[color:var(--color-on-surface-variant)] mb-1" htmlFor="access_key">PASSWORD</label>
              <input 
                id="access_key" 
                placeholder="Enter password..." 
                type="password"
                required
                style={{
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '2px solid #D4C49A',
                  borderRadius: 0,
                  paddingLeft: 0,
                  paddingRight: 0
                }}
                className="font-label-md text-[length:var(--text-label-md)] text-[color:var(--color-on-surface)] w-full h-8 focus:outline-none focus:border-[color:var(--color-primary)]"
                autoComplete="new-password"
              />
            </div>
            {!isLogin && (
              <div className="flex flex-col bg-[#F3E5AB]">
                <label className="font-label-md text-[length:var(--text-label-md)] text-[color:var(--color-on-surface-variant)] mb-1" htmlFor="confirm_access_key">CONFIRM PASSWORD</label>
                <input 
                  id="confirm_access_key" 
                  placeholder="Confirm password..." 
                  type="password"
                  required
                  style={{
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '2px solid #D4C49A',
                    borderRadius: 0,
                    paddingLeft: 0,
                    paddingRight: 0
                  }}
                  className="font-label-md text-[length:var(--text-label-md)] text-[color:var(--color-on-surface)] w-full h-8 focus:outline-none focus:border-[color:var(--color-primary)]"
                  autoComplete="new-password"
                />
              </div>
            )}
            <div className="pt-6 flex justify-center bg-[#F3E5AB]">
              <button 
                type="submit"
                disabled={loading}
                className="w-full py-3 font-headline-sm text-[length:var(--text-headline-sm)] text-[color:var(--color-primary)] bg-transparent transition-colors duration-200 flex items-center justify-center gap-2 hover:bg-[color:var(--color-primary)] hover:text-[color:var(--color-on-primary)]"
                style={{
                  border: '2px solid var(--color-primary)',
                  borderRadius: 0,
                  textTransform: 'uppercase'
                }}
              >
                <span>{loading ? (isLogin ? 'Authenticating...' : 'Registering...') : (isLogin ? 'Sign In' : 'Sign Up')}</span>
                {!loading && <span className="material-symbols-outlined">{isLogin ? 'fingerprint' : 'person_add'}</span>}
              </button>
            </div>
          </form>
          <div className="mt-8 text-center bg-[#F3E5AB] py-1">
            <button 
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="font-label-md text-[length:var(--text-label-md)] text-[color:var(--color-primary)] underline hover:text-[color:var(--color-on-surface)] transition-colors"
            >
              {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
            </button>
          </div>
        </div>
      </main>

    </div>
  );
}
