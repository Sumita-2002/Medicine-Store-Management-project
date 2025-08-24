package com.test.dto;  // তোমার project অনুযায়ী package

import java.util.List;

public class BillRequest {
    private String customerName;
    private List<Long> medicineIds;
    private List<Integer> quantities;

    // getters & setters
    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public List<Long> getMedicineIds() { return medicineIds; }
    public void setMedicineIds(List<Long> medicineIds) { this.medicineIds = medicineIds; }

    public List<Integer> getQuantities() { return quantities; }
    public void setQuantities(List<Integer> quantities) { this.quantities = quantities; }
}
