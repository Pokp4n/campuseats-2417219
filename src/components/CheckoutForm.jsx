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
    <section className="checkout-panel">
      <h2 className="section-title">Checkout Details</h2>

      <form className="checkout-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="customer-name">Full Name</label>
          <input
            className="form-input"
            id="customer-name"
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="form-error" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="customer-phone">Phone Number</label>
          <input
            className="form-input"
            id="customer-phone"
            type="tel"
            placeholder="e.g. 0123456789"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {errors.phone && (
            <p id="phone-error" className="form-error" role="alert">
              {errors.phone}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="pickup-location">Pickup Location</label>
          <input
            className="form-input"
            id="pickup-location"
            type="text"
            placeholder="e.g. Mahallah Zubair"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            aria-invalid={Boolean(errors.location)}
            aria-describedby={errors.location ? "location-error" : undefined}
          />
          {errors.location && (
            <p id="location-error" className="form-error" role="alert">
              {errors.location}
            </p>
          )}
        </div>

        <div className="checkout-actions">
          <button className="btn" type="submit">
            Place Order
          </button>

          <button className="btn-secondary" type="button" onClick={onBack}>
            Back to Cart
          </button>
        </div>
      </form>
    </section>
  );
}

export default CheckoutForm;
