package com.test.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Bill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userName;
    private String shopName;
    private String location;
    private LocalDateTime dateTime;
    private double totalPrice;

    // One bill can have many items
    @OneToMany(mappedBy = "bill", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<BillItem> items;

    // Constructors
    public Bill() {}

    public Bill(String userName, String shopName, String location, LocalDateTime dateTime, double totalPrice, List<BillItem> items) {
        this.userName = userName;
        this.shopName = shopName;
        this.location = location;
        this.dateTime = dateTime;
        this.totalPrice = totalPrice;
        this.items = items;

        // Set the bill reference in each item
        if (items != null) {
            for (BillItem item : items) {
                item.setBill(this);
            }
        }
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getShopName() {
        return shopName;
    }

    public void setShopName(String shopName) {
        this.shopName = shopName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public List<BillItem> getItems() {
        return items;
    }

    public void setItems(List<BillItem> items) {
        this.items = items;
        if (items != null) {
            for (BillItem item : items) {
                item.setBill(this);
            }
        }
    }
}
