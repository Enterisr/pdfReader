export interface ReadingStatus {
  currentPage?: number;
  currentSection?: PDFSection;
}
export interface PDFSection {
  startIDX: number;
  endIDX: number;
}
