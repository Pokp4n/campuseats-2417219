function MenuItemCard({ item, onAdd, onView }) {
  return (
    <article className="card menu-card">
      <div className="thumb" aria-hidden="true">
        {item.name.charAt(0)}
      </div>

      <h3>
        <button
          type="button"
          onClick={() => onView(item)}
          title="View this menu item"
          style={{
            background: "none",
            border: "none",
            padding: 0,
            color: "inherit",
            font: "inherit",
            textAlign: "left",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          {item.name}
        </button>
      </h3>

      <p className="tag">{item.category}</p>
      <p className="muted">{item.description}</p>
      <p className="price">RM {item.price.toFixed(2)}</p>

      <button
        className="btn"
        disabled={!item.available}
        onClick={() => onAdd(item)}
      >
        {item.available ? "Add to cart" : "Sold out"}
      </button>
    </article>
  );
}

export default MenuItemCard;
