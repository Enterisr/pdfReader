import React, { useEffect, useState } from "react";
import CONSTANTS from "../../../CONSTANTS";
interface Props {
  pagesCount: number;
}
function useReadingStatus(props: Props) {
  let [currentPage, setCurrentPage]: [number, Function] = useState(0);

  function onKeyDown(e: KeyboardEvent) {
    e.preventDefault();
    if (e.key === CONSTANTS.LeftKeyCode) {
      if (currentPage > 0) {
        setCurrentPage(--currentPage);
      }
    } else if (e.key === CONSTANTS.RightKeyCode) {
      if (currentPage < props.pagesCount) {
        setCurrentPage(++currentPage);
      }
    }
  }
  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);
  return currentPage;
}
