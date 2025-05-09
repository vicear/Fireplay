// src/context/UserContext.jsx (completo)
"use client";
import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);

  // Iniciar sesión (temporal)
  const loginUser = (userData) => {
    setUser(userData);
  };

  // Cerrar sesión
  const logoutUser = () => {
    setUser(null);
    setFavorites([]);
    setCart([]);
  };

  // Favoritos
  const toggleFavorite = (game) => {
    const exists = favorites.find((fav) => fav.id === game.id);
    if (exists) {
      setFavorites(favorites.filter((fav) => fav.id !== game.id));
    } else {
      setFavorites([...favorites, game]);
    }
  };

  // Carrito
  const addToCart = (game) => {
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
      setCart([...cart, { ...game, quantity: 1, price: 19.99 }]); // Precio ficticio
    }
  };

  const removeFromCart = (game) => {
    setCart(cart.filter((item) => item.id !== game.id));
  };

  const updateCartQuantity = (game, quantity) => {
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
        loginUser,
        logoutUser,
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
