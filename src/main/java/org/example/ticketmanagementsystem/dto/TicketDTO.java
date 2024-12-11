package org.example.ticketmanagementsystem.dto;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@Table(name = "tickets")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TicketDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ticketId;

    private Double price;
    private String eventName;
    private Double rate;

    @Column(nullable = false)
    private Integer maxCapacity;

    @Column(nullable = false)
    private Integer quantity;

    private Boolean activeStatus;

    @Column(nullable = false)
    private Integer remainingTickets = 0; // Ensure default value is set

    @ManyToMany
    @JoinTable(
            name = "customer_ticket",
            joinColumns = @JoinColumn(name = "ticket_id"),
            inverseJoinColumns = @JoinColumn(name = "customer_id")
    )
    private Set<CustomerDTO> customers;
}
