import React, { createContext, useContext, useReducer } from "react";
import products from "../products";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

// Reducer
const initialState = { cart: [] };

const reducer = (state, { payload, type }) => {
  switch (type) {
    case "ADD":
      return {
        ...state,
        cart: [
          ...state.cart,
          products.find((product) => product.sku === payload),
        ],
      };
    case "REMOVE":
      const indexInCart = state.cart.findIndex((p) => p.sku === payload);
      const newCart = [...state.cart];
      newCart.splice(indexInCart, 1);
      return {
        ...state,
        cart: newCart,
      };
    case "EMPTY":
      return {
        cart: [],
      };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addItem = (sku) => dispatch({ type: "ADD", payload: sku });

  const removeItem = (sku) => dispatch({ type: "REMOVE", payload: sku });

  const emptyCart = () => dispatch({ type: "EMPTY" });

  const countItemsInCart = (sku) => {
    const itemsInCart = state.cart.filter((p) => p.sku === sku) ?? [];
    return itemsInCart.length;
  };

  const totalPrice = () => {
    return groupCartItems().reduce((totalPrice, product) => {
      return totalPrice + product.price * product.quantity;
    }, 0);
  };

  const groupCartItems = () => {
    return state.cart.reduce((newCart, product) => {
      //check the array for a product
      const indexInCart = newCart.findIndex((p) => p.sku === product.sku);
      const isInCart = indexInCart !== -1;
      //if its in teh array , inreament the quantity
      if (isInCart) {
        newCart[indexInCart].quantity = newCart[indexInCart].quantity + 1;
        return newCart;
      }
      //if not in the array, addit to the array
      newCart.push({ ...product, quantity: 1 });
      return newCart;
    }, []);
  };

  return (
    <CartContext.Provider
      value={{
        addItem,
        removeItem,
        cart: state.cart,
        countItemsInCart,
        totalPrice,
        emptyCart,
        cartGroupByItems: groupCartItems(),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
