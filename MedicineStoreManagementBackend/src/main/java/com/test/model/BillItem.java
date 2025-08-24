package com.test.model;

import jakarta.persistence.*;

@Entity
public class BillItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String medicineName;
    private int quantity;
    private double price; // price per unit

    private double total; // price * quantity

    @ManyToOne
    @JoinColumn(name = "bill_id")
    private Bill bill;

    // Constructors
    public BillItem() {}

    public BillItem(String medicineName, int quantity, double price) {
        this.medicineName = medicineName;
        this.quantity = quantity;
        this.price = price;
        this.total = price * quantity;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public String getMedicineName() {
        return medicineName;
    }

    public void setMedicineName(String medicineName) {
        this.medicineName = medicineName;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
        this.total = this.price * quantity; // update total automatically
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
        this.total = this.price * this.quantity; // update total automatically
    }

    public double getTotal() {
        return total;
    }

    public Bill getBill() {
        return bill;
    }

    public void setBill(Bill bill) {
        this.bill = bill;
    }
}
