import  { FC } from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
import { PaginationProps } from '@/types'
import usePagination from '@/hooks/usePagination'


const PaginationComponent : FC<PaginationProps> = ({page, setPage, totalPages}) => {
const {arrayPage, endPage, startPage} = usePagination(totalPages, page ,5)
  return (
    <Pagination tabIndex={page}>
        <PaginationContent>
        <PaginationItem onClick={()=>{page > 1 &&setPage( page-1)}}>
            <PaginationPrevious  />
        </PaginationItem>
            {arrayPage.slice(startPage,endPage).map((page)=>{
                return <PaginationItem  key={page}  onClick={()=>{setPage(page)}}>
                            <PaginationLink>{page}</PaginationLink>
                        </PaginationItem>
            })}
        <PaginationItem onClick={()=>{page< totalPages &&setPage(page+1)}}>
            <PaginationNext />
        </PaginationItem>
        </PaginationContent>
  </Pagination>
  )
}

export default PaginationComponent
