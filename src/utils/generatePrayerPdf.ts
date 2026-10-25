import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DayPrayerSchedule, MONTH_NAMES_FR } from './prayerCalendar';

/**
 * Generates and downloads a clean, beautifully formatted PDF of the monthly prayer calendar
 * for the Mosquée SALEM de Saint-Sulpice-la-Pointe.
 */
export function downloadPrayerCalendarPdf(
  year: number,
  month: number,
  days: DayPrayerSchedule[]
) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const monthName = MONTH_NAMES_FR[month - 1];

  // Header background banner
  doc.setFillColor(10, 38, 26); // #0A261A
  doc.rect(0, 0, 210, 33, 'F');

  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.text('MOSQUÉE SALEM · SAINT-SULPICE-LA-POINTE', 105, 11, { align: 'center' });

  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(245, 158, 11); // Amber
  doc.text(`CALENDRIER OFFICIEL DES PRIÈRES · ${monthName.toUpperCase()} ${year}`, 105, 19, { align: 'center' });

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(215, 235, 225);
  doc.text('Association Cultuelle et Culturelle SALEM · 340 Rue des Montamats (81370) · Synchronisé Mawaqit', 105, 26, { align: 'center' });

  // Table columns and rows
  const head = [['Jour', 'Date', 'Fajr', 'Chourouq', 'Dhuhr', 'Asr', 'Maghrib', 'Isha']];

  const body = days.map((day) => {
    const isFri = day.isFriday;
    const dayLabel = isFri ? `${day.dayName} (Joumou'a)` : day.dayName;
    const dateFormatted = `${day.day} ${monthName.slice(0, 4)}.`;

    return [
      dayLabel,
      dateFormatted,
      day.fajr,
      day.shuruk,
      day.dhuhr,
      day.asr,
      day.maghrib,
      day.isha,
    ];
  });

  autoTable(doc, {
    head: head,
    body: body,
    startY: 36,
    theme: 'grid',
    styles: {
      font: 'helvetica',
      fontSize: 8,
      cellPadding: 1.6,
      halign: 'center',
      valign: 'middle',
      textColor: [40, 40, 40],
      lineColor: [220, 220, 220],
      lineWidth: 0.1,
    },
    headStyles: {
      fillColor: [15, 50, 35], // #0F3223
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 8.5,
    },
    alternateRowStyles: {
      fillColor: [250, 249, 246],
    },
    columnStyles: {
      0: { halign: 'left', fontStyle: 'bold', cellWidth: 32 },
      1: { halign: 'center', cellWidth: 20 },
      2: { fontStyle: 'bold', textColor: [15, 50, 35] },
      3: { textColor: [120, 120, 120] },
      4: { fontStyle: 'bold', textColor: [15, 50, 35] },
      5: { fontStyle: 'bold', textColor: [15, 50, 35] },
      6: { fontStyle: 'bold', textColor: [15, 50, 35] },
      7: { fontStyle: 'bold', textColor: [15, 50, 35] },
    },
    didParseCell: (data) => {
      const rowIndex = data.row.index;
      const day = days[rowIndex];
      if (day && day.isFriday && data.section === 'body') {
        data.cell.styles.fillColor = [236, 253, 245]; // light emerald
        if (data.column.index === 0 || data.column.index === 4) {
          data.cell.styles.textColor = [5, 100, 60];
          data.cell.styles.fontStyle = 'bold';
        }
      }
      if (day && day.isToday && data.section === 'body') {
        data.cell.styles.fillColor = [254, 243, 199]; // light amber
      }
    },
    margin: { left: 10, right: 10 },
  });

  // Footer notes block below table
  // @ts-expect-error autoTable adds lastAutoTable property on doc
  const finalY = (doc.lastAutoTable?.finalY || 250) + 3;

  if (finalY < 278) {
    doc.setFillColor(248, 250, 248);
    doc.setDrawColor(200, 225, 210);
    doc.roundedRect(10, finalY, 190, 15, 1.5, 1.5, 'FD');

    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 50, 35);
    doc.text('RÈGLES OFFICIELLES MOSQUÉE SALEM :', 13, finalY + 4);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(50, 50, 50);
    doc.text('• Fajr, Dhuhr, Asr, Isha : Iqama 10 min après l’Adhan · Maghrib : Iqama 5 min après l’Adhan.', 13, finalY + 7.5);
    doc.text('• Vendredi (Joumou’a) : Sermon en français puis en arabe · Adhan pour Khotba 13h · Salat Après khotba (13h20 / 13h30).', 13, finalY + 10.5);
    doc.text('• Respectez scrupuleusement les accès riverains Rue des Montamats · Stationnement sur le parking de la mosquée.', 13, finalY + 13.5);
  }

  // Trigger download of PDF
  const filename = `Calendrier-Prieres-Mosquee-SALEM-${monthName}-${year}.pdf`;
  doc.save(filename);
}
