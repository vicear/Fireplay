// src/app/dashboard/page.tsx
"use client";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { user, logoutUser, favorites, cart } = useContext(UserContext);
  const router = useRouter();

  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <div className="p-4">
      <h2 className="text-3xl mb-4">Bienvenido, {user.name}!</h2>
      <p>Email: {user.email}</p>
      <button
        onClick={() => {
          logoutUser();
          router.push("/login");
        }}
        className="bg-red-500 text-white py-2 px-4 rounded mt-4"
      >
        Cerrar Sesión
      </button>

      <h3 className="mt-4 text-xl">Juegos Favoritos</h3>
      <ul>
        {favorites.length ? (
          favorites.map((game) => <li key={game.id}>{game.name}</li>)
        ) : (
          <p>No tienes juegos favoritos.</p>
        )}
      </ul>

      <h3 className="mt-4 text-xl">Carrito de Compras</h3>
      <ul>
        {cart.length ? (
          cart.map((game) => <li key={game.id}>{game.name}</li>)
        ) : (
          <p>Tu carrito está vacío.</p>
        )}
      </ul>
    </div>
  );
}
