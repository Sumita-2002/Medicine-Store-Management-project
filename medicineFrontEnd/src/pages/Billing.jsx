// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { jsPDF } from 'jspdf';
// import './Billing.css';

// const Billing = () => {
//   const [medicines, setMedicines] = useState([]);
//   const [selectedMedicineId, setSelectedMedicineId] = useState('');
//   const [quantity, setQuantity] = useState(1);
//   const [billDetails, setBillDetails] = useState(null);

//   useEffect(() => {
//     fetchMedicines();
//   }, []);

//   const fetchMedicines = () => {
//     axios.get('http://localhost:8080/api/medicines')
//       .then(res => setMedicines(res.data))
//       .catch(err => console.error('Error fetching medicines:', err));
//   };

//   const handleGenerateBill = async () => {
//     if (!selectedMedicineId || quantity <= 0) {
//       alert("Please select a medicine and enter a valid quantity.");
//       return;
//     }

//     const med = medicines.find(m => m.id === Number(selectedMedicineId));
//     if (!med) return;

//     const totalPrice = med.price * quantity;
//     const date = new Date();
//     const dateString = date.toLocaleString();

//     // Generate PDF WITHOUT QR code
//     const doc = new jsPDF();
//     doc.setFontSize(16);
//     doc.text("Good Health Pharmacy", 20, 20);
//     doc.setFontSize(12);
//     doc.text(`Customer: Sumita Mondal`, 20, 30);
//     doc.text(`Medicine: ${med.name}`, 20, 40);
//     doc.text(`Price per Unit: ₹${med.price}`, 20, 50);
//     doc.text(`Quantity: ${quantity}`, 20, 60);
//     doc.text(`Total: ₹${totalPrice}`, 20, 70);
//     doc.text(`Shop: Good Health Pharmacy`, 20, 80);
//     doc.text(`Location: Kolkata, India`, 20, 90);
//     doc.text(`Date & Time: ${dateString}`, 20, 100);
//     doc.save(`Bill_Sumita_${dateString.replace(/[: ]/g,'_')}.pdf`);

//     // Save bill to backend
//     try {
//       const billRequest = {
//         customerName: 'Sumita Mondal',
//         medicineIds: [med.id],
//         quantities: { [med.id]: quantity }
//       };
//       await axios.post('http://localhost:8080/api/billing/generate', billRequest);

//       // Update frontend bill details WITH QR code
//       setBillDetails({
//         customer: 'Sumita Mondal',
//         medicine: med.name,
//         price: med.price,
//         quantity,
//         totalPrice,
//         date: dateString,
//         shop: "Good Health Pharmacy",
//         location: "Kolkata, India",
//         qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=pharmacy@upi&pn=GoodHealthPharmacy&am=${totalPrice}`
//       });

//       setSelectedMedicineId('');
//       setQuantity(1);
//     } catch (err) {
//       console.error('Error saving bill:', err);
//       alert('Failed to save bill.');
//     }
//   };

//   return (
//     <div className="bill-details">
//       <h3>Medicine Billing</h3>

//       <div className="billing-form">
//         <label>Select Medicine:</label>
//         <select value={selectedMedicineId} onChange={e => setSelectedMedicineId(e.target.value)}>
//           <option value="">-- Select Medicine --</option>
//           {medicines.map(m => (
//             <option key={m.id} value={m.id}>{m.name} - ₹{m.price}</option>
//           ))}
//         </select>

//         <label>Quantity:</label>
//         <input type="number" min="1" value={quantity} onChange={e => setQuantity(Number(e.target.value))} />

//         <button className="generate-bill-btn" onClick={handleGenerateBill}>
//           Generate & Download Bill
//         </button>
//       </div>

