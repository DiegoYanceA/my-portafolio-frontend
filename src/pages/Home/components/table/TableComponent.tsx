import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SkillsTableProps } from "../../../../props";
import { faChevronLeft, faChevronRight, faCircleCheck, faCircleXmark, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useMemo, useState } from "react";
import { StackTable } from "../../../../types";
import { useTableFilterData } from "../../../../hooks/useTableFilterData";
import { usePaginator } from "../../../../hooks/usePaginator";

function TableComponent({ skills, trans, categories }: Readonly<SkillsTableProps>) {
    const min = 0;
    const max = 3;
    const data = useMemo<Array<StackTable>>(initData, [skills]);

    const {
        categoryFilter,
        textFilter,
        experienceFilter,
        minValue,
        maxValue,
        filteredData,
        handleCategoryFilterChange,
        handleTextFilterChange,
        handleExperienceFilterChange,
        handleMinChange,
        handleMaxChange,
        handleFilteredDataChange
    } = useTableFilterData(data, min, max);

    const {
        swiperRef,
        currentPage,
        totalPages,
        currentData,
        showingRows,
        changePage,
        handleRowPerPageChange,
    } = usePaginator(filteredData);

    const [expandedRow, setExpandedRow] = useState<number | null>(null);

    function initData(): Array<StackTable> {
        let newData: Array<StackTable>;
        newData = skills.map(item => item.stacks.map(s => ({
            ...s,
            idSkill: item.id,
            category: findCategoryById(item.id)
        }))).flat();

        newData.sort((a, b) => {
            // First, compare by years
            if (a?.year !== b?.year) {
                return b.year - a.year;  // upward by year
            }

            // if the yeas is tha same, compare by name
            return a.title.localeCompare(b.title); // upward by name
        });

        return newData;
    }

    function findCategoryById(id: number) {
        return categories.find(c => c.id == id)?.text ?? "";
    }

    function toggleExpand (rowId: number) {
        setExpandedRow((prev) => (prev === rowId ? null : rowId));
    }

    useEffect(() => {
        const newData = filteredData.map(item => ({
            ...item,
            category: findCategoryById(item.idSkill)
        }))
        handleFilteredDataChange(newData);
    }, [trans])

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-x-5 lg:mb-5 mb-10 gap-y-5 lg:gap-y-0 lg:px-0">
                <div className="md:col-span-6 lg:col-span-4">
                    <label htmlFor="nameTableFilter">{trans.nameLabel}</label>
                    <input id="nameTableFilter" className="w-full" onChange={handleTextFilterChange} type="text" value={textFilter} />  
                </div>

                <div className="md:col-span-6 lg:col-span-3">
                    <label htmlFor="categoryFilter">{trans.categoryLabel}</label>
                    <select id="categoryFilter" value={categoryFilter} className="w-full" onChange={handleCategoryFilterChange}>
                        {
                            categories.map((item) => (
                                <option value={item.id} key={`option-filter-category-${item.id}`}>
                                    {item.text}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <div className="md:col-span-6 lg:col-span-2">
                    <label htmlFor="experienceFilter">{trans.experienceLabel}</label>
                    <select id="experienceFilter" value={experienceFilter} className="w-full" onChange={handleExperienceFilterChange}>
                        {
                            trans.experienceOptions.map((item) => (
                                <option value={item.id} key={`option-filter-experience-${item.id}`}>
                                    {item.text}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <div className="md:col-span-6 lg:col-span-2 px-2">
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
                            trans.header.map((item) => (
                                <th key={`header-skill-${item.id}`} className={`${(item.id == 1) ? '' : 'hidden'} lg:table-cell`}>
                                    {item.text}
                                </th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody className="hidden lg:table-row-group">
                    {
                        currentData.map((item) => {
                            return (
                                item != null &&
                                <tr key={`item-skill-${item.id}`}>
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
                <tbody ref={swiperRef} className="lg:hidden">
                    {
                        currentData.map((item) => {
                            return (
                                item != null &&
                                <tr key={`item-skill-${item.id}`}>
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
                                                    onClick={() => toggleExpand(item.id)}
                                                    className="btn btn--rounded">
                                                    {
                                                        item.id == expandedRow ? <FontAwesomeIcon
                                                            icon={faMinus}
                                                        ></FontAwesomeIcon> : <FontAwesomeIcon
                                                            icon={faPlus}
                                                        ></FontAwesomeIcon>
                                                    }
                                                </button>
                                            </div>
                                        </div>
                                        <div className={`grid grid-cols-4 py-3 content ${item.id == expandedRow ? "visible" : ""}`}>
                                            <div className="col-span-2">
                                                {trans.header[2].text}:
                                            </div>
                                            <div className="col-span-2">
                                                {item.category}
                                            </div>
                                            <div className="col-span-2">
                                                {trans.header[3].text}:
                                            </div>
                                            <div className="col-span-2">
                                                {item.year}
                                            </div>
                                            <div className="col-span-2">
                                                {trans.header[4].text}:
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
                    {
                        0 < totalPages && <tr>
                            <td colSpan={trans.header.length}>
                                <div className="flex items-center gap-5 lg:gap-10 justify-center lg:justify-between flex-wrap flex-col-reverse lg:flex-row">
                                    <div className="flex items-center gap-3">
                                        <div>
                                            {showingRows(trans.footer.showRows)}
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
                    }
                    {
                        totalPages === 0 && <tr>
                            <td colSpan={trans.header.length} className="text-center">
                                {trans.footer.noRecords}
                            </td>
                        </tr>
                    }
                </tfoot>
            </table>
        </>
    )
}

export default TableComponent;