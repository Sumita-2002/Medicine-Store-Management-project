package com.test.controller;

import com.test.model.Medicine;
import com.test.repository.MedicineRepository;
import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.text.pdf.draw.LineSeparator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/sell")
@CrossOrigin(origins = "http://localhost:3000")
public class SellController {

    @Autowired
    private MedicineRepository medicineRepo;

    @PostMapping("/confirm")
    public ResponseEntity<byte[]> confirmSell(@RequestBody List<SellRequest> sellRequests) throws Exception {

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        Document document = new Document();
        PdfWriter.getInstance(document, out);
        document.open();

        // ===== TITLE =====
        Font titleFont = new Font(Font.FontFamily.TIMES_ROMAN, 24, Font.BOLD, BaseColor.RED);
        Paragraph title = new Paragraph("Mita Medicine Store Bill", titleFont);
        title.setAlignment(Element.ALIGN_CENTER);
        document.add(title);
        
        Font titleFont2 = new Font(Font.FontFamily.TIMES_ROMAN, 14, Font.NORMAL, BaseColor.BLUE);
        Paragraph title2 = new Paragraph("Action Area - II , Newtown, 700160", titleFont2);
        title2.setAlignment(Element.ALIGN_CENTER);
        document.add(title2);
        
        // ===== UNDERLINE =====
        LineSeparator separator = new LineSeparator();
        separator.setOffset(-2);
        separator.setLineColor(BaseColor.BLACK);
        separator.setPercentage(100);
        document.add(new Chunk(separator));
        
     // Add Date below separator
        Font dateFont = new Font(Font.FontFamily.TIMES_ROMAN, 18, Font.BOLD, BaseColor.BLACK);
        String todayDate = new SimpleDateFormat("dd/MM/yyyy").format(new Date());
        Paragraph datePara = new Paragraph("Date: " + todayDate, dateFont);
        datePara.setAlignment(Element.ALIGN_CENTER);
        document.add(datePara);
        
        document.add(new Paragraph(" "));

        // Create table
        PdfPTable table = new PdfPTable(4);
        table.setWidthPercentage(100);
        float[] columnWidths = {3f, 2f, 2f, 2f};
        table.setWidths(columnWidths);
        
        String[] header = {"Medicine Name", "Price", "Quantity", "Total"};
        for (String h : header) {
            PdfPCell cell = new PdfPCell(new Paragraph(h));
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            cell.setBackgroundColor(BaseColor.PINK);
            
            cell.setPaddingTop(8f);
            cell.setPaddingBottom(8f);
            cell.setPaddingLeft(10f);
            cell.setPaddingRight(10f);
            
            table.addCell(cell);
        }
        
        double grandTotal = 0;
        int rowCount = 0;
      //  double grandTotal = 0;
        

        for (SellRequest req : sellRequests) {
            if (req.getMedicineId() == null) {
                throw new IllegalArgumentException("Medicine ID cannot be null");
            }

            Medicine med = medicineRepo.findById(req.getMedicineId()).orElse(null);
            if (med != null) {
            	 if (req.getQuantity() <= 0)
                     throw new IllegalArgumentException("Quantity must be greater than 0 for: " + med.getName());
                 if (req.getQuantity() > med.getQuantity())
                     throw new IllegalArgumentException("Not enough stock for: " + med.getName());
                 
                 
                double total = med.getPrice() * req.getQuantity();
                grandTotal += total;
                
                BaseColor rowColor = (rowCount % 2 == 0) ? new BaseColor(144, 238, 144) : new BaseColor(127, 255, 212);

                
//                document.add(new Paragraph(
//                    med.getName() + " | Price: " + med.getPrice() + " | Qty: " + req.getQuantity() + " | Total: " + total
//                ));
//
//                med.setQuantity(med.getQuantity() - req.getQuantity());
//                medicineRepo.save(med);
                
                table.addCell(createCell(med.getName(), rowColor));
                table.addCell(createCell(String.valueOf(med.getPrice()), rowColor));
                table.addCell(createCell(String.valueOf(req.getQuantity()), rowColor));
                table.addCell(createCell(String.valueOf(total), rowColor));
                
                med.setQuantity(med.getQuantity() - req.getQuantity());
                medicineRepo.save(med);

                rowCount++;
            }
        }
        document.add(table);
     //   document.add(new Chunk(new LineSeparator()));


        Font totalFont = new Font(Font.FontFamily.TIMES_ROMAN, 16, Font.BOLD);
        Paragraph totalPara = new Paragraph("Grand Total: " + grandTotal, totalFont);
        totalPara.setAlignment(Element.ALIGN_RIGHT);
        document.add(totalPara);      
        
        document.close();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("filename", "bill.pdf");

        return ResponseEntity.ok().headers(headers).body(out.toByteArray());
    }

    // DTO for SellRequest
    public static class SellRequest {
        private Long medicineId;
        private int quantity;

        public Long getMedicineId() {
            return medicineId;
        }

        public void setMedicineId(Long medicineId) {
            this.medicineId = medicineId;
        }

        public int getQuantity() {
            return quantity;
        }

        public void setQuantity(int quantity) {
            this.quantity = quantity;
        }
    }
    
    private PdfPCell createCell(String text, BaseColor color) {
        PdfPCell cell = new PdfPCell(new Paragraph(text));
        cell.setBackgroundColor(color);
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        cell.setPaddingTop(8f);
        cell.setPaddingBottom(8f);
        cell.setPaddingLeft(10f);
        cell.setPaddingRight(10f);
        
        return cell;
    }
}


