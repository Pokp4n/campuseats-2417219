function CartItem({ line, onChangeQty, onRemove }) {
  const { item, qty } = line;

  return (
    <div className="cart-item">
      <div className="cart-item-details">
        <div>
          <h3 className="cart-item-name">{item.name}</h3>
          <p className="cart-item-price">RM {item.price.toFixed(2)} each</p>
        </div>

        <div className="cart-item-subtotal">
          <span>Subtotal</span>
          <strong>RM {(item.price * qty).toFixed(2)}</strong>
        </div>
      </div>

      <div className="cart-actions">
        <div className="quantity-controls">
          <button
            type="button"
            className="quantity-button"
            aria-label={`Decrease quantity of ${item.name}`}
            onClick={() => onChangeQty(item.id, -1)}
          >
            -
          </button>

          <span className="quantity-value">{qty}</span>

          <button
            type="button"
            className="quantity-button"
            aria-label={`Increase quantity of ${item.name}`}
            onClick={() => onChangeQty(item.id, 1)}
          >
            +
          </button>
        </div>

        <button
          type="button"
          className="remove-button"
          onClick={() => onRemove(item.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;
