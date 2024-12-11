//package org.example.ticketmanagementsystem.service;
//
//import org.springframework.stereotype.Service;
//
//@Service
//public class TicketSaleService {
//
//    private boolean isRunning = false;
//
//    // Start selling tickets
//    public boolean startSale(int saleId) {
//        if (!isRunning) {
//            isRunning = true;
//            System.out.println("Ticket sale started for Sale ID: " + saleId);
//            // Add your ticket selling initialization logic here
//            return true;
//        }
//        System.out.println("Ticket sale already running for Sale ID: " + saleId);
//        return false; // Return false if the sale is already running
//    }
//
//    // Stop selling tickets
//    public boolean stopSale(int saleId) {
//        if (isRunning) {
//            isRunning = false;
//            System.out.println("Ticket sale stopped for Sale ID: " + saleId);
//            // Add your logic to stop the selling process
//            return true;
//        }
//        System.out.println("Ticket sale is not running for Sale ID: " + saleId);
//        return false; // Return false if the sale is not running
//    }
//
//    // Check if the ticket sale is running
//    public boolean isRunning() {
//        return isRunning;
//    }
//
//    // Simulate selling a ticket
//    public String sellTicket(int ticketId, int saleId) {
//        if (isRunning) {
//            System.out.println("Ticket ID " + ticketId + " sold for Sale ID: " + saleId);
//            // Add logic to process ticket sale (e.g., save to database)
//            return "Ticket ID " + ticketId + " sold successfully.";
//        }
//        return "Ticket sale is not running. Cannot sell Ticket ID: " + ticketId;
//    }
//}
