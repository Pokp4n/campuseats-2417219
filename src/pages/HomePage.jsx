import { Link, useOutletContext } from "react-router";
import { useVendors } from "../hooks/useVendors.js";
import VendorCard from "../components/VendorCard.jsx";

function HomePage() {
  const { vendors, loading, error, reload } = useVendors();

  const { recentlyViewed, clearRecentlyViewed } = useOutletContext();

  return (
    <>
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

      <section>
        <h2 className="section-title">Recently Viewed</h2>

        {recentlyViewed.length === 0 ? (
          <p>No recently viewed items yet.</p>
        ) : (
          <>
            <div className="grid">
              {recentlyViewed.map((entry) => (
                <div className="card" key={`${entry.vendorId}-${entry.itemId}`}>
                  <h3>
                    <Link to={`/vendor/${entry.vendorId}`}>
                      {entry.itemName}
                    </Link>
                  </h3>

                  <p className="muted">From: {entry.vendorName}</p>
                </div>
              ))}
            </div>

            <button type="button" onClick={clearRecentlyViewed}>
              Clear History
            </button>
          </>
        )}
      </section>
    </>
  );
}

export default HomePage;
