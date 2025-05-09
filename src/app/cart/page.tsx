// src/app/cart/page.tsx
"use client";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, updateCartQuantity, removeFromCart } = useContext(UserContext);
  const router = useRouter();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (cart.length === 0) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-2xl">Tu carrito está vacío.</h2>
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
      <h2 className="text-3xl mb-4">Tu Carrito de Compras</h2>
      <div className="space-y-4">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center justify-between border p-4 rounded">
            <div className="flex items-center space-x-4">
              <img
                src={item.background_image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p className="text-sm">Precio: ${item.price}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => updateCartQuantity(item, item.quantity - 1)}
                className="px-2 py-1 bg-gray-200 rounded"
              >
                ➖
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => updateCartQuantity(item, item.quantity + 1)}
                className="px-2 py-1 bg-gray-200 rounded"
              >
                ➕
              </button>
              <button
                onClick={() => removeFromCart(item)}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                ❌
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <h3 className="text-2xl">Total: ${calculateTotal().toFixed(2)}</h3>
        <button
          onClick={() => alert("Compra finalizada (funcionalidad futura).")}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
        >
          Finalizar Compra
        </button>
      </div>
    </div>
  );
}
