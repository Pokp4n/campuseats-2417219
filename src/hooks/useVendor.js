import { useEffect, useState } from "react";
import { subscribeToVendor, subscribeToMenu } from "../services/vendors.js";

// Read one vendor and its menu from Firestore
export function useVendor(vendorId) {
  const [vendor, setVendor] = useState(undefined);
  const [menu, setMenu] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Listen to the selected vendor
    const stopVendor = subscribeToVendor(vendorId, setVendor, (err) =>
      setError(err.message),
    );

    // Listen to the vendor's menu
    const stopMenu = subscribeToMenu(vendorId, setMenu, (err) =>
      setError(err.message),
    );

    // Stop both listeners when the component unmounts
    return () => {
      stopVendor();
      stopMenu();
    };
  }, [vendorId]);

  return {
    vendor,
    menu,
    loading: vendor === undefined && !error,
    error,
  };
}
