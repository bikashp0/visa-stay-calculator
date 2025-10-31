import { jsPDF } from 'jspdf';
import { format } from 'date-fns';

export function exportToPDF(travelHistory, results) {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(20);
  doc.setTextColor(37, 99, 235);
  doc.text('Aussie Visa Stay Calculator', 20, 20);
  
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text('Subclass 600 Visitor Visa - Condition 8558 Analysis', 20, 28);
  
  // Generated date
  doc.setFontSize(10);
  doc.text(`Generated: ${format(new Date(), 'PPP')}`, 20, 35);
  
  // Draw line
  doc.setDrawColor(200, 200, 200);
  doc.line(20, 40, 190, 40);
  
  let yPos = 50;
  
  // Summary Section
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text('Summary', 20, yPos);
  yPos += 10;
  
  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);
  
  doc.text(`18-Month Window: ${format(results.windowStart, 'dd MMM yyyy')} to ${format(results.windowEnd, 'dd MMM yyyy')}`, 20, yPos);
  yPos += 8;
  
  doc.text(`Total Days Used: ${results.totalDaysUsed} days (${results.percentageUsed.toFixed(1)}%)`, 20, yPos);
  yPos += 8;
  
  doc.text(`Days Remaining: ${results.daysRemaining} days`, 20, yPos);
  yPos += 8;
  
  if (results.isOverLimit) {
    doc.setTextColor(220, 38, 38);
    doc.text('⚠ WARNING: You have exceeded the 12-month limit!', 20, yPos);
    yPos += 8;
    doc.text(`Cannot return until: ${format(results.canReturnDate, 'dd MMM yyyy')}`, 20, yPos);
  } else {
    doc.setTextColor(34, 197, 94);
    doc.text(`✓ Can stay until approximately: ${format(results.maxStayEndDate, 'dd MMM yyyy')}`, 20, yPos);
    yPos += 8;
    doc.setTextColor(60, 60, 60);
    doc.text(`Recommended return date: ${format(results.canReturnDate, 'dd MMM yyyy')} (to reset window)`, 20, yPos);
  }
  
  yPos += 15;
  
  // Travel History Section
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text('Travel History', 20, yPos);
  yPos += 10;
  
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  
  results.breakdown.forEach((entry, index) => {
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    
    doc.setTextColor(0, 0, 0);
    doc.text(`Entry ${index + 1}:`, 20, yPos);
    yPos += 6;
    
    doc.setTextColor(60, 60, 60);
    doc.text(`  Arrival: ${format(new Date(entry.arrivalDate), 'dd MMM yyyy')}`, 20, yPos);
    yPos += 6;
    
    if (entry.exitDate) {
      doc.text(`  Exit: ${format(new Date(entry.exitDate), 'dd MMM yyyy')}`, 20, yPos);
    } else {
      doc.text(`  Exit: Currently in Australia`, 20, yPos);
    }
    yPos += 6;
    
    doc.text(`  Total Days: ${entry.totalDays} days`, 20, yPos);
    yPos += 6;
    
    if (entry.inWindow) {
      doc.setTextColor(34, 197, 94);
      doc.text(`  Days in 18-month window: ${entry.daysInWindow} days ✓`, 20, yPos);
    } else {
      doc.setTextColor(156, 163, 175);
      doc.text(`  Days in 18-month window: 0 days (outside window)`, 20, yPos);
    }
    
    yPos += 10;
  });
  
  // Footer/Disclaimer
  if (yPos > 240) {
    doc.addPage();
    yPos = 20;
  }
  
  yPos += 10;
  doc.setDrawColor(200, 200, 200);
  doc.line(20, yPos, 190, yPos);
  yPos += 8;
  
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  const disclaimer = 'DISCLAIMER: This calculator is for informational purposes only and does not constitute immigration advice. ' +
    'Visa conditions may vary based on individual circumstances. Always verify with the Department of Home Affairs ' +
    'or consult a registered migration agent before making travel decisions.';
  
  const splitDisclaimer = doc.splitTextToSize(disclaimer, 170);
  doc.text(splitDisclaimer, 20, yPos);
  
  // Save
  doc.save(`visa-calculation-${format(new Date(), 'yyyy-MM-dd')}.pdf`);
}