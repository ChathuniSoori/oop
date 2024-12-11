package org.example.ticketmanagementsystem.repo;

import org.example.ticketmanagementsystem.dto.TicketDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<TicketDTO, Long> {

    // Find all active tickets
    List<TicketDTO> findByActiveStatus(Boolean activeStatus);

    // Optionally, find active tickets with remaining tickets
    List<TicketDTO> findByActiveStatusAndRemainingTicketsGreaterThan(Boolean activeStatus, Integer remainingTickets);
}
