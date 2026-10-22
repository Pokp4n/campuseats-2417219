import CartItem from "./CartItem.jsx";

function CartPage({ cart, onChangeQty, onRemove, onCheckout, onBack }) {
  const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0);

  return (
    <section>
      <h2 className="section-title">Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((line) => (
            <CartItem
              key={line.item.id}
              line={line}
              onChangeQty={onChangeQty}
              onRemove={onRemove}
            />
          ))}

          <h3>Total: RM {total.toFixed(2)}</h3>

          <button onClick={onCheckout}>Proceed to Checkout</button>
        </>
      )}

      <button onClick={onBack}>Back to Menus</button>
    </section>
  );
}

export default CartPage;
