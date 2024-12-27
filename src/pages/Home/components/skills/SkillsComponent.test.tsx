import { describe, expect, it } from 'vitest'
import SkillsComponent from './SkillsComponent'
import { render } from '@testing-library/react';


describe('<SkillsComponent />', () => {

    it('Get skills', () => {
        const skills = [
            {
                "id": 1,
                "title": "Lenguaje de Programación",
                "stacks": [
                    {
                        "id": 0,
                        "title": "Javascript",
                        "year": 4,
                        "month": 0,
                        "experience": true,
                        "logo": "./technology/javascript.png"
                    },
                    {
                        "id": 1,
                        "title": "Typescript",
                        "year": 2,
                        "month": 0,
                        "experience": true,
                        "logo": "./technology/ts.png"
                    },
                    {
                        "id": 3,
                        "title": "PHP",
                        "year": 2,
                        "month": 0,
                        "experience": true,
                        "logo": "./technology/php.png"
                    },
                    {
                        "id": 4,
                        "title": "C#",
                        "year": 4,
                        "month": 0,
                        "experience": true,
                        "logo": "./technology/csharp.png"
                    },
                    {
                        "id": 5,
                        "title": "Go",
                        "year": 1,
                        "month": 0,
                        "experience": false,
                        "logo": "./technology/go.png"
                    },
                    {
                        "id": 6,
                        "title": "C++",
                        "year": 1,
                        "month": 0,
                        "experience": false,
                        "logo": "./technology/c++.png"
                    },
                    {
                        "id": 7,
                        "title": "Java",
                        "year": 1,
                        "month": 0,
                        "experience": true,
                        "logo": "./technology/java.png"
                    },
                    {
                        "id": 8,
                        "title": "Python",
                        "year": 1,
                        "month": 0,
                        "experience": false,
                        "logo": "./technology/python.webp"
                    }
                ]
            }
        ];

        const trans = {
            "description": "-",
            "text": "Habilidades",
            "experience": "Comparativa de años de experiencia por",
            "proficiency": "Comparativa de años de competencias en formación por",
            "categories": [],
            "table": {
                "header": [
                    {
                        "id": 0,
                        "text": "Logo"
                    },
                    {
                        "id": 1,
                        "text": "Technology"
                    },
                    {
                        "id": 2,
                        "text": "Category"
                    },
                    {
                        "id": 3,
                        "text": "Years of experience"
                    },
                    {
                        "id": 4,
                        "text": "Work Experience"
                    }
                ],
                "experienceLabel": "Experiencia Laboral",
                "experienceOptions": [],
                "categoryLabel": "Categoría",
                "nameLabel": "Tecnología",
                "yearsLabel": "Años",
                "footer": {
                    "noRecords": "No hay resultados",
                    "showRows": "Mostrando {start} a {end} de {total}"
                }
            },
            "openGraphic": "Mostrar gráficos",
            "closeGraphic": "Ocultar gráficos"
        }

        render(<SkillsComponent
            isDark={false}
            trans={trans}
            skills={skills}
        />);

        const tbody = document.querySelector('tbody');
        const children = tbody?.children;
        expect(children?.length).toBe(8);
    })
})