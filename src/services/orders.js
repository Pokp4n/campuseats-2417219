import {
  collection,
  doc,
  onSnapshot,
  query,
  where,
  serverTimestamp,
  writeBatch,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "../firebase.js";

// CREATE: Place one order per vendor
export async function placeOrders(user, cart, details) {
  const byVendor = new Map();

  // Group cart items according to their vendor
  for (const line of cart) {
    const lines = byVendor.get(line.item.vendorId) ?? [];

    byVendor.set(line.item.vendorId, [...lines, line]);
  }

  const batch = writeBatch(db);

  // Create a separate order document for each vendor
  for (const [vendorId, lines] of byVendor) {
    const ref = doc(collection(db, "orders"));

    batch.set(ref, {
      studentUid: user.uid,
      studentName: details.name,
      mahallah: details.mahallah,
      pickupTime: details.pickupTime,
      vendorId,
      vendorName: lines[0].item.vendorName,

      items: lines.map(({ item, qty }) => ({
        itemId: item.id,
        name: item.name,
        price: item.price,
        qty,
      })),

      total: lines.reduce((sum, { item, qty }) => sum + item.price * qty, 0),

      status: "Received",
      createdAt: serverTimestamp(),
    });
  }

  await batch.commit();
}

// READ: Listen to the signed-in student's orders
export function subscribeToMyOrders(uid, onData, onError) {
  const q = query(collection(db, "orders"), where("studentUid", "==", uid));

  return onSnapshot(
    q,
    (snapshot) => {
      const orders = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      // Display newest orders first
      orders.sort(
        (a, b) =>
          (b.createdAt?.toMillis?.() ?? Date.now()) -
          (a.createdAt?.toMillis?.() ?? Date.now()),
      );

      onData(orders);
    },
    onError,
  );
}

// UPDATE: Change the pickup time of an existing order
export function changePickupTime(orderId, pickupTime) {
  return updateDoc(doc(db, "orders", orderId), {
    pickupTime,
  });
}

// DELETE: Cancel an order by deleting its document
export function cancelOrder(orderId) {
  return deleteDoc(doc(db, "orders", orderId));
}
