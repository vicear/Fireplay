"use client";
import { useState, useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";

export default function Login() {
  const { loginUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    const userData = { name, email };
    loginUser(userData);
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl mb-4">Iniciar Sesión</h2>
      <form onSubmit={handleLogin} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Nombre"
          className="p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          className="p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}
