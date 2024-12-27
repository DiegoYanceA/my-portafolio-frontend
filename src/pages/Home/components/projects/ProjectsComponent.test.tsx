import { describe, expect, it } from 'vitest'
import ProjectsComponent from './ProjectsComponent'
import { fireEvent, render, screen } from '@testing-library/react';


describe('<ProjectsComponent />', () => {

    const projects = [
        {
            "id": 1,
            "title": "Inteligo SAB",
            "technologies": ["Html5", "CSS", "Javascript", "Java", "C#", "React.js", "Liferay 7.4",  "Azure Cloud", "SQL Server", "CosmoDB", "Bitbucket", "Jira", "Git", "Dapper"],
            "live": "https://login.inteligosab.com/home",
            "image": "./projects/inteligo.png",
            "rol": "Full Stack",
            "sector": 5
        },
        {
            "id": 2,
            "title": "Belcorp",
            "technologies": ["Html5", "CSS", "Javascript", "C#", "React.js", ".NET Framework 4.8", "Dotnet 8", "SQL Server", "Git"],
            "live": "https://www.somosbelcorp.com/",
            "image": "./projects/belcorp.png",
            "rol": "Backend",
            "sector": 2
        },
        {
            "id": 3,
            "title": "DIVEMOTOR Colombia",
            "technologies": ["Html5", "CSS", "Javascript", "JQuery", "Liferay 7.4", "Azure Devops", "Git"],
            "live": "https://divemotor.com.co/",
            "image": "./projects/divemotor.png",
            "rol": "Frontend",
            "sector": 1
        },
        {
            "id": 4,
            "title": "Fuso Chile",
            "technologies": ["Html5", "CSS", "Javascript", "JQuery", "Liferay 7.4", "Azure Devops", "Git"],
            "live": "https://www.fuso.cl/",
            "image": "./projects/fuso.png",
            "rol": "Frontend",
            "sector": 1
        },
        {
            "id": 5,
            "title": "Maxus Chile",
            "technologies": ["Html5", "CSS", "Html5", "CSS", "Javascript", "JQuery", "Liferay 7.4", "Azure Devops", "Git"],
            "live": "https://www.maxus.cl/",
            "image": "./projects/maxus.png",
            "rol": "Frontend",
            "sector": 1
        },
        {
            "id": 6,
            "title": "Andesmotor Chile",
            "technologies": ["Html5", "CSS", "Javascript", "JQuery", "Liferay 7.4", "Azure Devops", "Git"],
            "live": "https://www.andesmotor.cl/",
            "image": "./projects/andesmotor.png",
            "rol": "Frontend",
            "sector": 1
        },
        {
            "id": 7,
            "title": "NETA Colombia",
            "technologies": ["Html5", "CSS", "Javascript", "JQuery", "Liferay 7.4", "Git"],
            "live": "https://www.netaauto.co.cr/",
            "image": "./projects/neta.png",
            "rol": "Frontend",
            "sector": 1
        },
        {
            "id": 8,
            "title": "Sany Chile",
            "technologies": ["Html5", "CSS", "Javascript", "Angular.js", "Liferay 7.4", "Git"],
            "live": "https://sany.cl/",
            "image": "./projects/sany.png",
            "rol": "Frontend",
            "sector": 1
        },
        {
            "id": 9,
            "title": "Jetour Chile",
            "technologies": ["Html5", "CSS", "Javascript", "JQuery", "Liferay 7.4", "Git"],
            "live": "https://jetourchile.cl/",
            "image": "./projects/jetour.png",
            "rol": "Frontend",
            "sector": 1
        },
        {
            "id": 10,
            "title": "Kaufmann Chile",
            "technologies": ["Html5", "CSS", "Javascript", "JQuery", "Liferay 7.4", "Azure Devops", "Git"],
            "live": "https://www.kaufmann.cl/",
            "image": "./projects/kaufmann.png",
            "rol": "Frontend",
            "sector": 1
        },
        {
            "id": 11,
            "title": "GTD Company",
            "technologies": ["Html5", "CSS", "Javascript", "Liferay 7.4"],
            "live": "https://www.gtdcompany.com/",
            "image": "./projects/gtd.png",
            "rol": "Frontend",
            "sector": 6
        },
        {
            "id": 12,
            "title": "Rotafono - CMS Rotafono",
            "technologies": ["Html5", "CSS", "Javascript", "Sass", "Typescript", "JQuery", "Angular.js", "PHP", "Phalcon", "MongoDB", "Git"],
            "live": "https://rotafono.pe/",
            "image": "./projects/rotafono.png",
            "rol": "Full Stack",
            "sector": 4
        },
        {
            "id": 13,
            "title": "Smartsys",
            "technologies": ["Html5", "CSS", "Sass", "Typescript" , "Javascript", "JQuery", "C#", "Dotnet 8", ".NET Framework 4.8", "Angular.js", "PostgreSQL", "Git", "Bitbucket", "Node.js"],
            "live": "https://www.smartsys.com.pe/",
            "image": "./projects/smartsys.png",
            "rol": "Full Stack",
            "sector": 7
        },
        {
            "id": 14,
            "title": "Bdo Apps",
            "technologies": ["Html5", "CSS", "Javascript", "JQuery", "PHP", "Laravel", "PostgreSQL", "Git", "Dapper"],
            "live": "https://ti.bdooutsourcing.com.pe/BDOapps",
            "image": "./projects/bdo.png",
            "rol": "Full Stack",
            "sector": 7
        },
        {
            "id": 15,
            "title": "MyOn",
            "technologies": ["Html5", "CSS", "Javascript", "JQuery", "C#", ".NET Framework 4.8", "Git"],
            "live": "https://digital.santillana.com.pe/registromyon",
            "image": "./projects/myon.png",
            "rol": "Frontend",
            "sector": 3
        },
        {
            "id": 16,
            "title": "Santillana Proyectos",
            "technologies": ["Html5", "CSS", "Javascript", "JQuery","C#", ".NET Framework 4.8", "SQL server", "Entity Framework"],
            "live": "https://digital.santillana.com.pe/quedateencasa",
            "image": "./projects/santillana-proyectos.png",
            "rol": "Full Stack",
            "sector": 3
        },
        {
            "id": 17,
            "title": "Santillana #QuédateEnCasa",
            "technologies": ["Html5", "CSS", "Javascript", "Unity", "Phaser.js"],
            "live": "https://digital.santillana.com.pe/quedateencasa",
            "image": "./projects/quedateencasa.png",
            "rol": "Frontend",
            "sector": 3
        },
        {
            "id": 18,
            "title": "Santillana Digital",
            "technologies": ["Html5", "CSS", "Javascript", "C#", "JQuery", "Vue.js", ".NET Framework 4.8", "Phaser.js", "Express.js", "Node.js", "Bitbucket", "Git", "SQL server", "MySQL", "Entity Framework", "CodeIgniter"],
            "live": "https://digital.santillana.com.pe",
            "image": "./projects/santillana-digital.png",
            "rol": "Full Stack",
            "sector": 3
        }
        
    ];

    const trans = {
        "text": "Projects",
        "description": "-",
        "sector": [],
        "openCard": "Show more",
        "closeCard": "Show less",
        "liveText": "Live",
        "nameLabel": "Technology",
        "sectorLabel": "Sector",
        "noRecords": "There are no projects that match your search"
    }
    
    it('Test in the filter', () => {
        

        render(<ProjectsComponent
                projects={projects}
                trans={trans}
            />);

        const input = screen.getByTestId('nameProjectFilter');
        fireEvent.change(input, { target: { value: 'phalcon' } });
        
        const cards = screen.getByTestId('projects');
        const length = cards.children.length
        expect(length).toBe(1);
    })

    it('Open all projects', () => {
        
        render(<ProjectsComponent
                projects={projects}
                trans={trans}
            />);
        
        
        const button = screen.getByTestId('open-all');
        fireEvent.click(button)
        
        const cards = screen.getByTestId('projects');
        const length = cards.children.length
        expect(length).toBe(18);
    })
})