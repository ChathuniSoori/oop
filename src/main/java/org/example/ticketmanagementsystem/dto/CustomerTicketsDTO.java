package org.example.ticketmanagementsystem.dto;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerTicketsDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long customerTicketId;

    @ManyToMany
    @JoinTable(
            name = "customer_ticket",
            joinColumns = @JoinColumn(name = "customer_ticket_id"),
            inverseJoinColumns = @JoinColumn(name = "ticket_id")
    )
    List<TicketDTO> ticketDTOList;


     Integer quantity;
}

