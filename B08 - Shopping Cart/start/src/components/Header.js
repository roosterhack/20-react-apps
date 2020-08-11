import React, { useRef, useState } from "react";
import CartIcon from "../supermarket.svg";
import useOnClickOutside from "use-onclickoutside";
import { useCart } from "../contexts/use-cart";
import { Cart } from "./Cart.jsx";

export default function Header() {
  const modalRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart();

  //close the modal if we click outside of it
  useOnClickOutside(modalRef, () => {
    if (isOpen) setIsOpen(false);
  });

  return (
    <header>
      <div className="container">
        <div className="cart-button">
          <button onClick={() => setIsOpen((isOpen) => !isOpen)}>
            <img src={CartIcon} width="30" alt="" />({cart.length})
          </button>

          {/* Show a modal */}
          <div
            class="cart-modal"
            ref={modalRef}
            style={{ display: isOpen ? "block" : "none" }}
          >
            <Cart />
          </div>
        </div>
      </div>
    </header>
  );
}
