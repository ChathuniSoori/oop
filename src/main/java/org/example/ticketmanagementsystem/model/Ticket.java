package org.example.ticketmanagementsystem.model;

import jakarta.persistence.*;

//@Entity
//@Table(name = "Ticket details")
public class Ticket {
    //@Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ticketId;
    private String eventName;
    private Integer price;
    private boolean isPurchased;

    public Ticket() {
        super();
    }
    public Ticket(Long ticketId, String eventName, Integer price, boolean isPurchased) {
        super();
        this.ticketId = ticketId;
        this.eventName = eventName;
        this.price = price;
        this.isPurchased = isPurchased;
    }
    public Long getTicketId() {

        return ticketId;
    }
    public void setTicketId(Long id) {

        this.ticketId = id;
    }
    public String getEventName() {

        return eventName;
    }
    public void setEventName(String eventName) {

        this.eventName = eventName;
    }
    public Integer getPrice() {

        return price;
    }
    public void setPrice(Integer price) {

        this.price = price;
    }
    public boolean isPurchased() {

        return isPurchased;
    }
    public void setPurchased(boolean purchased) {

        isPurchased = purchased;
    }
    @Override
    public String toString() {
        return "Ticket [ticketId=" + ticketId + ", eventName=" + eventName + ", price=" + price;
    }
}

