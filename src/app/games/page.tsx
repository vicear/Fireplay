// src/app/games/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Game {
  id: number;
  name: string;
  background_image?: string; // Ahora es opcional
  rating?: number;           // Ahora es opcional
}

export default function GamesPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

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
      
      {/* Buscador */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar juegos..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Cargando */}
      {loading ? (
        <div className="text-center">Cargando juegos...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredGames.length > 0 ? (
            filteredGames.map((game) => (
              <div
                key={game.id}
                className="p-4 border rounded shadow-md hover:bg-gray-50 transition"
              >
                {game.background_image ? (
                  <img
                    src={game.background_image}
                    alt={game.name || "Juego"}
                    className="w-full h-40 object-cover rounded"
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-500">
                    Sin Imagen
                  </div>
                )}
                <h2 className="text-lg font-semibold mt-2">{game.name || "Juego sin nombre"}</h2>
                <p>⭐ {game.rating ? game.rating : "Sin calificación"}</p>
                <Link href={`/product-sheety/${game.id}`}>
                  <button className="mt-2 w-full bg-blue-500 text-white py-1 rounded">
                    Ver Más
                  </button>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center">No se encontraron juegos.</p>
          )}
        </div>
      )}
    </div>
  );
}
