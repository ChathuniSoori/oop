package org.example.ticketmanagementsystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
@EnableJpaRepositories(basePackages = "org.example.ticketmanagementsystem.repo")
public class TicketManagementSystemApplication {
    public static void main(String[] args) {
        SpringApplication.run(TicketManagementSystemApplication.class, args);
    }
}
