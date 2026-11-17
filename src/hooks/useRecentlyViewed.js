import { useEffect, useState } from "react";

import {
  subscribeToRecent,
  recordRecent,
  clearRecent,
} from "../services/recent.js";

export function useRecentlyViewed(userId) {
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [recentError, setRecentError] = useState(null);

  // READ: Listen to the user's history in Firestore
  useEffect(() => {
    if (!userId) return;

    const unsubscribe = subscribeToRecent(
      userId,
      (items) => {
        setRecentlyViewed(items);
        setRecentError(null);
      },
      (err) => {
        setRecentError(err.message);
        console.error("Could not load recent history:", err);
      },
    );

    // Stop listening when the user changes or leaves
    return unsubscribe;
  }, [userId]);

  // CREATE / UPDATE: Record a viewed menu item
  function recordView(item, vendor) {
    if (!userId) return;

    recordRecent(userId, item, vendor).catch((err) => {
      setRecentError(err.message);
      console.error("Could not record viewed item:", err);
    });
  }

  // CLEAR: Remove all items from the cloud history
  function clearRecentlyViewed() {
    if (!userId) return;

    clearRecent(userId).catch((err) => {
      setRecentError(err.message);
      console.error("Could not clear recent history:", err);
    });
  }

  return {
    recentlyViewed,
    recordView,
    clearRecentlyViewed,
    recentError,
  };
}
