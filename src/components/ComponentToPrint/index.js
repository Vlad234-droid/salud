import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { getPDF } from '../../core/services/cards';
import style from './style.module.scss';
const url = `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
pdfjs.GlobalWorkerOptions.workerSrc = url;

const ComponentToPrint = ({ refPrint, analPerson, setPDFToPrint }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [PDF, setPDF] = useState([]);

  useEffect(() => {
    setPDFToPrint(() => true);
    getPDF(analPerson).then((data) => {
      const listPages = [];
      for (let item of data) {
        listPages.push(item.Media);
      }
      setPDF(() => listPages);
      setPDFToPrint(() => false);
    });
  }, [analPerson, setPDFToPrint]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(() => numPages);
    setPageNumber(() => 1);
  };
  return (
    <div className={style.print} ref={refPrint}>
      {numPages !== null && numPages <= 1 ? (
        <div className={`conatiner_pdf `}>
          <Document
            file={`data:application/pdf;base64,${PDF[0]}`}
            options={{ workerSrc: '/pdf.worker.js' }}
            onLoadSuccess={onDocumentLoadSuccess}
            renderMode="canvas">
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

export default ComponentToPrint;
