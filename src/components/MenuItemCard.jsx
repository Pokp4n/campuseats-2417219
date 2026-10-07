function MenuItemCard() {
  const item = {
    name: "Nasi Bangla",
    description: "Rice served with chicken and kuah kari",
    price: 5.0,
    available: true,
  };

  return (
    <article className="card menu-card">
      <div className="thumb" aria-hidden="true">
        {item.name.charAt(0)}
      </div>

      <h3>{item.name}</h3>
      <p className="muted">{item.description}</p>
      <p className="price">RM {item.price.toFixed(2)}</p>

      <button className="btn" disabled={!item.available}>
        {item.available ? "Add to cart" : "Sold out"}
      </button>
    </article>
  );
}

export default MenuItemCard;
