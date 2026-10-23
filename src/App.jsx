import { useState } from "react";
import vendors from "./data/vendors.js";
import Header from "./components/Header.jsx";
import VendorCard from "./components/VendorCard.jsx";
import MenuList from "./components/MenuList.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  const [selectedVendorId, setSelectedVendorId] = useState(vendors[0].id);
  const [cart, setCart] = useState([]);

  const selectedVendor = vendors.find((v) => v.id === selectedVendorId);

  function handleAddToCart(item) {
    setCart((prev) => [...prev, item]);
  }

  return (
    <>
      <Header cartCount={cart.length} />

      <main className="container">
        {/* Section 1: Choose a vendor */}
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

        {/* Section 2: Display selected vendor's menu */}
        <section>
          <h2 className="section-title">Menu: {selectedVendor.name}</h2>

          {/* B5: Sort by Price or Popularity */}
          <div className="sort-container">
            <label htmlFor="sort-menu">Sort by: </label>

            <select id="sort-menu" defaultValue="default">
              <option value="default">Default</option>
              <option value="price">Price</option>
              <option value="popularity">Popularity</option>
            </select>
          </div>

          <MenuList items={selectedVendor.menu} onAdd={handleAddToCart} />
        </section>
      </main>

      <Footer />
    </>
  );
}

export default App;
