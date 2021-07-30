import React, { useCallback, useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import Utils from "../../../Utils";
import CONSTANTS from "../../../CONSTANTS";
import { PDFSection, ReadingStatus } from "./types";
import useWindowing from "./useWindowing";
interface Props {}

function PDFViewer(props: Props) {
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

  const [fileData, setFileData]: [File | null, Function] = useState(null);
  const [fileMetaData, setFileMetaData]: [any, Function] = useState(null);
  const sections = useWindowing(fileMetaData);

  const [readingStatus, setReadingStatus]: [ReadingStatus | null, Function] =
    useState(null);

  const fileName = useCallback(() => {
    return fileMetaData.name.replace(".pdf", "");
  }, [fileMetaData]);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files: FileList | null = e.target.files;
    if (files && files[0]) {
      const dataURL = await Utils.ReadFile(files[0]);
      setFileData(dataURL);
    }
  }
  function handleWindowing() {}
  function buildPages() {
    const pagesArr = [];
    if (readingStatus && readingStatus.currentSection) {
      const endIDX = readingStatus.currentSection.endIDX;
      const startIDX = readingStatus.currentSection.startIDX;
      for (let i = startIDX; i <= endIDX; i++) {
        pagesArr.push(<Page pageIndex={i} />);
      }
    }
    return pagesArr;
  }
  return (
    <div>
      <>
        <h2>{fileName}</h2>

        {fileMetaData?.numPages && (
          <h2>Number Of Pages: {fileMetaData?.numPages}</h2>
        )}
        <Document
          onLoadSuccess={(doc: Document) => {
            setFileMetaData(doc);
          }}
          file={fileData}
        >
          {buildPages()}
        </Document>
      </>
      {!fileData && <input type="file" onChange={handleFileChange} />}
    </div>
  );
}

export default PDFViewer;
