function VendorCard() {
  const vendor = {
    name: "Cafe Zubair",
    location: "Mahallah Zubair, International Islamic University Malaysia",
    openHours: "8:00 AM - 11:00 PM",
    isOpen: true,
  };

  return (
    <div className="vendor-card">
      <div className="thumb">{vendor.name.charAt(0)}</div>
      <h2>{vendor.name}</h2>
      <p>{vendor.location}</p>
      <p>Opening hours: {vendor.openHours}</p>

      <p className={vendor.isOpen ? "status open" : "status closed"}>
        {vendor.isOpen ? "Open now" : "Closed"}
      </p>
    </div>
  );
}

export default VendorCard;
