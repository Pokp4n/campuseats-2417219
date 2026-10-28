import { Link } from "react-router";
import { useCart } from "../hooks/useCart.js";

function OrdersPage() {
  const { orders } = useCart();

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
          {orders.map((order) => (
            <div className="card" key={order.id}>
              <h3>Order #{order.id.slice(0, 8)}</h3>

              <p>Customer: {order.customer.name}</p>

              <p>Date: {new Date(order.createdAt).toLocaleString()}</p>

              <h4>Items:</h4>

              <ul>
                {order.items.map((line) => (
                  <li key={line.item.id}>
                    {line.qty} x {line.item.name} - RM{" "}
                    {(line.item.price * line.qty).toFixed(2)}
                  </li>
                ))}
              </ul>

              <h3>Total: RM {order.total.toFixed(2)}</h3>
            </div>
          ))}

          <p>
            <Link to="/">Back to Vendors</Link>
          </p>
        </>
      )}
    </section>
  );
}

export default OrdersPage;
