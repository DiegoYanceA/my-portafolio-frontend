import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SkillsTableProps } from "../props";
import { faChevronLeft, faChevronRight, faCircleCheck, faCircleXmark, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useMemo, useRef, useState } from "react";
import { SkillStackTable } from "../types";

function TableComponent({ skills, translationLiteral }: SkillsTableProps) {
    const trans = translationLiteral.skills.table;
    const [category, _] = useState<Array<string>>(initCategory);
    const [categoryFilter, setCategoryFilter] = useState('*');
    const [textFilter, setTextFilter] = useState('');
    const [experienceFilter, setExperienceFilter] = useState(0);
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(3);
    const [expandedRow, setExpandedRow] = useState<number | null>(null);

    const min = 0;
    const max = 3;

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(trans.rowsPerPage ?? 10);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    const data = useMemo<Array<SkillStackTable>>(initData, [skills]);

    const filterData = useMemo(initFilter,
        [data, textFilter, experienceFilter, minValue, maxValue, categoryFilter]
    );

    const currentData = filterData.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filterData.length / rowsPerPage);



    function initData(): Array<SkillStackTable> {
        let newData: Array<SkillStackTable>;
        newData = skills.map(item => item.stacks.map(s => ({
            ...s,
            category: item.title
        }))).flat();

        newData.sort((a, b) => {
            // Primero, comparar por el año
            if (a?.year !== b?.year) {
                return b.year - a.year;  // Ascendente por año
            }

            // Si los años son iguales, comparar por nombre
            return a.title.localeCompare(b.title); // Ascendente por nombre
        });

        return newData;
    }

    function initCategory() {
        return skills.map(item => item.title);
    }

    function initFilter() {
        setCurrentPage(1);
        return data.filter(item => filter(item));
    }

    function changePage(page: number) {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    function handleTextFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
        setTextFilter(e.target.value);
    }

    function handleExperienceFilterChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setExperienceFilter(parseInt(e.target.value, 10));
    }

    function handleCategoryFilterChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setCategoryFilter(e.target.value);
    }

    function escapeRegExp(text: string) {
        return text.replace(/[.*+?^=!:${}()|\[\]\/\\]/g, '\\$&');
    }    

    function filter(item: SkillStackTable) {
        const regex = new RegExp(escapeRegExp(textFilter), "gi");
        const whichExperience = () => {
            switch (experienceFilter) {
                case 0: return true;
                case 1: return item?.experience
                case 2: return !item?.experience
            }
        }

        const yearRange = (minValue + 1) <= item.year && item.year <= (maxValue + 1);
        const whichcategory = () => {
            return categoryFilter === "*" || categoryFilter === item.category
        }

        return item.title.match(regex) && whichExperience() && yearRange && whichcategory();
    }

    const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.min(Number(event.target.value), maxValue);
        setMinValue(value);
    };

    // Función para manejar el cambio del slider máximo
    const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(Number(event.target.value), minValue);
        setMaxValue(value);
    };

    const handleRowPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentPage(1);
        setRowsPerPage(parseInt(event.target.value));
    }

    const toggleExpand = (rowId: number) => {
        setExpandedRow((prev) => (prev === rowId ? null : rowId));
    };

    const swiper = useRef<HTMLTableSectionElement | null>(null);


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
                        if (c + 1 <= totalPages) {
                            return c + 1;
                        }
                        return c;
                    })
                }
            }
        }

        const handleTouchStart = (e: TouchEvent) => {
            startX = e.touches[0].clientX;
        }

        const handleTouchEnd = (e: TouchEvent) => {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        };

        if (swiper != null && swiper.current != null) {

            swiper.current.addEventListener("touchstart", handleTouchStart);
            swiper.current.addEventListener("touchend", handleTouchEnd);
        }

        return () => {
            if (swiper.current != null) {
                swiper.current.removeEventListener("touchstart", handleTouchStart);
                swiper.current.removeEventListener("touchend", handleTouchEnd);
            }
        };

    }, [])



    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-5 lg:mb-5 mb-10 gap-y-5 lg:gap-y-0 lg:px-0">
                <div className="lg:col-span-4">
                    <label htmlFor="nameFilter">{trans.nameLabel}</label>
                    <input id="nameFilter" className="w-full" onChange={handleTextFilterChange} type="text" value={textFilter} />
                </div>

                <div className="lg:col-span-3">
                    <label htmlFor="categoryFilter">{trans.categoryLabel}</label>
                    <select id="categoryFilter" className="w-full" onChange={handleCategoryFilterChange}>
                        <option value={"*"}>
                            {trans.experienceOptions[0]}
                        </option>
                        {
                            category.map((item, index) => (
                                <option value={item} key={`option-filter-category-${index}`}>
                                    {item}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <div className="lg:col-span-2">
                    <label htmlFor="experienceFilter">{trans.experienceLabel}</label>
                    <select id="experienceFilter" className="w-full" onChange={handleExperienceFilterChange}>
                        {
                            trans.experienceOptions.map((item, index) => (
                                <option value={index} key={`option-filter-experience-${index}`}>
                                    {item}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <div className="lg:col-span-2 px-2">
                    <div className="block w-full mb-3">
                        {trans.yearsLabel}: {minValue + 1} - {maxValue + 1}
                    </div>
                    <div className="range">
                        <div className="range-slider">
                            <span className="range-selected" style={{
                                left: `${(minValue / max) * 100}%`,
                                right: `${100 - (maxValue / max) * 100}%`,
                            }}></span>
                        </div>
                        <div className="range-input">
                            <input type="range" min={min} max={max} value={minValue} onChange={handleMinChange} />
                            <input type="range" min={min} max={max} value={maxValue} onChange={handleMaxChange} />
                        </div>
                    </div>
                </div>
            </div>
            <table className="w-full">
                <thead>
                    <tr>
                        {
                            trans.header.map((item, index) => (
                                <th key={`header-skill-${index}`} className={`${(index == 1) ? '' : 'hidden'} lg:table-cell`}>
                                    {item}
                                </th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody className="hidden lg:table-row-group">
                    {
                        currentData.map((item, index) => {
                            return (
                                item != null &&
                                <tr key={`item-skill-${index}`}>
                                    <td>
                                        <img src={item?.logo} alt={item.title} />
                                    </td>
                                    <td className="col-span-5">
                                        {item.title}
                                    </td>
                                    <td>
                                        {item.category}
                                    </td>
                                    <td className="text-center">
                                        {item.year}
                                    </td>
                                    <td className="text-center">
                                        {item.experience ?
                                            <FontAwesomeIcon className="text-green-500" icon={faCircleCheck}></FontAwesomeIcon> :
                                            <FontAwesomeIcon className="text-red-500" icon={faCircleXmark}></FontAwesomeIcon>}
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
                <tbody ref={swiper} className="lg:hidden">
                    {
                        currentData.map((item, index) => {
                            return (
                                item != null &&
                                <tr key={`item-skill-${index}`}>
                                    <td>
                                        <div className="flex flex-row justify-between items-center">
                                            <div>
                                                <img src={item?.logo} alt={item.title} />
                                            </div>
                                            <div>
                                                {item.title} <b>({item.year} {trans.yearsLabel.toLocaleLowerCase()})</b>
                                            </div>

                                            <div>
                                                <button
                                                    onClick={() => toggleExpand(index)}
                                                    className="btn btn--rounded">
                                                    {
                                                        index == expandedRow ? <FontAwesomeIcon
                                                            icon={faMinus}
                                                        ></FontAwesomeIcon> : <FontAwesomeIcon
                                                            icon={faPlus}
                                                        ></FontAwesomeIcon>
                                                    }
                                                </button>
                                            </div>
                                        </div>
                                        <div className={`grid grid-cols-4 py-3 content ${index == expandedRow?"visible": ""}`}>
                                            <div className="col-span-2">
                                                {trans.header[2]}:
                                            </div>
                                            <div className="col-span-2">
                                                {item.category}
                                            </div>
                                            <div className="col-span-2">
                                                {trans.header[3]}:
                                            </div>
                                            <div className="col-span-2">
                                                {item.year}
                                            </div>
                                            <div className="col-span-2">
                                                {trans.header[4]}:
                                            </div>
                                            <div className="col-span-2">
                                                {item.experience ?
                                                    <FontAwesomeIcon className="text-green-500" icon={faCircleCheck}></FontAwesomeIcon> :
                                                    <FontAwesomeIcon className="text-red-500" icon={faCircleXmark}></FontAwesomeIcon>}
                                            </div>
                                        </div>

                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={trans.header.length}>
                            <div className="flex items-center gap-5 lg:gap-10 justify-center lg:justify-between flex-wrap flex-col-reverse lg:flex-row">
                                <div className="flex items-center gap-3">
                                    <div>
                                        Mostrando {startIndex + 1} a {(filterData.length <= rowsPerPage * currentPage) ? filterData.length : rowsPerPage * currentPage} de {filterData.length}
                                    </div>
                                    <div>
                                        <select onChange={handleRowPerPageChange} name="pages" id="pages">
                                            <option value="10">10</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="paginator  justify-center">
                                    <button
                                        onClick={() => changePage(currentPage - 1)}
                                        disabled={currentPage === 1}
                                    >
                                        <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
                                    </button>

                                    {Array.from({ length: totalPages }, (_, index) => (
                                        <button
                                            className={`paginator__item ${currentPage === index + 1 && '--active'}`}
                                            key={index + 1}
                                            onClick={() => changePage(index + 1)}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}

                                    <button
                                        onClick={() => changePage(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                    >
                                        <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </>
    )
}

export default TableComponent;