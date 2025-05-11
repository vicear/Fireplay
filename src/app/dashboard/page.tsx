// src/app/dashboard/page.tsx
"use client";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { user, favorites, cart, logout } = useContext(UserContext);
  const router = useRouter();

  if (!user) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-2xl mb-4">Debes iniciar sesión para ver tu panel.</h2>
        <button
          onClick={() => router.push("/login")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Iniciar Sesión
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Panel de Usuario</h2>
      <div className="p-4 border rounded mb-4 bg-gray-50 shadow-md">
        <h3 className="text-2xl font-semibold">👤 Información de Usuario</h3>
        <p><strong>Nombre:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <button
          onClick={logout}
          className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
        >
          Cerrar Sesión
        </button>
      </div>

      <div className="p-4 border rounded mb-4 bg-gray-50 shadow-md">
        <h3 className="text-2xl font-semibold">⭐ Tus Favoritos</h3>
        {favorites.length === 0 ? (
          <p>No tienes juegos en favoritos.</p>
        ) : (
          <ul className="list-disc list-inside">
            {favorites.map((game, index) => (
              <li key={index} className="mb-2">
                {game.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="p-4 border rounded mb-4 bg-gray-50 shadow-md">
        <h3 className="text-2xl font-semibold">🛒 Tu Carrito</h3>
        {cart.length === 0 ? (
          <p>No tienes juegos en el carrito.</p>
        ) : (
          <ul className="list-disc list-inside">
            {cart.map((item, index) => (
              <li key={index} className="flex justify-between items-center mb-2">
                <span>{item.name}</span>
                <span>${item.price.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-2 font-bold">
          Total: ${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}
        </p>
      </div>
    </div>
  );
}
