package org.example.ticketmanagementsystem.model;

import jakarta.persistence.*;

//@Entity
//@Table(name="Customer_details")
public class Customer {

//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Id
    private Long customerId;
    private String fullName;
    private String email;
    private String eventName;
    private Double price;


    public Customer(){
        super();
    }

    public Customer(Long customerId,String fullName, String eventName, double price,String email) {
        this.customerId = customerId;
        this.fullName = fullName;
        this.eventName = eventName;
        this.price = price;
        this.email = email;

    }


    // Getters and setters
    public Long getCustomerId() {

        return customerId;
    }
    public void setCustomerId(Long customerId) {

    this.customerId= customerId;
    }
    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}