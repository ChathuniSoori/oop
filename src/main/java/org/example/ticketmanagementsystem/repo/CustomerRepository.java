package org.example.ticketmanagementsystem.repo;

import org.example.ticketmanagementsystem.dto.CustomerDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<CustomerDTO, Long> {

}