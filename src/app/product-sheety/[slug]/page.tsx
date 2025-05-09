// src/app/product-sheety/[slug]/page.tsx
"use client";
import { useEffect, useState, useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUserContext } from "../../context/UserContext";

interface Review {
  user: string;
  rating: number;
  comment: string;
}

interface Game {
  id: number;
  name: string;
  background_image: string;
  description_raw: string;
  price?: number;
}

export default function ProductSheetPage() {
  const { slug } = useParams();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(UserContext) || {};
  const router = useRouter();
  const [reviews, setReviews] = useState<Review[]>([
    { user: "Juan", rating: 5, comment: "¡Me encantó este juego!" },
    { user: "María", rating: 4, comment: "Muy bueno, pero puede mejorar." },
  ]);

  const [newReview, setNewReview] = useState<Review>({
    user: "",
    rating: 5,
    comment: "",
  });

  useEffect(() => {
    const fetchGameDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games/${slug}?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`
        );
        if (!response.ok) {
          throw new Error("Error al obtener el juego.");
        }
        const data = await response.json();
        setGame(data);
      } catch (error) {
        console.error("Error al obtener el juego:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGameDetails();
  }, [slug]);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.user.trim() || !newReview.comment.trim()) return;

    setReviews((prev) => [...prev, newReview]);
    setNewReview({ user: "", rating: 5, comment: "" });
  };

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
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">{game.name}</h2>
      <img
        src={game.background_image}
        alt={game.name}
        className="w-full rounded mb-4"
      />
      <p className="mt-2">{game.description_raw || "Sin descripción disponible."}</p>
      <p className="mt-2 font-semibold">Precio: $19.99</p>
      <button
        onClick={() => addToCart ? addToCart({ ...game, price: 19.99 }) : null}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
        disabled={!addToCart}
      >
        🛒 Añadir al Carrito
      </button>

      {/* Opiniones */}
      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4">Opiniones</h3>
        {reviews.length === 0 ? (
          <p>No hay opiniones todavía.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="p-4 border rounded shadow-md bg-gray-50"
              >
                <p className="font-semibold">{review.user}</p>
                <p className="text-sm">{"⭐".repeat(review.rating)}</p>
                <p>{review.comment}</p>
              </div>
            ))}
          </div>
        )}

        {/* Formulario de Nueva Opinión */}
        <form onSubmit={handleAddReview} className="mt-4 space-y-2">
          <h4 className="font-semibold">Deja tu opinión:</h4>
          <input
            type="text"
            placeholder="Tu nombre"
            value={newReview.user}
            onChange={(e) =>
              setNewReview({ ...newReview, user: e.target.value })
            }
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            placeholder="Tu comentario"
            value={newReview.comment}
            onChange={(e) =>
              setNewReview({ ...newReview, comment: e.target.value })
            }
            className="w-full p-2 border rounded"
            rows={3}
            required
          ></textarea>
          <div className="flex items-center gap-2">
            <label>Calificación:</label>
            <select
              value={newReview.rating}
              onChange={(e) =>
                setNewReview({ ...newReview, rating: Number(e.target.value) })
              }
              className="border rounded p-1"
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <option key={star} value={star}>
                  {star} ⭐
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded"
          >
            Enviar Opinión
          </button>
        </form>
      </div>
    </div>
  );
}
