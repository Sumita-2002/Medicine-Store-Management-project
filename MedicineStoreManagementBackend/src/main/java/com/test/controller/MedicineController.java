package com.test.controller;

import com.test.model.Medicine;
import com.test.service.MedicineService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medicines")
@CrossOrigin(origins = "http://localhost:3000") // React frontend URL
public class MedicineController {

    @Autowired
    private MedicineService medicineService;

    private static final Logger log = LoggerFactory.getLogger(MedicineController.class);
    
    // GET all medicines
    @GetMapping
    public ResponseEntity<List<Medicine>> getAllMedicines() {
    	log.info("Inside getAllMedicines() :: MedicineController ");
        List<Medicine> medicines = medicineService.getAllMedicines();
    	log.info("Exit from getAllMedicines() :: MedicineController ");
        return ResponseEntity.ok(medicines);
    }

    // ADD a new medicine
    @PostMapping
    public ResponseEntity<Medicine> add(@RequestBody Medicine medicine) {
        Medicine savedMedicine = medicineService.addMedicine(medicine);
        return ResponseEntity.ok(savedMedicine);
    }

    // UPDATE an existing medicine
    @PutMapping("/{id}")
    public ResponseEntity<Medicine> update(@PathVariable Long id, @RequestBody Medicine medicine) {
        Medicine existing = medicineService.getMedicineById(id);
        if (existing == null) {
            return ResponseEntity.notFound().build();
        }
        medicine.setId(id); // ensure ID is set
        Medicine updated = medicineService.updateMedicine(medicine);
        return ResponseEntity.ok(updated);
    }

    // DELETE a medicine
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        Medicine existing = medicineService.getMedicineById(id);
        if (existing == null) {
            return ResponseEntity.notFound().build();
        }
        medicineService.deleteMedicine(id);
        return ResponseEntity.noContent().build();
    }
}
