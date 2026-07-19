import "./globals.css";

// This root layout only ever wraps the instant-redirect fallback page at
// "/" (middleware normally redirects before this is reached). The real
// layout with fonts, header, and footer lives in app/[lang]/layout.tsx.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
