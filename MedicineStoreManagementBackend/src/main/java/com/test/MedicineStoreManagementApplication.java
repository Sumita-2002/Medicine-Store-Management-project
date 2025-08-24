package com.test;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.test", "com.example.medicinestore"})
public class MedicineStoreManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(MedicineStoreManagementApplication.class, args);
    }
}
