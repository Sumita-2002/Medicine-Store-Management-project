import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Selling.css";

const SellingPage = () => {
  const [medicines, setMedicines] = useState([]);
  const [rows, setRows] = useState([
    { medicineId: "", price: 0, quantity: 1, total: 0 },
  ]);
  const maxRows = 10;

  useEffect(() => {
    // Fetch medicine list from backend
    axios
      .get("http://localhost:8080/api/medicines") // Your Spring Boot GET API
      .then((res) => setMedicines(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleMedicineChange = (index, medId) => {
    const med = medicines.find((m) => m.id === parseInt(medId));
    const newRows = [...rows];
    newRows[index].medicineId = medId;
    newRows[index].price = med ? med.price : 0;
    newRows[index].total =
      newRows[index].price * newRows[index].quantity;
    setRows(newRows);
  };

  const handleQuantityChange = (index, quantity) => {
    const newRows = [...rows];
    newRows[index].quantity = quantity;
    newRows[index].total = newRows[index].price * quantity;
    setRows(newRows);
  };

  const addRow = () => {
    if (rows.length < maxRows) {
      setRows([...rows, { medicineId: "", price: 0, quantity: 1, total: 0 }]);
    }
  };

  const removeRow = (index) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  };

  const confirmSell = () => {
    // Prepare data to send to backend for PDF generation
    const sellData = rows.map((r) => ({
      medicineId: r.medicineId,
      quantity: r.quantity,
    }));

    axios
      .post("http://localhost:8080/api/sell/confirm", sellData, {
        responseType: "blob",
      })
      .then((res) => {
        // Download PDF
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "bill.pdf");
        document.body.appendChild(link);
        link.click();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="selling-container">
      <h2>Sell Medicines</h2>
      {rows.map((row, index) => (
        <div className="selling-row" key={index}>
          <select
            value={row.medicineId}
            onChange={(e) => handleMedicineChange(index, e.target.value)}
          >
            <option value="">Select Medicine</option>
            {medicines.map((med) => (
              <option key={med.id} value={med.id}>
                {med.name}
              </option>
            ))}
          </select>

          <input type="number" value={row.price} readOnly />

          <input
            type="number"
            value={row.quantity}
            min="1"
            onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
          />

          <input type="number" value={row.total} readOnly />

          {index === rows.length - 1 && rows.length < maxRows && (
            <button onClick={addRow}>Add Medicine</button>
          )}

          {rows.length > 1 && (
            <button onClick={() => removeRow(index)}>Remove</button>
          )}
        </div>
      ))}

      <div className="confirm-btn">
        <button onClick={confirmSell}>Confirm Sell & Generate PDF</button>
      </div>

      <h3>Selected Medicines</h3>
      <table>
        <thead>
          <tr>
            <th>Medicine Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            const med = medicines.find((m) => m.id === parseInt(row.medicineId));
            return (
              <tr key={index}>
                <td>{med ? med.name : ""}</td>
                <td>{row.price}</td>
                <td>{row.quantity}</td>
                <td>{row.total}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SellingPage;
