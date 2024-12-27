import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ProjectProps } from "../../../../props"
import { faCircle, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useMemo, useState } from "react";
import { CardProject } from "../../../../types";
import { escapeRegExp } from "../../../../utils/RegexUtil";


function ProjectsComponent({ trans, projects }: Readonly<ProjectProps>) {
    const [showMoreData, setShowMoreData] = useState(false)
    const data = useMemo<Array<CardProject>>(initData, [trans]);
    const [showData, setShowData] = useState<Array<CardProject>>(initShowData)

    function initData(): Array<CardProject> {
        const newData: Array<CardProject> = [];
        projects.forEach(item => {
            const pro: CardProject = {
                ...item,
                sectorName: trans.sector.find(x => x.id == item.sector)?.text ?? ""
            }
            newData.push(pro);
        })
        return newData;
    }

    function initShowData(): Array<CardProject> {
        return data.slice(0, 6);
    }

    const [textFilter, setTextFilter] = useState('');
    const [sectorFilter, setSectorFilter] = useState(0);

    function handleTextFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
        setTextFilter(e.target.value);
    }

    function handleSectorFilterChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setSectorFilter(parseInt(e.target.value));
    }

    function filter(data: CardProject) {

        const regex = new RegExp(escapeRegExp(textFilter), "gi");
        const filteredArray = data.technologies.filter(item => regex.exec(item));
        return 0 < filteredArray.length && (sectorFilter == 0 || sectorFilter == data.sector);
    }

    useEffect(() => {
        const newData = data.filter(item => filter(item));
        if (showMoreData) {
            setShowData(newData); // Muestra todos los elementos
        } else {
            setShowData(newData.slice(0, 6)); // Muestra solo los primeros 6
        }
    }, [showMoreData, data, textFilter, sectorFilter]);

    return (
        <section id="project" className="section project py-10" data-title={trans?.text}>
            <div className="section-scroll">
                <div className="mb-10">
                    <h2 className="font-bold text-center">{trans.text}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-x-5 lg:mb-5 mb-10 gap-y-5 lg:gap-y-0 lg:px-0">
                    <div className="md:col-span-5 lg:col-span-4">
                        <label htmlFor="nameProjectFilter">{trans.nameLabel}</label>
                        <input data-testid="nameProjectFilter" id="nameProjectFilter" className="w-full" onChange={handleTextFilterChange} type="text" />
                    </div>

                    <div className="md:col-span-5 lg:col-span-3">
                        <label htmlFor="sectorFilter">{trans.sectorLabel}</label>
                        <select id="sectorFilter" className="w-full" onChange={handleSectorFilterChange}>
                            {
                                trans.sector.map((item) => (
                                    <option value={item.id} key={`option-filter-sector-${item.id}`}>
                                        {item.text}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                </div>

                {
                    showData.length === 0 &&
                    <div className="text-center">
                        {trans.noRecords}
                    </div>
                }

                <div data-testid="projects" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                    {
                        showData.map((item) => (
                            <div className="card" key={`card-project-${item.id}`}>
                                <div className="card__image">
                                    <a href={item.live} target='_blank' className="relative">
                                        <img className="rounded-t-lg" src={item.image} alt="project" />
                                        <div className="project__sector absolute right-0 top-0 px-2 py-1 shadow-lg">
                                            <div className="project__sector__text px-2 py-1 rounded ">
                                                {item.sectorName}
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                <div className="p-3 lg:p-5 h-full grid grid-cols-1 content-between">
                                    <div className="align-bottom">
                                        <h5 className="leading-8 font-bold">{item.title}</h5>
                                        <p className="leading-3 font-sm cl-primary font-medium">{item.rol}</p>
                                        <ul className="pt-3">
                                            {
                                                item.technologies.map((t, i) => (
                                                    <li key={`card-project-item-${i}`}>{t}</li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                    <div className="pt-4 flex justify-center lg:block">
                                        <a href={item.live} className="btn btn--live w-max animated-border" target='_blank'>
                                            <span className="text-base">{trans.liveText} &nbsp;</span>
                                            <FontAwesomeIcon
                                                className="text-sm"
                                                icon={faCircle}
                                            ></FontAwesomeIcon>
                                        </a>
                                    </div>

                                </div>
                            </div>
                        ))
                    }

                </div>
                {
                    5 < showData.length &&
                    <div className="w-100 flex justify-center pt-10">
                        <button data-testid="open-all" className="btn gap-x-2 growShrink" onClick={() => setShowMoreData(!showMoreData)}>
                            <span className="text-base">
                                {showMoreData ? trans.closeCard : trans.openCard}
                            </span>
                            <FontAwesomeIcon className='text-base'
                                icon={showMoreData ? faEyeSlash : faEye}
                            ></FontAwesomeIcon>
                        </button>
                    </div>
                }
            </div>

        </section>
    )
}

export default ProjectsComponent
