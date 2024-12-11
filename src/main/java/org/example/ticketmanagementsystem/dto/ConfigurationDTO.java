package org.example.ticketmanagementsystem.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConfigurationDTO {
    private Integer tickets;
    private Integer delay;
    private String role;
}