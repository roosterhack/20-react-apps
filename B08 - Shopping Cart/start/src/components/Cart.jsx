import React from "react";
import { useCart } from "../contexts/use-cart";

export const Cart = () => {
  const {
    addItem,
    removeItem,
    totalPrice,
    cartGroupByItems,
    emptyCart,
  } = useCart();

  return (
    <div className="cart">
      {cartGroupByItems.map((product, index) => (
        <div className="cart-item" key={index}>
          <img src={product.image_url} alt={product.name} width="100" />
          <div className="content">
            <h3>{product.name}</h3>

            <div className="cart-buttons">
              <button onClick={() => removeItem(product.sku)}>-</button>
              <button>{product.quantity}</button>
              <button onClick={() => addItem(product.sku)}>+</button>
            </div>
          </div>
        </div>
      ))}
      {totalPrice() > 0 && (
        <button onClick={() => emptyCart()}>Empty Cart</button>
      )}
      <div className="total">{`$${totalPrice()}`}</div>
    </div>
  );
};
