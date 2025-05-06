import { useEffect, useMemo, useRef, useState } from "react";
import { StackTable } from "../types";

export function usePaginator(data: Array<StackTable>) {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const startIndex = (currentPage - 1) * rowsPerPage;
    
    const endIndex = startIndex + rowsPerPage;

    const currentData = useMemo(() => data.slice(startIndex, endIndex), [data, startIndex, endIndex]);
    
    const totalPages = useMemo(() => Math.ceil(data.length / rowsPerPage), [data]);
    const totalPagesRef = useRef(totalPages);

    const swiperRef = useRef<HTMLTableSectionElement | null>(null);

    function changePage(page: number) {
        if (page >= 1 && page <= totalPages) { 
            setCurrentPage(page);
        }
    };

    function handleRowPerPageChange (event: React.ChangeEvent<HTMLSelectElement>) {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
        setRowsPerPage(parseInt(event.target.value));
    }

    function showingRows(text:string){
        let start = startIndex + 1;
        let end = Math.min(data.length, rowsPerPage * currentPage);
        let total = data.length;

        return text.replace("{start}", String(start))
                             .replace("{end}", String(end))
                             .replace("{total}", String(total))
    }

    useEffect(() => {
        let startX = 0;
        let endX = 0;

        const handleSwipe = () => {
            const deltaX = endX - startX;
            if (Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    setCurrentPage(c => {
                        if (1 <= c - 1) {
                            return c - 1;
                        }
                        return c;
                    })
                } else {
                    setCurrentPage(c => {
                        
                        if (c + 1 <= totalPagesRef.current) {
                            return c + 1;
                        }
                        return c;
                    })
                }
            }
        };

        const handleTouchStart = (e: TouchEvent) => {
            startX = e.touches[0].clientX;
        };

        const handleTouchEnd = (e: TouchEvent) => {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        };

        const current = swiperRef.current;
        if (current) {
            current.addEventListener("touchstart", handleTouchStart);
            current.addEventListener("touchend", handleTouchEnd);
        }

        return () => {
            if (current) {
                current.removeEventListener("touchstart", handleTouchStart);
                current.removeEventListener("touchend", handleTouchEnd);
            }
        };
    }, []);

    useEffect(() => {
        if (currentPage > totalPages || totalPages == 0) {
            setCurrentPage(1);
        }
        totalPagesRef.current = totalPages;
    }, [data])

    return {
        swiperRef,
        currentPage,
        totalPages,
        currentData,
        showingRows,
        changePage,
        handleRowPerPageChange
    };
}