// src/app/favorites/page.tsx
"use client";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";

export default function FavoritesPage() {
  const { favorites, toggleFavorite, addToCart } = useContext(UserContext);
  const router = useRouter();

  if (favorites.length === 0) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-2xl">No tienes juegos favoritos.</h2>
        <button
          onClick={() => router.push("/games")}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Ver Juegos
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-3xl mb-4">Tus Juegos Favoritos</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {favorites.map((game) => (
          <div key={game.id} className="p-4 border rounded shadow-md">
            <img
              src={game.background_image}
              alt={game.name}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h3 className="text-lg font-bold">{game.name}</h3>
            <p className="text-sm">Rating: {game.rating}</p>

            <div className="flex justify-between mt-2">
              {/* Botón de Quitar Favorito */}
              <button
                onClick={() => toggleFavorite(game)}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                ❌ Quitar de Favoritos
              </button>

              {/* Botón de Añadir al Carrito */}
              <button
                onClick={() => addToCart(game)}
                className="px-2 py-1 bg-blue-500 text-white rounded"
              >
                🛒 Añadir al Carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
