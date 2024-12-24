import { Chart } from "react-google-charts";

import { Skill, Stack } from '../types';
import { SkillsProps } from '../props';
import TableComponent from "./TableComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartPie } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const options = {
    backgroundColor: "transparent",
    titleTextStyle: {
        color: "white",
        fontSize: 15,
        bold: true
    },
    sliceVisibilityThreshold: 0.02,
    legend: {
        alignment: "center",
        textStyle: {
            color: "white",
            fontSize: 12,
        },
    },
    tooltip: {
        textStyle: {
            color: "black"
        }
    },
    colors: ["#FF7043", "#4FC3F7", "#BA68C8", "#FF80AB", "#D81B60", "#66BB6A", "#FFB300", "#9575CD", "#A7C7E7"]

};

function SkillsComponent({ skills, trans, isDark }: SkillsProps) {
    const [openGraphic, setOpenGraphic] = useState(false)

    const experience = skills.map(skill => ({
        ...skill,
        stacks: skill.stacks != null ? skill.stacks.filter(stack => stack.experience) : []
    }));

    const proficiency = skills.map(skill => ({
        ...skill,
        stacks: skill.stacks != null ? skill.stacks.filter(stack => !stack.experience) : []
    }));

    const graphicSkills = (item: Skill, double: boolean) => {

        if (item.stacks == null || item.stacks.length < 1) return

        const cloneOpt = {
            ...options,
            titleTextStyle: {
                ...options.titleTextStyle,
                color: isDark ? "white" : "#213547"
            },
            legend: {
                ...options.legend,
                textStyle: {
                    ...options.legend.textStyle,
                    color: isDark ? "white" : "#213547"
                }
            }
        };

        const stacks: Array<Stack> = item.stacks;

        stacks.sort((a, b) => {
            if (b.year !== a.year) {
                return b.year - a.year;
            }

            return a.title.localeCompare(b.title);
        });

        const list = item.stacks?.map(s => {
            const year = s.year > 1 ? "años" : "año";
            return [`${s.title} (${s.year} ${year})`, s.year]
        });

        const data = [
            ["Skills", "Habilidad por años"],
            ...list
        ];

        const addClass = double ? "lg:col-span-2" : "";

        let title = item.title;
        if (trans?.list != null) {
            const skillsTrans = trans.list;
            const itemTrans = skillsTrans.find(x => x.id == item.id);
            if (itemTrans != null) {
                title = itemTrans.title;
            }
        }

        return (
            <div key={`${item.id}-${title}`} className={`text-center ${addClass}`}>
                <h6>{title}</h6>
                <Chart
                    chartType="PieChart"
                    data={data}
                    width={"100%"}
                    height={(window.innerWidth < 768) ? 220 : 370}
                    options={cloneOpt}
                />
            </div>
        )
    }



    return (
        <div id="skills" className="section skills py-10" data-title={trans?.text}>
            <div className="section-scroll ">
                <div className="mb-10">
                    <div className="w-full">
                        <h2 className="font-bold text-center mb-10">{trans?.text}</h2>
                    </div>

                    <div>
                        <TableComponent
                            skills={skills}
                            trans={trans.table}
                        />
                    </div>
                </div>

                <div className="w-100 flex justify-center mb-10">
                    <button className="btn gap-x-2 growShrink" onClick={() => setOpenGraphic(!openGraphic)}>
                        <span className="text-base">
                            {openGraphic ? trans.closeGraphic : trans.openGraphic}
                        </span>
                        <FontAwesomeIcon className='text-base'
                            icon={faChartPie}
                        ></FontAwesomeIcon>
                    </button>
                </div>

                {openGraphic &&
                    <div>
                        <div className="w-full mb-10">
                            <h4 className="font-bold text-center">{trans?.experience}</h4>
                        </div>

                        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-x-3">
                            {
                                experience.map((item, index) => {
                                    return graphicSkills(item,
                                        (experience.length % 2 !== 0
                                            && experience.length - 1 == index))
                                })
                            }
                        </div>

                        <div className="w-full mb-10">
                            <h5 className="font-bold text-center">{trans?.proficiency}</h5>
                        </div>

                        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-x-3">
                            {
                                proficiency.map((item, index) => {
                                    return graphicSkills(item,
                                        (proficiency.length % 2 !== 0
                                            && proficiency.length - 1 == index))
                                })
                            }
                        </div>
                    </div>
                }
            </div>

        </div>
    )
}

export default SkillsComponent
