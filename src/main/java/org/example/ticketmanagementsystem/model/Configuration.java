package org.example.ticketmanagementsystem.model;

public class Configuration {

    private int maxTickets;
    private int delay;

    // Constructors
    public Configuration() {

        super();
    }

    public Configuration(int maxTickets, int delay, String role) {
        this.maxTickets = maxTickets;
        this.delay = delay;

    }


    public int getMaxTickets() {
        return maxTickets;
    }

    public void setMaxTickets(int tickets) {
        this.maxTickets = maxTickets;
    }

    public long getDelay() {
        return delay;
    }

    public void setDelay(int delay) {
        this.delay = delay;
    }

}