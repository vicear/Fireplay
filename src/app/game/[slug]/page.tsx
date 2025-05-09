// src/app/game/[slug]/page.tsx
"use client";
import { useEffect, useState, useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";

export default function GameDetailPage() {
  const { slug } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toggleFavorite, favorites, addToCart } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    const fetchGameDetails = async () => {
      setLoading(true);
      const response = await fetch(
        `https://api.rawg.io/api/games/${slug}?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`
      );
      const data = await response.json();
      setGame(data);
      setLoading(false);
    };
    fetchGameDetails();
  }, [slug]);

  if (loading) {
    return <div className="p-4 text-center">Cargando juego...</div>;
  }

  if (!game) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-2xl">Juego no encontrado.</h2>
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
      <h2 className="text-3xl font-bold mb-4">{game.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <img
          src={game.background_image}
          alt={game.name}
          className="w-full rounded"
        />
        <div>
          <p className="mb-2">{game.description_raw}</p>
          <p className="mb-2">Rating: {game.rating} ⭐</p>
          <p className="mb-2">
            Requisitos mínimos:
            <ul className="list-disc ml-4">
              {game.platforms.map((platform) => (
                <li key={platform.platform.id}>{platform.platform.name}</li>
              ))}
            </ul>
          </p>

          <div className="flex space-x-4 mt-4">
            {/* Botón de Favorito */}
            <button
              onClick={() => toggleFavorite(game)}
              className={`px-4 py-2 rounded ${
                favorites.some((fav) => fav.id === game.id)
                  ? "bg-red-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {favorites.some((fav) => fav.id === game.id)
                ? "❤️ Quitar de Favoritos"
                : "🤍 Añadir a Favoritos"}
            </button>

            {/* Botón de Añadir al Carrito */}
            <button
              onClick={() => addToCart(game)}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              🛒 Añadir al Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
