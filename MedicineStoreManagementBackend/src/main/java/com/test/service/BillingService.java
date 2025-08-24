package com.test.service;

import com.test.controller.BillController;
import com.test.dto.BillRequest;
import com.test.model.Bill;
import com.test.model.BillItem;
import com.test.model.Medicine;
import com.test.repository.BillRepository;
import com.test.repository.MedicineRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class BillingService {

    @Autowired
    private MedicineRepository medicineRepository;

    @Autowired
    private PdfGeneratorService pdfGeneratorService;

    @Autowired
    private BillRepository billRepository;

    private static final Logger log = LoggerFactory.getLogger(BillingService.class);

    
    public byte[] generateBillPdfAndSave(BillRequest request) {
    	log.info("Raihan: Inside generateBillPdfAndSave() - BillingService");
        // Fetch medicines from DB
        List<Medicine> medicines = medicineRepository.findAllById(request.getMedicineIds());

        // Prepare BillItems
        Map<Long, Integer> quantities = (Map<Long, Integer>) request.getQuantities();
        List<BillItem> items = new ArrayList<>();
        double totalPrice = 0;

        for (Medicine med : medicines) {
            int qty = quantities.getOrDefault(med.getId(), 1);
            BillItem item = new BillItem(med.getName(), qty, med.getPrice());
            items.add(item);
            totalPrice += item.getTotal();
        }

        // Create Bill entity
        Bill bill = new Bill();
        bill.setUserName(request.getCustomerName());
        bill.setShopName("Good Health Pharmacy");
        bill.setLocation("Kolkata, India");
        bill.setDateTime(LocalDateTime.now());
        bill.setTotalPrice(totalPrice);
        bill.setItems(items);

        // Link items to bill
        for (BillItem item : items) {
            item.setBill(bill);
        }

        // Save to database
        billRepository.save(bill);

    	log.info("Raihan: Exit from generateBillPdfAndSave() - BillingService");
        // Generate PDF
        return pdfGeneratorService.generatePdf(request.getCustomerName(), medicines, quantities);
    }
}
