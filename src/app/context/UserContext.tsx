// src/context/UserContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Tipado de plataformas
interface PlatformInfo {
  platform: {
    id: number;
    name: string;
  };
}

// Tipado general de Game
export interface Game {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  description_raw?: string;
  platforms?: PlatformInfo[];
  price: number;
  quantity: number; // Siempre requerido en el carrito
}

// Tipado de usuario
interface User {
  name: string;
  email: string;
}

// Tipo del contexto
interface UserContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  favorites: Game[];
  toggleFavorite: (game: Game) => void;
  cart: Game[];
  addToCart: (game: Game) => void;
  removeFromCart: (game: Game) => void;
  updateCartQuantity: (game: Game, quantity: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<Game[]>([]);
  const [cart, setCart] = useState<Game[]>([]);

  useEffect(() => {
    // Cargar favoritos desde localStorage
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    // Guardar favoritos en localStorage
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const login = (userData: User) => setUser(userData);
  const logout = () => setUser(null);

  const toggleFavorite = (game: Game) => {
    const exists = favorites.find((fav) => fav.id === game.id);
    if (exists) {
      setFavorites(favorites.filter((fav) => fav.id !== game.id));
    } else {
      setFavorites([...favorites, game]);
    }
  };

  const addToCart = (game: Game) => {
    const exists = cart.find((item) => item.id === game.id);
    if (exists) {
      setCart(
        cart.map((item) =>
          item.id === game.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...game, quantity: 1, price: game.price ?? 19.99 }]);
    }
  };

  const removeFromCart = (game: Game) => {
    setCart(cart.filter((item) => item.id !== game.id));
  };

  const updateCartQuantity = (game: Game, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(game);
      return;
    }

    setCart(
      cart.map((item) =>
        item.id === game.id ? { ...item, quantity } : item
      )
    );
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        favorites,
        toggleFavorite,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUserContext must be used within UserProvider");
  return context;
};
