import { useState } from "react";

function CheckoutForm({ onSubmit, onBack }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [errors, setErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!/^[0-9]{10,11}$/.test(phone)) {
      newErrors.phone = "Enter a valid 10-11 digit phone number.";
    }

    if (!location.trim()) {
      newErrors.location = "Pickup location is required.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit({
        name: name.trim(),
        phone,
        location: location.trim(),
      });
    }
  }

  return (
    <section>
      <h2 className="section-title">Checkout</h2>

      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="customer-name">Full Name</label>
          <input
            id="customer-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p role="alert">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="customer-phone">Phone Number</label>
          <input
            id="customer-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors.phone && <p role="alert">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="pickup-location">Pickup Location</label>
          <input
            id="pickup-location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          {errors.location && <p role="alert">{errors.location}</p>}
        </div>

        <button type="submit">Place Order</button>
        <button type="button" onClick={onBack}>
          Back to Cart
        </button>
      </form>
    </section>
  );
}

export default CheckoutForm;
