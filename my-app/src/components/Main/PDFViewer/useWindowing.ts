import React, { useEffect, useState } from "react";
import { PDFSection, ReadingStatus } from "./types";
import CONSTANTS from "../../../CONSTANTS";
interface Props {
  fileMetaData: any; //todo
  currentPage: number;
}
function useWindowing(props: Props) {
  const fileLen = props.fileMetaData?.numPages;
  const sectionSize: number = Math.floor(
    fileLen / CONSTANTS.MaxNumOfPagesToLoad
  );
  const sectionsLen = fileLen / sectionSize;
  const [sections, setSections]: [PDFSection | null, Function] = useState(null);
  const [currentSection, setCurrentSection]: [number, Function] = useState(0);

  useEffect(() => {
    let sections: PDFSection[] = [];

    for (let i = 0; i < sectionsLen; i + sectionSize) {
      sections.push({ startIDX: i, endIDX: i + sectionSize });
    }
    const lastSection = sections[sectionsLen - 1];
    if (lastSection.endIDX !== fileLen) {
      sections.push({ startIDX: lastSection.endIDX + 1, endIDX: fileLen - 1 });
    }
    setSections(sections);
  }, [props.fileMetaData]);

  useEffect(() => {
    const currentSection = Math.floor(
      fileLen / (props.currentPage * sectionSize)
    );
    setCurrentSection(currentSection);
  }, [props.currentPage]);

  return { sections, currentSection };
}
export default useWindowing;
