//package org.example.ticketmanagementsystem.service;
//
//import org.example.ticketmanagementsystem.dto.CustomerDTO;
//import org.example.ticketmanagementsystem.model.Customer;
//import org.example.ticketmanagementsystem.repo.CustomerRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//@Service
//public class CustomerService {
//    @Autowired
//    private CustomerRepository customerRepository;
//
//    public CustomerDTO saveCustomer(CustomerDTO customerDTO) {
//        return customerRepository.save(customerDTO);
//    }
//    public CustomerDTO updateCustomer(CustomerDTO CustomerDTO) {
//        return customerRepository.save(CustomerDTO);
//    }
//    public void deleteCustomer(Long id) {
//        customerRepository.deleteById(id);
//    }
//    public String purchaseTicket(CustomerDTO CustomerDTO) {
//        customerRepository.save(CustomerDTO);
//        return "Ticket purchased for " + CustomerDTO.getFullName() ;
//    }
//    public CustomerDTO getCustomerById(Long id) {
//        CustomerDTO CustomerDTO = customerRepository.findById(id).orElseThrow(() -> new RuntimeException("Customer not found"));
//        return CustomerDTO;
//
//    }
//
//
//
//
//}
package org.example.ticketmanagementsystem.service;

import org.example.ticketmanagementsystem.dto.CustomerDTO;
import org.example.ticketmanagementsystem.repo.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    public CustomerDTO saveCustomer(CustomerDTO customerDTO) {
        return customerRepository.save(customerDTO);
    }

    public CustomerDTO updateCustomer(CustomerDTO customerDTO) {
        return customerRepository.save(customerDTO);
    }

    public void deleteCustomer(Long id) {
        customerRepository.deleteById(id);
    }

    public CustomerDTO getCustomerById(Long id) {
        return customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
    }
}

