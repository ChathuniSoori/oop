package org.example.ticketmanagementsystem.repo;

import org.example.ticketmanagementsystem.model.Vendor;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class VendorTicketRepository {

    private final List<Vendor> vendors = new ArrayList<>();

    public Vendor save(Vendor vendor) {
        vendors.add(vendor);
        return vendor;
    }

    public List<Vendor> findAll() {
        return vendors;
    }
}
