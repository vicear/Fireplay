// app/layout.jsx
import { UserProvider } from "@/context/UserContext";

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
