// src/app/cart/page.tsx
"use client";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useContext(UserContext);
  const router = useRouter();

  if (cart.length === 0) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-2xl mb-4">Tu carrito está vacío.</h2>
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
      <h2 className="text-3xl font-bold mb-4">🛒 Tu Carrito</h2>
      <ul className="space-y-4 mb-4">
        {cart.map((item, index) => (
          <li
            key={index}
            className="flex justify-between items-center p-4 border rounded bg-gray-50 shadow-md"
          >
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-600">Precio: ${item.price.toFixed(2)}</p>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center font-bold text-lg mb-4">
        <span>Total:</span>
        <span>
          ${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}
        </span>
      </div>

      <div className="flex gap-4">
        <button
          onClick={clearCart}
          className="w-full bg-red-500 text-white px-4 py-2 rounded"
        >
          Vaciar Carrito
        </button>
        <button
          className="w-full bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => alert("Esta función no está disponible aún.")}
        >
          Finalizar Compra
        </button>
      </div>
    </div>
  );
}
