import { useState } from "react";
import vendors from "./data/vendors.js";
import Header from "./components/Header.jsx";
import VendorCard from "./components/VendorCard.jsx";
import MenuList from "./components/MenuList.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  const [selectedVendorId, setSelectedVendorId] = useState(vendors[0].id);
  const [cart, setCart] = useState([]);

  // B5: Store the last 3 selected vendor IDs
  const [recentlyViewedIds, setRecentlyViewedIds] = useState([vendors[0].id]);

  const selectedVendor = vendors.find((v) => v.id === selectedVendorId);

  // Select a vendor and update recently viewed
  function handleSelectVendor(id) {
    setSelectedVendorId(id);

    setRecentlyViewedIds((prev) => {
      const updated = [id, ...prev.filter((vendorId) => vendorId !== id)];
      return updated.slice(0, 3);
    });
  }

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
                onSelect={handleSelectVendor}
              />
            ))}
          </div>
        </section>

        {/* B5: Recently viewed vendors */}
        <section>
          <h2 className="section-title">Recently viewed</h2>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {recentlyViewedIds.map((id) => {
              const vendor = vendors.find((v) => v.id === id);

              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleSelectVendor(id)}
                >
                  {vendor.name}
                </button>
              );
            })}
          </div>
        </section>

        {/* Section 2: Display selected vendor's menu */}
        <section>
          <h2 className="section-title">Menu: {selectedVendor.name}</h2>

          <MenuList items={selectedVendor.menu} onAdd={handleAddToCart} />
        </section>
      </main>

      <Footer />
    </>
  );
}

export default App;
