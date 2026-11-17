import { Link } from "react-router";
import { useMyOrders } from "../hooks/useMyOrders.js";
import OrderStatus from "../components/OrderStatus.jsx";
import OrderActions from "../components/OrderActions.jsx";

function OrdersPage() {
  const { orders, loading, error } = useMyOrders();

  // Wait for Firestore to load the orders
  if (loading) {
    return <p>Loading your orders...</p>;
  }

  // Show any Firestore errors
  if (error) {
    return (
      <section>
        <h2 className="section-title">My Orders</h2>
        <p role="alert">Error: {error}</p>
      </section>
    );
  }

  return (
    <section>
      <h2 className="section-title">My Orders</h2>

      {orders.length === 0 ? (
        <>
          <p>You have not placed any orders yet.</p>
          <Link to="/">Browse Vendors</Link>
        </>
      ) : (
        <>
          <div className="order-list">
            {orders.map((order) => (
              <div className="card" key={order.id}>
                <h3>Order #{order.id.slice(0, 8)}</h3>

                <p className="cart-name">
                  {order.vendorName} · Pickup {order.pickupTime}
                </p>

                <p className="muted">Student: {order.studentName}</p>

                <p className="muted">Mahallah: {order.mahallah}</p>

                <h4>Items:</h4>

                <ul>
                  {order.items.map((item) => (
                    <li key={item.itemId}>
                      {item.qty} x {item.name} - RM{" "}
                      {(item.price * item.qty).toFixed(2)}
                    </li>
                  ))}
                </ul>

                <p className="muted">
                  Placed:{" "}
                  {order.createdAt
                    ? order.createdAt.toDate().toLocaleString("en-MY")
                    : "just now"}
                </p>

                <h3>Total: RM {order.total.toFixed(2)}</h3>

                {/* READ: Live order status from Firestore */}
                <OrderStatus status={order.status} />

                {/* UPDATE / DELETE: Only while Received */}
                {order.status === "Received" && <OrderActions order={order} />}
              </div>
            ))}
          </div>

          <p>
            <Link to="/">Back to Vendors</Link>
          </p>
        </>
      )}
    </section>
  );
}

export default OrdersPage;
