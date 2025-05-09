// src/app/layout.tsx (agregando el menú)
import { UserProvider } from "@/context/UserContext";
import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <UserProvider>
          <header className="p-4 bg-gray-800 text-white flex justify-between">
            <nav className="flex space-x-4">
              <Link href="/">Inicio</Link>
              <Link href="/games">Juegos</Link>
              <Link href="/favorites">Favoritos</Link>
              <Link href="/dashboard">Dashboard</Link>
            </nav>
          </header>
          <main>{children}</main>
        </UserProvider>
      </body>
    </html>
  );
}
