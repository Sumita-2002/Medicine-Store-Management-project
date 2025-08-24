import React from "react";
import axios from "axios";

const GenerateBillButton = () => {

  const handleGenerateBill = async () => {
    try {
      const requestData = {
        customerName: "Sumita Mondal",
        medicineIds: [1, 2, 3],
        quantities: {
          1: 2,
          2: 1,
          3: 5
        }
      };

      const response = await axios.post(
        "http://localhost:8080/api/billing/generate",
        requestData,
        { responseType: "blob" } // important for PDF
      );

      // Create a download link
      const url = window.URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "bill.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();

    } catch (error) {
      console.error("Error generating bill:", error);
    }
  };

  return (
    <button
      onClick={handleGenerateBill}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Generate Bill
    </button>
  );
};

export default GenerateBillButton;
