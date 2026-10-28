import { useLocalStorage } from "./useLocalStorage.js";

const MAX_RECENT_ITEMS = 5;

export function useRecentlyViewed() {
  const [recentlyViewed, setRecentlyViewed] = useLocalStorage(
    "campuseats-recently-viewed",
    [],
  );

  function recordView(item, vendor) {
    const newEntry = {
      itemId: item.id,
      itemName: item.name,
      vendorId: vendor.id,
      vendorName: vendor.name,
    };

    setRecentlyViewed((previous) => {
      const withoutDuplicate = previous.filter(
        (entry) => !(entry.itemId === item.id && entry.vendorId === vendor.id),
      );

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
