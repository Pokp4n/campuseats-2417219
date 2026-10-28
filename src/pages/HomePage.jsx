import { useVendors } from "../hooks/useVendors.js";
import VendorCard from "../components/VendorCard.jsx";

function HomePage() {
  const { vendors, loading, error, reload } = useVendors();

  return (
    <section>
      <h2 className="section-title">Choose a vendor</h2>

      {loading && <p>Loading vendors...</p>}

      {error && (
        <div role="alert">
          <p>Error: {error}</p>
          <button type="button" onClick={reload}>
            Try again
          </button>
        </div>
      )}

      {!loading && !error && (
        <div className="vendor-grid">
          {vendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      )}
    </section>
  );
}

export default HomePage;
