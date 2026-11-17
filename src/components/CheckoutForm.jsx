import { useState } from "react";

function CheckoutForm({ defaultName = "", onSubmit, onBack }) {
  const [name, setName] = useState(defaultName);
  const [mahallah, setMahallah] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [errors, setErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};

    // Validate student name
    if (!name.trim()) {
      newErrors.name = "Name is required.";
    }

    // Validate mahallah
    if (!mahallah.trim()) {
      newErrors.mahallah = "Mahallah is required.";
    }

    // Validate pickup time
    if (!pickupTime || pickupTime < "07:00" || pickupTime > "22:00") {
      newErrors.pickupTime =
        "Pickup time must be between 7:00 AM and 10:00 PM.";
    }

    setErrors(newErrors);

    // Submit only when there are no errors
    if (Object.keys(newErrors).length === 0) {
      onSubmit({
        name: name.trim(),
        mahallah: mahallah.trim(),
        pickupTime,
      });
    }
  }

  return (
    <section className="checkout-panel">
      <h2 className="section-title">Checkout Details</h2>

      <form className="checkout-form" onSubmit={handleSubmit} noValidate>
        {/* Student Name */}
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
          />

          {errors.name && (
            <p className="form-error" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        {/* Mahallah */}
        <div className="form-group">
          <label htmlFor="customer-mahallah">Mahallah</label>

          <input
            className="form-input"
            id="customer-mahallah"
            type="text"
            placeholder="e.g. Mahallah Zubair"
            value={mahallah}
            onChange={(e) => setMahallah(e.target.value)}
            aria-invalid={Boolean(errors.mahallah)}
          />

          {errors.mahallah && (
            <p className="form-error" role="alert">
              {errors.mahallah}
            </p>
          )}
        </div>

        {/* Pickup Time */}
        <div className="form-group">
          <label htmlFor="pickup-time">Pickup Time</label>

          <input
            className="form-input"
            id="pickup-time"
            type="time"
            min="07:00"
            max="22:00"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            aria-invalid={Boolean(errors.pickupTime)}
          />

          {errors.pickupTime && (
            <p className="form-error" role="alert">
              {errors.pickupTime}
            </p>
          )}
        </div>

        {/* Checkout Buttons */}
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
