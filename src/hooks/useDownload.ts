import { jsPDF } from 'jspdf';
import { FILE_TYPES, UI_CONSTANTS } from '../utils/constants';

export const useDownload = () => {
  const downloadAsText = (content: string, fileName: string) => {
    const blob = new Blob([content], { type: FILE_TYPES.TEXT });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadAsPDF = (content: string, fileName: string) => {
    const pdf = new jsPDF();
    const lines = pdf.splitTextToSize(content, UI_CONSTANTS.MAX_PDF_LINE_WIDTH);
    
    let y = UI_CONSTANTS.PDF_MARGIN_TOP;
    lines.forEach((line: string) => {
      if (y > UI_CONSTANTS.PDF_PAGE_HEIGHT) {
        pdf.addPage();
        y = UI_CONSTANTS.PDF_MARGIN_TOP;
      }
      pdf.text(line, UI_CONSTANTS.PDF_MARGIN_LEFT, y);
      y += UI_CONSTANTS.PDF_LINE_HEIGHT;
    });

    pdf.save(`${fileName}.pdf`);
  };

  return {
    downloadAsText,
    downloadAsPDF
  };
};