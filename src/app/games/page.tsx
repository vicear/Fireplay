// src/app/games/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useUserContext } from "@/app/context/UserContext"; // 👈 IMPORTANTE
// ✅ Añade esta línea en su lugar:
import { Game } from "@/app/context/UserContext";




export default function GamesPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { toggleFavorite, addToCart, favorites } = useUserContext(); // 👈 EXTRAER DEL CONTEXTO

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&page_size=12`
        );
        const data = await response.json();
        setGames(data.results || []);
      } catch (error) {
        console.error("Error fetching games:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Catálogo de Juegos</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar juegos..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-2 border rounded"
        />
      </div>

      {loading ? (
        <div className="text-center">Cargando juegos...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredGames.map((game) => (
            <div key={game.id} className="p-4 border rounded shadow-md">
              <img
                src={game.background_image}
                alt={game.name}
                className="w-full h-40 object-cover rounded mb-2"
              />
              <Link href={`/product-sheety/${game.id}`}>
                <h3 className="text-lg font-bold hover:underline cursor-pointer">
                  {game.name}
                </h3>
              </Link>
              <p className="text-sm">Rating: {game.rating} ⭐</p>

              <div className="flex justify-between mt-2">
                <button
                  onClick={() => toggleFavorite(game)}
                  className={`px-2 py-1 rounded ${
                    favorites.some((fav) => fav.id === game.id)
                      ? "bg-red-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {favorites.some((fav) => fav.id === game.id)
                    ? "❤️ Quitar de Favoritos"
                    : "🤍 Añadir a Favoritos"}
                </button>

                <button
                  onClick={() => addToCart({ ...game, price: 19.99, quantity: 1 })}
                  className="px-2 py-1 bg-blue-500 text-white rounded"
                >
                  🛒 Añadir al Carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
