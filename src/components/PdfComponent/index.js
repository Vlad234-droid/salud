import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './style.scss';
import { useCards } from '../cardsContext';
const url = `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
pdfjs.GlobalWorkerOptions.workerSrc = url;

const PdfComponent = ({ PDF }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  const { setPdfVisible, setDrawerPdfDesctop } = useCards();

  return (
    <div className="conatiner_pdf">
      {window.document.body.clientWidth >= 728 && (
        <div
          className="closeDesctop"
          onClick={() => {
            setPdfVisible(() => false);
            setDrawerPdfDesctop(() => false);
          }}>
          Cerrar
        </div>
      )}

      {numPages !== null && numPages <= 1 ? (
        <div className={`conatiner_pdf `}>
          <Document
            file={`data:application/pdf;base64,${PDF[0]}`}
            options={{ workerSrc: '/pdf.worker.js' }}
            onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
        </div>
      ) : (
        <Document
          file={`data:application/pdf;base64,${PDF[0]}`}
          options={{ workerSrc: '/pdf.worker.js' }}
          onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
        </Document>
      )}
    </div>
  );
};
export default PdfComponent;
