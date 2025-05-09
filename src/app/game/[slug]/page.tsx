"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUserContext } from "../../context/UserContext";
import type { Game } from "../../context/UserContext";

export default function GameDetailPage() {
    const { slug } = useParams();
    const router = useRouter();
    const [game, setGame] = useState<Game | null>(null);
    const [loading, setLoading] = useState(true);

    const { toggleFavorite, favorites, addToCart } = useUserContext();

    useEffect(() => {
        const fetchGame = async () => {
            const res = await fetch(
                `https://api.rawg.io/api/games/${slug}?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`
            );
            const data = await res.json();
            setGame(data);
            setLoading(false);
        };

        fetchGame();
    }, [slug]);

    if (loading) return <p className="p-4">Cargando...</p>;
    if (!game) return <p className="p-4 text-red-500">Juego no encontrado</p>;

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
                    <div className="mb-2">
                        <p className="font-semibold">Requisitos mínimos:</p>



                        <ul className="list-disc ml-4">
                            {game.platforms?.map((platform: { platform: { id: number; name: string } }) => (
                                <li key={platform.platform.id}>{platform.platform.name}</li>
                            ))}
                        </ul>

                        <button
                            onClick={() => toggleFavorite(game)}
                            className={`px-4 py-2 rounded ${favorites.some((fav: Game) => fav.id === game.id)
                                    ? "bg-red-500 text-white"
                                    : "bg-gray-200"
                                }`}
                        >
                            {favorites.some((fav: Game) => fav.id === game.id)
                                ? "❤️ Quitar de Favoritos"
                                : "🤍 Añadir a Favoritos"}
                        </button>




                        <button
                            onClick={() => addToCart(game)}
                            className="px-4 py-2 bg-green-500 text-white rounded"
                        >
                            🛒 Añadir al Carrito
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
