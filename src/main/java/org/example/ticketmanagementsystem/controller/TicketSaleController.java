package org.example.ticketmanagementsystem.controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.example.ticketmanagementsystem.dto.TicketDTO;
import org.example.ticketmanagementsystem.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor(onConstructor_ = {@Autowired})
@RequestMapping("/api/sell")
public class TicketSaleController {

    private final TicketService ticketService;

    @PostMapping("/add")
    public ResponseEntity<TicketDTO> addTicket(@RequestBody TicketDTO addTicketDTO) {
        // Log or validate the incoming data
        System.out.println("Received maxCapacity: " + addTicketDTO.getMaxCapacity());

        // Validate maxCapacity and other necessary fields
        if (addTicketDTO.getMaxCapacity() == null || addTicketDTO.getMaxCapacity() <= 0) {
            return ResponseEntity.badRequest().body(null); // Return an error response if invalid
        }

        try {
            TicketDTO savedTicket = ticketService.addTicket(addTicketDTO);
            return ResponseEntity.ok(savedTicket);
        } catch (Exception e) {
            // Catch and handle exceptions properly
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/purchase")
    public ResponseEntity<TicketDTO> purchaseTicket(@Valid @RequestBody TicketDTO purchaseRequest) {
        try {
            TicketDTO purchasedTicket = ticketService.purchaseTicket(purchaseRequest);
            return ResponseEntity.ok(purchasedTicket);
        } catch (IllegalArgumentException e) {
            // Handle validation or other errors during purchase
            return ResponseEntity.badRequest().body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/active")
    public ResponseEntity<List<TicketDTO>> getActiveTickets() {
        try {
            List<TicketDTO> activeTickets = ticketService.getActiveTickets();
            return ResponseEntity.ok(activeTickets);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null); // No active tickets found
        }
    }

    @GetMapping("/active/remaining")
    public ResponseEntity<List<TicketDTO>> getActiveTicketsWithRemaining() {
        try {
            List<TicketDTO> activeTicketsWithRemaining = ticketService.getActiveTicketsWithRemaining();
            return ResponseEntity.ok(activeTicketsWithRemaining);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null); // No active tickets available
        }
    }
}