//       {billDetails && (
//         <div className="bill-info">
//           <h4>Bill Summary</h4>
//           <p><strong>Customer:</strong> {billDetails.customer}</p>
//           <p><strong>Medicine:</strong> {billDetails.medicine}</p>
//           <p><strong>Price per Unit:</strong> ₹{billDetails.price}</p>
//           <p><strong>Quantity:</strong> {billDetails.quantity}</p>
//           <p><strong>Total:</strong> ₹{billDetails.totalPrice}</p>
//           <p><strong>Shop:</strong> {billDetails.shop}</p>
//           <p><strong>Location:</strong> {billDetails.location}</p>
//           <p><strong>Date & Time:</strong> {billDetails.date}</p>

//           <div style={{ marginTop: '20px', textAlign: 'center' }}>
//             <h5 style={{ color: '#1976d2' }}>Payment QR Code</h5>
//             <img src={billDetails.qrCode} alt="QR Code for Payment" style={{ maxWidth: '200px', border: '2px solid #1976d2', borderRadius: '8px' }} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Billing;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Billing.css';

const Billing = () => {
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicineId, setSelectedMedicineId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [billDetails, setBillDetails] = useState(null);

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = () => {
    axios.get('http://localhost:8080/api/medicines')
      .then(res => setMedicines(res.data))
      .catch(err => console.error('Error fetching medicines:', err));
  };

  const handleGenerateBill = async () => {
    if (!selectedMedicineId || quantity <= 0) {
      alert("Please select a medicine and enter a valid quantity.");
      return;
    }

    const med = medicines.find(m => m.id === Number(selectedMedicineId));
    if (!med) return;

    try {
      const billRequest = {
        customerName: 'Sumita Mondal',
        medicineIds: [med.id],
        quantities: { [med.id]: quantity }
      };

      // Call backend to generate PDF
      const response = await axios.post(
        'http://localhost:8080/api/billing/generate-bill',
        billRequest,
        { responseType: 'blob' } // important for PDF
      );

      // Open PDF in new tab
      const pdfUrl = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      window.open(pdfUrl);

      // Update bill details to show summary and QR code
      const totalPrice = med.price * quantity;
      const dateString = new Date().toLocaleString();

      setBillDetails({
        customer: 'Sumita Mondal',
        medicine: med.name,
        price: med.price,
        quantity,
        totalPrice,
        date: dateString,
        shop: "Mita Medicine Shop",
        location: "Action Area - II, Kolkata, India",
        qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=pharmacy@upi&pn=GoodHealthPharmacy&am=${totalPrice}`
      });

      setSelectedMedicineId('');
      setQuantity(1);
    } catch (err) {
      console.error('Error generating bill:', err);
      alert('Failed to generate bill.');
    }
  };

  return (
    <div className="bill-details">
      <h3>Medicine Billing</h3>

      <div className="billing-form">
        <label>Select Medicine:</label>
        <select
          value={selectedMedicineId}
          onChange={e => setSelectedMedicineId(e.target.value)}
        >
          <option value="">-- Select Medicine --</option>
          {medicines.map(m => (
            <option key={m.id} value={m.id}>
              {m.name} - ₹{m.price}
            </option>
          ))}
        </select>

        <label>Quantity:</label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={e => setQuantity(Number(e.target.value))}
        />

        <button className="generate-bill-btn" onClick={handleGenerateBill}>
          Generate & View Bill
        </button>
      </div>

      {billDetails && (
        <div className="bill-info">
          <h4>Bill Summary</h4>
          <p><strong>Customer:</strong> {billDetails.customer}</p>
          <p><strong>Medicine:</strong> {billDetails.medicine}</p>
          <p><strong>Price per Unit:</strong> ₹{billDetails.price}</p>
          <p><strong>Quantity:</strong> {billDetails.quantity}</p>
          <p><strong>Total:</strong> ₹{billDetails.totalPrice}</p>
          <p><strong>Shop:</strong> {billDetails.shop}</p>
          <p><strong>Location:</strong> {billDetails.location}</p>
          <p><strong>Date & Time:</strong> {billDetails.date}</p>

          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <h5 style={{ color: '#1976d2' }}>Payment QR Code</h5>
            <img
              src={billDetails.qrCode}
              alt="QR Code for Payment"
              style={{ maxWidth: '200px', border: '2px solid #1976d2', borderRadius: '8px' }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Billing;
