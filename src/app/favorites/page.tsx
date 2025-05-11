// src/app/favorites/page.tsx
"use client";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useContext(UserContext);
  const router = useRouter();

  if (favorites.length === 0) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-2xl mb-4">No tienes juegos en favoritos.</h2>
        <button
          onClick={() => router.push("/games")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Ver Juegos
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">⭐ Tus Juegos Favoritos</h2>
      <ul className="space-y-4">
        {favorites.map((game, index) => (
          <li
            key={index}
            className="flex items-center justify-between p-4 border rounded bg-gray-50 shadow-md"
          >
            <div className="flex items-center gap-4">
              <img
                src={game.background_image}
                alt={game.name}
                className="w-16 h-16 rounded"
              />
              <div>
                <p className="font-semibold">{game.name}</p>
                <p className="text-sm text-gray-600">Rating: {game.rating}</p>
              </div>
            </div>
            <button
              onClick={() => toggleFavorite(game)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
