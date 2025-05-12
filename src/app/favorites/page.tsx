// src/app/favorites/page.tsx
"use client";
import { useUserContext } from "../context/UserContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useUserContext();
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
        {favorites.map((game) => (
          <li
            key={game.id}
            className="flex items-center justify-between p-4 border rounded bg-gray-50 shadow-md"
          >
            <div className="flex items-center gap-4">
              <Image
                src={game.background_image}
                alt={game.name}
                width={64}
                height={64}
                className="rounded"
              />
              <div>
                <p className="font-semibold">{game.name}</p>
                <p className="text-sm text-gray-600">Rating: {game.rating} ⭐</p>
              </div>
            </div>
            <button
              onClick={() => toggleFavorite(game)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              ❌ Quitar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
