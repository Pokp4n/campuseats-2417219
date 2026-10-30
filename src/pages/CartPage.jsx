import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useCart } from "../hooks/useCart.js";
import CartItem from "../components/CartItem.jsx";
import CheckoutForm from "../components/CheckoutForm.jsx";

function CartPage() {
  const { cart, total, changeQty, removeFromCart, placeOrder } = useCart();

  const navigate = useNavigate();

  const [showCheckout, setShowCheckout] = useState(false);

  function handlePlaceOrder(details) {
    const success = placeOrder(details);

    if (success) {
      navigate("/orders");
    }
  }

  return (
    <section className="cart-page">
      <h2 className="section-title">Your Cart</h2>

      {cart.length === 0 ? (
        <div className="card cart-empty">
          <p>Your cart is empty.</p>
          <Link to="/">Back to Vendors</Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((line) => (
              <CartItem
                key={line.item.id}
                line={line}
                onChangeQty={changeQty}
                onRemove={removeFromCart}
              />
            ))}
          </div>

          <div className="card cart-total">
            <span>Order Total</span>
            <strong>RM {total.toFixed(2)}</strong>
          </div>

          {showCheckout ? (
            <CheckoutForm
              onSubmit={handlePlaceOrder}
              onBack={() => setShowCheckout(false)}
            />
          ) : (
            <div className="cart-page-actions">
              <button
                type="button"
                className="btn"
                onClick={() => setShowCheckout(true)}
              >
                Proceed to Checkout
              </button>
            </div>
          )}

          <p className="cart-back">
            <Link to="/">Back to Vendors</Link>
          </p>
        </>
      )}
    </section>
  );
}

export default CartPage;
