// src/app/games/page.tsx
"use client";
import { useEffect, useState, useContext } from "react";
import Link from "next/link";
import { UserContext } from "@/context/UserContext";

export default function GamesPage() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { toggleFavorite, favorites, addToCart } = useContext(UserContext);

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&page_size=20`
        );
        const data = await response.json();
        setGames(data.results);
      } catch (error) {
        console.error("Error al cargar los juegos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
    searchGames(search);
  };

  const searchGames = async (query: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&search=${query}&page_size=20`
      );
      const data = await response.json();
      setGames(data.results);
    } catch (error) {
      console.error("Error al buscar juegos:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl mb-4">Catálogo de Juegos</h2>

      {/* Formulario de Búsqueda */}
      <form onSubmit={handleSearch} className="mb-4 flex items-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar juegos..."
          className="px-4 py-2 border rounded w-full"
        />
        <button
          type="submit"
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Buscar
        </button>
      </form>

      {/* Loading */}
      {loading ? (
        <div className="text-center">Cargando juegos...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {games.map((game: any) => (
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
                  onClick={() => addToCart(game)}
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
