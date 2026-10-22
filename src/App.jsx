import CartPage from "./components/CartPage.jsx";
import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import VendorCard from "./components/VendorCard.jsx";
import MenuList from "./components/MenuList.jsx";
import Footer from "./components/Footer.jsx";
import CheckoutForm from "./components/CheckoutForm.jsx";

function App() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  const [selectedVendorId, setSelectedVendorId] = useState(null);
  const [cart, setCart] = useState([]);
  const [view, setView] = useState("menu");
  const [lastOrder, setLastOrder] = useState(null);
  const [sortBy, setSortBy] = useState("default");

  const selectedVendor = vendors.find((v) => v.id === selectedVendorId);

  const sortedMenu = selectedVendor
    ? [...selectedVendor.menu].sort((a, b) => {
        if (sortBy === "price-low") {
          return a.price - b.price;
        }

        if (sortBy === "price-high") {
          return b.price - a.price;
        }

        return 0;
      })
    : [];

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    setError(null);
    fetch("/api/vendors.json", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        return res.json();
      })

      .then((data) => {
        setVendors(data);
        setSelectedVendorId((current) => current ?? data[0]?.id ?? null);
      })

      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [reloadKey]);

  function handleAddToCart(item) {
    setCart((prev) => {
      const existing = prev.find((line) => line.item.id === item.id);

      if (existing) {
        return prev.map((line) =>
          line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line,
        );
      }

      return [...prev, { item, qty: 1 }];
    });
  }

  function handleChangeQty(itemId, delta) {
    setCart((prev) =>
      prev
        .map((line) =>
          line.item.id === itemId ? { ...line, qty: line.qty + delta } : line,
        )
        .filter((line) => line.qty > 0),
    );
  }

  function handleRemove(itemId) {
    setCart((prev) => prev.filter((line) => line.item.id !== itemId));
  }

  const cartCount = cart.reduce((sum, line) => sum + line.qty, 0);

  function handlePlaceOrder(customer) {
    if (cart.length === 0) return;

    const total = cart.reduce(
      (sum, line) => sum + line.item.price * line.qty,
      0,
    );

    setLastOrder({
      customer,
      items: cart,
      total,
    });

    setCart([]);
    setView("done");
  }

  let content;

  if (view === "cart") {
    content = (
      <CartPage
        cart={cart}
        onChangeQty={handleChangeQty}
        onRemove={handleRemove}
        onCheckout={() => setView("checkout")}
        onBack={() => setView("menu")}
      />
    );
  } else if (view === "checkout") {
    content = (
      <CheckoutForm
        onSubmit={handlePlaceOrder}
        onBack={() => setView("cart")}
      />
    );
  } else if (view === "done") {
    content = (
      <section>
        <h2 className="section-title">Order Confirmed!</h2>
        <p>Thank you, {lastOrder?.customer.name}!</p>
        <p>Total paid: RM {lastOrder?.total.toFixed(2)}</p>

        <button onClick={() => setView("menu")}>Back to Menus</button>
      </section>
    );
  } else {
    content = (
      <>
        <section>
          <h2 className="section-title">Choose a vendor</h2>

          <div className="vendor-grid">
            {vendors.map((vendor) => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                isSelected={vendor.id === selectedVendorId}
                onSelect={setSelectedVendorId}
              />
            ))}
          </div>
        </section>

        {selectedVendor && (
          <section>
            <h2 className="section-title">Menu: {selectedVendor.name}</h2>

            <label htmlFor="sort-menu">Sort menu by: </label>

            <select
              id="sort-menu"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>

            <MenuList items={sortedMenu} onAdd={handleAddToCart} />
          </section>
        )}
      </>
    );
  }

  return (
    <>
      <Header cartCount={cartCount} onNavigate={setView} />

      <main className="container">
        {loading && <p>Loading menus...</p>}

        {error && (
          <div role="alert">
            <p>Error: {error}</p>
            <button onClick={() => setReloadKey((k) => k + 1)}>
              Try again
            </button>
          </div>
        )}

        {content}
      </main>

      <Footer />
    </>
  );
}
export default App;
