package com.test.controller;

import com.test.dto.BillRequest;
import com.test.service.BillingService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/billing")
@CrossOrigin(origins = "http://localhost:3000")
public class BillController {

    @Autowired
    private BillingService billingService;

    private static final Logger log = LoggerFactory.getLogger(BillController.class);
    
    @PostMapping("/generate-bill")
    public ResponseEntity<byte[]> generateBill(@RequestBody BillRequest request) {
    	log.info("Raihan : Inside generateBill() - BillController ");
        byte[] pdf = billingService.generateBillPdfAndSave(request);

    	log.info("Raihan : Exiting from generateBill() - BillController ");
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=bill.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }
}
