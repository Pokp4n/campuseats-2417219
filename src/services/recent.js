import { doc, onSnapshot, runTransaction, setDoc } from "firebase/firestore";

import { db } from "../firebase.js";

const MAX_RECENT_ITEMS = 5;

// READ: Listen to a user's recently viewed history
export function subscribeToRecent(uid, onData, onError) {
  const ref = doc(db, "recent", uid);

  return onSnapshot(
    ref,
    (snapshot) => {
      const items = snapshot.exists() ? snapshot.data().items : [];

      onData(Array.isArray(items) ? items : []);
    },
    onError,
  );
}

// CREATE / UPDATE: Record a viewed menu item
export async function recordRecent(uid, item, vendor) {
  const ref = doc(db, "recent", uid);

  const newEntry = {
    itemId: item.id,
    itemName: item.name,
    vendorId: vendor.id,
    vendorName: vendor.name,
  };

  await runTransaction(db, async (transaction) => {
    const snapshot = await transaction.get(ref);

    const previous = snapshot.exists() ? (snapshot.data().items ?? []) : [];

    // Remove duplicates of the same menu item
    const withoutDuplicate = previous.filter(
      (entry) => !(entry.itemId === item.id && entry.vendorId === vendor.id),
    );

    // Newest first, maximum five items
    const updated = [newEntry, ...withoutDuplicate].slice(0, MAX_RECENT_ITEMS);

    transaction.set(ref, { items: updated }, { merge: true });
  });
}

// DELETE HISTORY: Clear the user's saved items
export function clearRecent(uid) {
  return setDoc(doc(db, "recent", uid), { items: [] }, { merge: true });
}
