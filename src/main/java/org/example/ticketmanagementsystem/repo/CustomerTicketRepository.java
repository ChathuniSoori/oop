package org.example.ticketmanagementsystem.repo;

import org.example.ticketmanagementsystem.dto.CustomerTicketsDTO;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerTicketRepository extends JpaRepository<CustomerTicketsDTO, Long> {
    // Custom query methods if necessary
}
