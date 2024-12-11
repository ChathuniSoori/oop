package org.example.ticketmanagementsystem.service;

import org.example.ticketmanagementsystem.model.Vendor;
import org.example.ticketmanagementsystem.repo.VendorTicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VendorTicketService {

    @Autowired
    private VendorTicketRepository vendorTicketRepository;

    public Vendor addVendorTicket(Vendor vendor) {
        return vendorTicketRepository.save(vendor);
    }
}
