/**
 * Securely downloads a PDF file by fetching it as an authenticated blob in memory.
 * This completely avoids cross-origin iframe navigation and auth redirect issues
 * that cause browsers to save files with a .html extension.
 */
export async function downloadPdfFile(url: string, filename: string): Promise<void> {
  const cleanFilename = filename.toLowerCase().endsWith('.pdf') ? filename : `${filename}.pdf`;
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/pdf',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to download PDF: ${response.status} ${response.statusText}`);
  }

  const blob = await response.blob();
  
  // Guarantee application/pdf MIME type
  const pdfBlob = new Blob([blob], { type: 'application/pdf' });
  const blobUrl = window.URL.createObjectURL(pdfBlob);

  const link = document.createElement('a');
  link.style.display = 'none';
  link.href = blobUrl;
  link.download = cleanFilename;
  
  document.body.appendChild(link);
  link.click();

  // Allow the download to initiate before cleanup
  setTimeout(() => {
    if (document.body.contains(link)) {
      document.body.removeChild(link);
    }
    window.URL.revokeObjectURL(blobUrl);
  }, 3000);
}
