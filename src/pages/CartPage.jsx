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
    <section>
      <h2 className="section-title">Your Cart</h2>

      {cart.length === 0 ? (
        <>
          <p>Your cart is empty.</p>
          <Link to="/">Back to Vendors</Link>
        </>
      ) : (
        <>
          {cart.map((line) => (
            <CartItem
              key={line.item.id}
              line={line}
              onChangeQty={changeQty}
              onRemove={removeFromCart}
            />
          ))}

          <h3>Total: RM {total.toFixed(2)}</h3>

          {showCheckout ? (
            <CheckoutForm
              onSubmit={handlePlaceOrder}
              onBack={() => setShowCheckout(false)}
            />
          ) : (
            <>
              <button type="button" onClick={() => setShowCheckout(true)}>
                Proceed to Checkout
              </button>

              <p>
                <Link to="/">Back to Vendors</Link>
              </p>
            </>
          )}
        </>
      )}
    </section>
  );
}

export default CartPage;
