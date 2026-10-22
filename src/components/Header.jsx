function Header({ cartCount, onNavigate }) {
  return (
    <header className="header">
      <h1 className="logo">CampusEats</h1>

      <nav className="nav">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onNavigate("menu");
          }}
        >
          Vendors
        </a>

        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onNavigate("cart");
          }}
        >
          My Orders
        </a>

        <a
          href="#"
          className="cart"
          onClick={(e) => {
            e.preventDefault();
            onNavigate("cart");
          }}
        >
          Cart <span className="badge">{cartCount}</span>
        </a>
      </nav>
    </header>
  );
}

export default Header;
