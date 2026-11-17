import { Link, useParams, useOutletContext } from "react-router";
import { useVendor } from "../hooks/useVendor.js";
import MenuList from "../components/MenuList.jsx";

function VendorPage() {
  const { id } = useParams();

  // Get this vendor and its menu from Firestore
  const { vendor, menu, loading, error } = useVendor(id);

  // Keep our Week 5 Recently Viewed feature
  const { recordView } = useOutletContext();

  if (loading) {
    return <p>Loading menu...</p>;
  }

  if (error) {
    return (
      <section>
        <p role="alert">Error: {error}</p>
        <button type="button" onClick={() => window.location.reload()}>
          Try again
        </button>
      </section>
    );
  }

  if (!vendor) {
    return (
      <section>
        <h2 className="section-title">Vendor not found</h2>
        <p>The restaurant you are looking for does not exist.</p>
        <Link to="/">Back to Vendors</Link>
      </section>
    );
  }

  // Include vendor name so the cart knows the item's shop
  const items = menu.map((item) => ({
    ...item,
    vendorName: vendor.name,
  }));

  // Record an item when its name is clicked
  function handleViewItem(item) {
    recordView(item, vendor);
  }

  return (
    <section>
      <h2 className="section-title">Menu: {vendor.name}</h2>

      <p className="muted">{vendor.location}</p>
      <p className="muted">Open: {vendor.openHours}</p>

      <MenuList items={items} onView={handleViewItem} />

      <p>
        <Link to="/">Back to Vendors</Link>
      </p>
    </section>
  );
}

export default VendorPage;
