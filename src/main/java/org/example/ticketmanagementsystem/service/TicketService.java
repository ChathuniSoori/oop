package org.example.ticketmanagementsystem.service;

import jakarta.transaction.Transactional;
import org.example.ticketmanagementsystem.dto.CustomerDTO;
import org.example.ticketmanagementsystem.dto.CustomerTicketsDTO;
import org.example.ticketmanagementsystem.dto.TicketDTO;
import org.example.ticketmanagementsystem.repo.CustomerRepository;
import org.example.ticketmanagementsystem.repo.CustomerTicketRepository;
import org.example.ticketmanagementsystem.repo.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TicketService {

    @Autowired
    private TicketRepository ticketRepository;
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private CustomerTicketRepository customerTicketRepository;

    public TicketDTO addTicket(TicketDTO addTicketDTO) {
        if (addTicketDTO.getRemainingTickets() == null) {
            addTicketDTO.setRemainingTickets(0); // Set remaining tickets to 0 if it's null
        }

        // Validation: Check if max capacity is a positive number
        if (addTicketDTO.getMaxCapacity() == null || addTicketDTO.getMaxCapacity() <= 0) {
            throw new IllegalArgumentException("Max capacity must not be null and should be greater than 0.");
        }

        // Set the active status to true for the new ticket
        addTicketDTO.setActiveStatus(true);

        // Save the ticket in the database and return the added ticket
        return ticketRepository.save(addTicketDTO);
    }

    @Transactional
    public TicketDTO purchaseTicket(TicketDTO purchaseTicketDTO) {
        if (purchaseTicketDTO.getTicketId() == null) {
            throw new IllegalArgumentException("Ticket ID must not be null.");
        }

        // Validate: Ensure the ticket ID is valid
        Optional<TicketDTO> optionalTicketDTO = ticketRepository.findById(purchaseTicketDTO.getTicketId());
        if (optionalTicketDTO.isEmpty()) {
            throw new IllegalArgumentException("Ticket not found with ID: " + purchaseTicketDTO.getTicketId());
        }

        // Get the ticket from the database
        TicketDTO ticketDTO = optionalTicketDTO.get();

        if (ticketDTO.getMaxCapacity() <= 0) {
            ticketDTO.setActiveStatus(false);
            throw new IllegalArgumentException("No tickets available for purchase");
        }

        // Validate: Check if the requested quantity is more than available tickets
        if (purchaseTicketDTO.getQuantity() <= 0 || purchaseTicketDTO.getQuantity() > ticketDTO.getMaxCapacity()) {
            throw new IllegalArgumentException("Invalid quantity, not enough tickets available to purchase");
        }

        // Calculate the remaining tickets after the purchase
        int remainingTickets = ticketDTO.getMaxCapacity() - purchaseTicketDTO.getQuantity();
        ticketDTO.setMaxCapacity(remainingTickets);

        // Save the updated ticket
        ticketRepository.save(ticketDTO);

        // Fetch the customer from the database (fix customer lookup logic)
        Optional<CustomerDTO> optionalCustomerDTO = customerRepository.findById(purchaseTicketDTO.getTicketId());
        if (optionalCustomerDTO.isEmpty()) {
            throw new IllegalArgumentException("Customer not found with ID: " + purchaseTicketDTO.getTicketId());
        }
        CustomerDTO customerDTO = optionalCustomerDTO.get();

        // Create the CustomerTicketDTO to represent the purchase
        CustomerTicketsDTO customerTicket = new CustomerTicketsDTO();
        customerTicket.setTicketDTOList(List.of(purchaseTicketDTO));
        customerTicket.setQuantity(purchaseTicketDTO.getQuantity());

        // Save the relationship in the intermediate table
        customerTicketRepository.save(customerTicket);

        return purchaseTicketDTO;
    }

    public List<TicketDTO> getActiveTickets() {
        List<TicketDTO> activeTickets = ticketRepository.findByActiveStatus(true);

        // Validation: Check if any active tickets are found
        if (activeTickets.isEmpty()) {
            throw new IllegalArgumentException("No active tickets found");
        }

        return activeTickets;
    }

    public List<TicketDTO> getActiveTicketsWithRemaining() {
        List<TicketDTO> activeTicketsWithRemaining = ticketRepository.findByActiveStatusAndRemainingTicketsGreaterThan(true, 0);

        // Validation: Check if any active tickets with remaining tickets are found
        if (activeTicketsWithRemaining.isEmpty()) {
            throw new IllegalArgumentException("No active tickets available for purchase");
        }

        return activeTicketsWithRemaining;
    }
}
