import { useLocalStorage } from "./useLocalStorage.js";

const MAX_RECENT_ITEMS = 5;

export function useRecentlyViewed(userId) {
  // Each signed-in user gets a separate storage key
  const storageKey = `ce-recent-${userId}`;

  const [recentlyViewed, setRecentlyViewed] = useLocalStorage(storageKey, []);

  function recordView(item, vendor) {
    const newEntry = {
      itemId: item.id,
      itemName: item.name,
      vendorId: vendor.id,
      vendorName: vendor.name,
    };

    setRecentlyViewed((previous) => {
      // Remove the item if it already exists in history
      const withoutDuplicate = previous.filter(
        (entry) => !(entry.itemId === item.id && entry.vendorId === vendor.id),
      );

      // Add the newest item first, keeping only five items
      return [newEntry, ...withoutDuplicate].slice(0, MAX_RECENT_ITEMS);
    });
  }

  function clearRecentlyViewed() {
    setRecentlyViewed([]);
  }

  return {
    recentlyViewed,
    recordView,
    clearRecentlyViewed,
  };
}
