// src/app/info/page.tsx
"use client";

export default function InfoPage() {
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Acerca de Fireplay</h2>
      <p className="mb-4">
        Fireplay es una aplicación web que simula una tienda de videojuegos en línea. 
        Está diseñada como un proyecto educativo para aprender y practicar tecnologías modernas del desarrollo web.
      </p>

      <h3 className="text-2xl font-semibold mb-2">🚀 Tecnologías Utilizadas</h3>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>✅ Next.js 15 (con App Router y Server Components)</li>
        <li>✅ React 19</li>
        <li>✅ Tailwind CSS 4</li>
        <li>✅ Firebase (Authentication y Firestore)</li>
        <li>✅ LocalStorage y Cookies para almacenamiento persistente</li>
        <li>✅ RAWG API como fuente externa de videojuegos</li>
        <li>✅ Progressive Web App (PWA) con manifest.json y service worker</li>
        <li>✅ Vite como sistema de desarrollo rápido</li>
      </ul>

      <h3 className="text-2xl font-semibold mb-2">🌟 Objetivos del Proyecto</h3>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>✅ Crear una experiencia de usuario fluida y responsiva.</li>
        <li>✅ Implementar autenticación y gestión de usuarios.</li>
        <li>✅ Permitir a los usuarios agregar juegos a favoritos y al carrito.</li>
        <li>✅ Mostrar un catálogo dinámico de juegos obtenidos de la RAWG API.</li>
        <li>✅ Desarrollar una aplicación instalable como PWA.</li>
      </ul>

      <h3 className="text-2xl font-semibold mb-2">📚 Información Adicional</h3>
      <p className="mb-4">
        Fireplay es un proyecto en constante desarrollo. Si tienes alguna sugerencia o encuentras algún error, 
        no dudes en ponerte en contacto a través de la página de contacto.
      </p>

      <h3 className="text-2xl font-semibold mb-2">👨‍💻 Desarrollado por</h3>
      <p>Tu nombre aquí</p>

      <h3 className="text-2xl font-semibold mt-6 mb-2">⬅️ Navegación</h3>
      <div className="flex gap-4">
        <a
          href="/"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Ir al Inicio
        </a>
        <a
          href="/contact"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Contacto
        </a>
      </div>
    </div>
  );
}
