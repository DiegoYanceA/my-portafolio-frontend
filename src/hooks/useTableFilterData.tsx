import { useEffect, useState } from "react";
import { StackTable } from "../types";
import { escapeRegExp } from "../utils/RegexUtil";

export const useTableFilterData = (data: Array<StackTable>, min: number, max: number) => {
    const [categoryFilter, setCategoryFilter] = useState(0);
    const [textFilter, setTextFilter] = useState('');
    const [experienceFilter, setExperienceFilter] = useState(0);
    const [minValue, setMinValue] = useState(min);
    const [maxValue, setMaxValue] = useState(max);

    const [filteredData, setFilteredData] = useState(initFilter);

    function handleCategoryFilterChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setCategoryFilter(parseInt(e.target.value));
    }

    function handleTextFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
        setTextFilter(e.target.value);
    }

    function handleExperienceFilterChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setExperienceFilter(parseInt(e.target.value, 10));
    }

    function handleMinChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = Math.min(Number(event.target.value), maxValue);
        setMinValue(value);
    };

    // Función para manejar el cambio del slider máximo
    function handleMaxChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = Math.max(Number(event.target.value), minValue);
        setMaxValue(value);
    };

    function handleFilteredDataChange(newData: Array<StackTable>) {
        setFilteredData(newData)
    }

    function filter(item: StackTable) {
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
            return categoryFilter === 0 || categoryFilter === item.idSkill
        }

        return regex.exec(item.title) && whichExperience() && yearRange && whichcategory();
    }

    function initFilter() {
        return data.filter(item => filter(item));
    }

    useEffect(() => {
        const newData = data.filter(item => filter(item));
        setFilteredData(newData);
    }, [textFilter, experienceFilter, minValue, maxValue, categoryFilter])

    return {
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
    }
}