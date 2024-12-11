package org.example.ticketmanagementsystem.controller;

import org.example.ticketmanagementsystem.model.Vendor;
import org.example.ticketmanagementsystem.service.VendorTicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/vendors")
public class VendorController {

    @Autowired
    private VendorTicketService vendorTicketService;

    @PostMapping
    public ResponseEntity<Vendor> addVendor(@RequestBody Vendor vendor) {
        Vendor savedVendor = vendorTicketService.addVendorTicket(vendor);
        return ResponseEntity.ok(savedVendor);
    }
}