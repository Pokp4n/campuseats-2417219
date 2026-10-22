function CartItem({ line, onChangeQty, onRemove }) {
  const { item, qty } = line;

  return (
    <div className="cart-item">
      <div>
        <h3>{item.name}</h3>
        <p>RM {item.price.toFixed(2)} each</p>
        <p>Subtotal: RM {(item.price * qty).toFixed(2)}</p>
      </div>

      <div className="cart-actions">
        <button onClick={() => onChangeQty(item.id, -1)}>-</button>

        <span>{qty}</span>

        <button onClick={() => onChangeQty(item.id, 1)}>+</button>

        <button onClick={() => onRemove(item.id)}>Remove</button>
      </div>
    </div>
  );
}

export default CartItem;
