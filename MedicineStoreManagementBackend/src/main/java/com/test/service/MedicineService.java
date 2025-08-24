package com.test.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.test.model.Medicine;
import com.test.repository.MedicineRepository;

@Service
public class MedicineService {

    @Autowired
    private MedicineRepository medicineRepo;

    // ✅ Get all medicines
    public List<Medicine> getAllMedicines() {
        return medicineRepo.findAll();
    }

    // ✅ Add a new medicine
    public Medicine addMedicine(Medicine medicine) {
        return medicineRepo.save(medicine);
    }

    // ✅ Delete a medicine by ID
    public void deleteMedicine(Long id) {
        medicineRepo.deleteById(id);
    }

    // ✅ Update existing medicine (if it exists)
    public Medicine updateMedicine(Medicine medicine) {
        Optional<Medicine> existingMedicine = medicineRepo.findById(medicine.getId());
        if (existingMedicine.isPresent()) {
            return medicineRepo.save(medicine);
        } else {
            throw new RuntimeException("Medicine with ID " + medicine.getId() + " not found");
        }
    }

    // ✅ (Optional) Get a medicine by ID
    public Medicine getMedicineById(Long id) {
        return medicineRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Medicine not found with id: " + id));
    }
}
