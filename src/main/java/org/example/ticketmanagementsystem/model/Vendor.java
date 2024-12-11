package org.example.ticketmanagementsystem.model;





public class Vendor {

    private Long id;
    private Integer delay;
    private String eventName;
    private Integer quantity;
    private Double price;

    // Getters and setters
    public Long getId() {

        return id;
    }
    public void setId(Long id) {

        this.id = id;
    }
    public Integer getDelay() {

        return delay;
    }

    public void setDelay(Integer delay) {

        this.delay = delay;
    }

    public String getEventName() {

        return eventName;
    }

    public void setEventName(String eventName) {

        this.eventName = eventName;
    }

    public Integer getQuantity() {

        return quantity;
    }

    public void setQuantity(Integer quantity) {

        this.quantity = quantity;
    }

    public Double getPrice() {

        return price;
    }

    public void setPrice(Double price) {

        this.price = price;
    }

    public boolean isPurchased() {

        return quantity > 0;
    }

    public void setPurchased(boolean b) {
    }
}