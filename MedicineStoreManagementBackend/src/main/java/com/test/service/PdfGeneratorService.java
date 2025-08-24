package com.test.service;

import com.test.model.Medicine;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import com.itextpdf.text.pdf.draw.LineSeparator;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class PdfGeneratorService {
	
	private static final Logger log = LoggerFactory.getLogger(PdfGeneratorService.class);

    public byte[] generatePdf(String customerName, List<Medicine> medicines, Map<Long, Integer> quantitiesMap) {
    	log.info("Raihan: Inside generatePdf() - PdfGeneratorService ");

    	try {
            // Safe conversion: sometimes JSON map keys are Strings
            Map<Long, Integer> quantities = quantitiesMap.entrySet().stream()
                    .collect(Collectors.toMap(
                            e -> Long.parseLong(e.getKey().toString()),
                            e -> e.getValue()
                    ));

            Document document = new Document();
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            PdfWriter.getInstance(document, out);
            document.open();

            // ===== TITLE =====
            Font titleFont = new Font(Font.FontFamily.HELVETICA, 30, Font.BOLD, BaseColor.BLUE);
            Paragraph title = new Paragraph("Medicine Store Bill", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);

            document.add(new Paragraph(" ")); // spacer

            // ===== CUSTOMER =====
            Font customerFont = new Font(Font.FontFamily.HELVETICA, 20, Font.BOLD, BaseColor.BLUE);
            Paragraph customer = new Paragraph("Customer: " + customerName, customerFont);
            customer.setAlignment(Element.ALIGN_CENTER);
            document.add(customer);

            document.add(new Paragraph(" "));

            // ===== UNDERLINE =====
            LineSeparator separator = new LineSeparator();
            separator.setOffset(-5);
            separator.setLineColor(BaseColor.BLACK);
            separator.setPercentage(100);
            document.add(new Chunk(separator));

            document.add(new Paragraph(" "));

            // ===== TABLE =====
            PdfPTable table = new PdfPTable(3);
            table.setWidthPercentage(100);
            table.setWidths(new float[]{4f, 2f, 2f});
            table.setSpacingBefore(10f);

            // Table header
            Font headerFont = new Font(Font.FontFamily.HELVETICA, 14, Font.BOLD, BaseColor.WHITE);
            BaseColor headerBg = new BaseColor(0, 123, 255); // blue header

            String[] headers = {"Medicine", "Quantity", "Price"};
            for (String h : headers) {
                PdfPCell cell = new PdfPCell(new Phrase(h, headerFont));
                cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                cell.setBackgroundColor(headerBg);
                cell.setPadding(8f);
                table.addCell(cell);
            }

            // Table rows
            Font rowFont = new Font(Font.FontFamily.HELVETICA, 12, Font.NORMAL, BaseColor.BLACK);
            double total = 0;
            for (Medicine med : medicines) {
                int qty = quantities.getOrDefault(med.getId(), 0);
                double price = med.getPrice() * qty;
                total += price;

                PdfPCell nameCell = new PdfPCell(new Phrase(med.getName(), rowFont));
                nameCell.setPadding(6f);
                table.addCell(nameCell);

                PdfPCell qtyCell = new PdfPCell(new Phrase(String.valueOf(qty), rowFont));
                qtyCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                qtyCell.setPadding(6f);
                table.addCell(qtyCell);

                PdfPCell priceCell = new PdfPCell(new Phrase(String.valueOf(price), rowFont));
                priceCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
                priceCell.setPadding(6f);
                table.addCell(priceCell);
            }

            // Total row
            Font totalFont = new Font(Font.FontFamily.HELVETICA, 14, Font.BOLD, BaseColor.BLACK);
            PdfPCell totalCell = new PdfPCell(new Phrase("Total", totalFont));
            totalCell.setColspan(2);
            totalCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
            totalCell.setBackgroundColor(BaseColor.LIGHT_GRAY);
            totalCell.setPadding(8f);
            table.addCell(totalCell);

            PdfPCell totalValueCell = new PdfPCell(new Phrase(String.valueOf(total), totalFont));
            totalValueCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
            totalValueCell.setBackgroundColor(BaseColor.LIGHT_GRAY);
            totalValueCell.setPadding(8f);
            table.addCell(totalValueCell);

            document.add(table);

            // ===== FOOTER =====
            document.add(new Paragraph(" "));
            Paragraph footer = new Paragraph("Shop: Good Health Pharmacy\nLocation: Kolkata, India", rowFont);
            footer.setAlignment(Element.ALIGN_CENTER);
            document.add(footer);

            document.add(new Paragraph(" "));
            Paragraph dateTime = new Paragraph("Date & Time: " + java.time.LocalDateTime.now(), rowFont);
            dateTime.setAlignment(Element.ALIGN_CENTER);
            document.add(dateTime);

            document.close();
        	log.info("Raihan: Exit from generatePdf() - PdfGeneratorService ");
            return out.toByteArray();

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
