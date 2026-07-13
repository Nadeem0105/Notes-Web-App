import "./globals.css";

export const metadata = {
  title: "Archival Catalog - Notes for the Analog Soul",
  description: "A digital sanctuary for your thoughts, built on the timeless tactile tradition of the library catalog.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=block" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400;1,700&family=Public+Sans:ital,wght@0,100..900;1,100..900&family=Caveat:wght@400..700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased bg-[color:var(--color-surface)] text-[color:var(--color-on-surface)] font-body-md min-h-screen">
        {children}
      </body>
    </html>
  );
}
