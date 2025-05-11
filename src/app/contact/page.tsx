// src/app/contact/page.tsx
"use client";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulación de envío de mensaje (aquí se podría enviar a Firestore)
    console.log("Mensaje enviado:", form);
    setForm({ name: "", email: "", message: "" });
    setSuccess(true);

    setTimeout(() => setSuccess(false), 3000); // Ocultar mensaje después de 3 segundos
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">📩 Contacto</h2>
      <p className="mb-4">¿Tienes alguna pregunta o sugerencia? Envíanos un mensaje:</p>

      {success && (
        <div className="p-2 mb-4 text-green-700 bg-green-100 rounded">
          ✅ Mensaje enviado correctamente.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Nombre</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Correo Electrónico</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Mensaje</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows={5}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded"
        >
          Enviar Mensaje
        </button>
      </form>
    </div>
  );
}
