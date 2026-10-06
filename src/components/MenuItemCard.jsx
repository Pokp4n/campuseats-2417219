function MenuItemCard() {
  const item = {
    name: "Nasi Bangla",
    description: "Rice served with chicken and kuah kari",
    price: 5.0,
    available: true,
  };

  return (
    <div className="menu-item-card">
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <p>RM {item.price.toFixed(2)}</p>

      <button className="btn" disabled={!item.available}>
        {item.available ? "Add to Cart" : "Sold Out"}
      </button>
    </div>
  );
}

export default MenuItemCard;
