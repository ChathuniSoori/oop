package org.example.ticketmanagementsystem.controller;

import org.example.ticketmanagementsystem.dto.ConfigurationDTO;
import org.example.ticketmanagementsystem.model.Configuration;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/config")
public class ConfigurationController {

    @GetMapping("/fetch")
    public Configuration getConfiguration() {
        return new Configuration();
    }

    @PostMapping("/save")
    public String saveConfiguration(@RequestBody ConfigurationDTO config) {
        System.out.println("Configuration received: " + config);
        return "Configuration saved successfully!";
    }
}
