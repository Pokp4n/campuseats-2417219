import { Link, useParams, useOutletContext } from "react-router";
import { useVendors } from "../hooks/useVendors.js";
import MenuList from "../components/MenuList.jsx";

function VendorPage() {
  const { id } = useParams();

  const { vendors, loading, error, reload } = useVendors();

  const { recordView } = useOutletContext();

  const vendor = vendors.find((v) => v.id === id);

  if (loading) {
    return <p>Loading menu...</p>;
  }

  if (error) {
    return (
      <section>
        <p role="alert">Error: {error}</p>
        <button type="button" onClick={reload}>
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

  function handleViewItem(item) {
    recordView(item, vendor);
  }

  return (
    <section>
      <h2 className="section-title">Menu: {vendor.name}</h2>

      <p className="muted">{vendor.location}</p>
      <p className="muted">Open: {vendor.openHours}</p>

      <MenuList items={vendor.menu} onView={handleViewItem} />

      <p>
        <Link to="/">Back to Vendors</Link>
      </p>
    </section>
  );
}

export default VendorPage;
