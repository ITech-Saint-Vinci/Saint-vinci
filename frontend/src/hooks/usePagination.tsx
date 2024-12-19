import { useEffect, useState } from 'react'

const usePagination = (totalPages: number, page: number, displayedPage: number) => {
    const arrayPage = [...Array(totalPages).keys()].map(i => i + 1)
        const [startPage, setStartPage] = useState(0)
        const [endPage, setEndPage] = useState(totalPages)
        const calculatePageIndices = (currentPage: number, totalPages: number, displayedPage: number) => {
            let startIndex, endIndex;
          
            if (totalPages <= displayedPage) {
              startIndex = 0;
              endIndex = totalPages;
            } else {
              if (currentPage <= Math.ceil(displayedPage / 2)) {
                startIndex = 0;
                endIndex = displayedPage;
              } else if (currentPage + Math.floor(displayedPage / 2) >= totalPages) {
                startIndex = totalPages - displayedPage;
                endIndex = totalPages;
              } else {
                startIndex = currentPage - Math.ceil(displayedPage / 2);
                endIndex = currentPage + Math.floor(displayedPage / 2);
              }
            }
            return { startIndex, endIndex };
        }
        useEffect(()=>{
        const {startIndex, endIndex} = calculatePageIndices(page, totalPages, displayedPage)
        setEndPage(endIndex)
        setStartPage(startIndex)
    }, [page, totalPages])
    return {startPage, endPage, arrayPage}
}

export default usePagination
