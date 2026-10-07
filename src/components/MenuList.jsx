import MenuItemCard from "./MenuItemCard.jsx";

function MenuList({ items }) {
  return (
    <div className="grid">
      {items.map((item) => (
        <MenuItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export default MenuList;
