/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { PDFDocument } from "pdf-lib";

export async function copyButOnlyPages(
  srcDoc: PDFDocument,
  pageNumbers: Array<number>
): Promise<PDFDocument> {
  const pdfCopy = await PDFDocument.create();
  const contentPages = await pdfCopy.copyPages(srcDoc, pageNumbers);

  for (let idx = 0, len = contentPages.length; idx < len; idx++) {
    pdfCopy.addPage(contentPages[idx]);
  }

  if (srcDoc.getAuthor() !== undefined) {
    pdfCopy.setAuthor(srcDoc.getAuthor()!);
  }
  if (srcDoc.getCreationDate() !== undefined) {
    pdfCopy.setCreationDate(srcDoc.getCreationDate()!);
  }
  if (srcDoc.getCreator() !== undefined) {
    pdfCopy.setCreator(srcDoc.getCreator()!);
  }
  if (srcDoc.getModificationDate() !== undefined) {
    pdfCopy.setModificationDate(srcDoc.getModificationDate()!);
  }
  if (srcDoc.getProducer() !== undefined) {
    pdfCopy.setProducer(srcDoc.getProducer()!);
  }
  if (srcDoc.getSubject() !== undefined) {
    pdfCopy.setSubject(srcDoc.getSubject()!);
  }
  if (srcDoc.getTitle() !== undefined) {
    pdfCopy.setTitle(srcDoc.getTitle()!);
  }
  pdfCopy.defaultWordBreaks = srcDoc.defaultWordBreaks;

  return pdfCopy;
}
