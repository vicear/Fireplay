// src/app/login/page.tsx
"use client";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "./context/UserContext";

export default function LoginPage() {
  //const { loginUser } = useContext(useUserContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const userData = { name, email };
    //loginUser(userData);
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-3xl mb-4">Iniciar Sesión</h2>
      <form onSubmit={handleLogin} className="flex flex-col space-y-4 w-64">
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white py-2 rounded">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}
