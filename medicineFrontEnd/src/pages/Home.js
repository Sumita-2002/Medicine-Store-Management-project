import { FaClinicMedical, FaPlus } from "react-icons/fa";
import { useState } from "react";
import "./Home.css";

function Home() {
  const username = localStorage.getItem("username");

  const [showModal, setShowModal] = useState(false);
  const [medicine, setMedicine] = useState({
    name: "",
    price: "",
    quantity: "",
    description: "",
  });

  const handleChange = (e) => {
    setMedicine({ ...medicine, [e.target.name]: e.target.value });
  };

  // ✅ Updated handleSubmit to save medicine in database
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/medicines", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(medicine),
      });

      if (!response.ok) throw new Error("Failed to add medicine");

      const data = await response.json();
      console.log("Medicine added:", data);

      alert("Medicine added successfully!");

      // Clear form & close modal
      setMedicine({ name: "", price: "", quantity: "", description: "" });
      setShowModal(false);
    } catch (error) {
      console.error("Error adding medicine:", error);
      alert("Failed to add medicine");
    }
  };

  return (
    <div className="home-page">
      <div className="stars-bg" />

      <div className="home-content">
        <FaClinicMedical className="home-icon" />
        <h1 className="home-title">
          Welcome to <span>Mita Medicine Store</span>
        </h1>

        {username && (
          <h3 style={{ color: "#22c55e", marginBottom: "10px", fontSize: "24px" }}>
            👋 Hello, <strong>{username}</strong>
          </h3>
        )}

        <p className="home-desc">
          Trusted healthcare products, quality medicines, and fast delivery.
          Your health is our priority.
        </p>

        <div className="home-buttons">
          <button className="add-medicine-btn" onClick={() => setShowModal(true)}>
            <FaPlus /> Add Medicine
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Medicine</h2>
            <form className="form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Medicine Name"
                value={medicine.name}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={medicine.price}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={medicine.quantity}
                onChange={handleChange}
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                rows="3"
                value={medicine.description}
                onChange={handleChange}
              />

              <div className="form-buttons">
                <button type="submit" className="btn">Submit</button>
                <button type="button" className="btn" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;


