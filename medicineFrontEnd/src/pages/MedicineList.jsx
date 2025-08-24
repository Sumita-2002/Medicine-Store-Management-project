import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MedicineList.css";

const MedicineList = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true); // Loader
  const [error, setError] = useState(null); // Error tracking

  // ✅ Load medicine data from backend on page load
  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/medicines");
      console.log("Fetched medicines:", response.data); // ✅ Check console
      setMedicines(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching medicines:", error);
      setError("Failed to load medicine data.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    alert(`Edit Medicine ID: ${id}`);
    // Later open modal to edit medicine
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this medicine?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8080/api/medicines/${id}`);
      setMedicines(medicines.filter((med) => med.id !== id));
    } catch (error) {
      console.error("Error deleting medicine:", error);
      alert("Failed to delete the medicine.");
    }
  };

  return (
    <div className="medicine-list-container">
      <h2>📋 Medicine List</h2>

      {loading ? (
        <p>Loading medicines...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : medicines.length === 0 ? (
        <p>No medicines found.</p>
      ) : (
        <table className="medicine-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price (₹)</th>
              <th>Quantity</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((medicine) => (
              <tr key={medicine.id}>
                <td>{medicine.name}</td>
                <td>{medicine.price}</td>
                <td>{medicine.quantity}</td>
                <td>{medicine.description || "N/A"}</td>
                <td>
                  <button onClick={() => handleEdit(medicine.id)}>✏️ Edit</button>{" "}
                  <button onClick={() => handleDelete(medicine.id)}>🗑️ Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MedicineList;
