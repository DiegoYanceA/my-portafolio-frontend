import { afterEach, describe, expect, it, vi } from 'vitest'
import NavegatorComponent from './NavegatorComponent'
import { fireEvent, render , screen} from '@testing-library/react';
import { Preference, TranslationLiteral } from '../../types';

const IntersectionObserverMock = vi.fn(() => ({
    disconnect: vi.fn(),
    observe: vi.fn(),
    takeRecords: vi.fn(),
    unobserve: vi.fn(),
  }))
  
vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)

describe('<NavegatorComponent />', () => {

    afterEach(() => {
        vi.restoreAllMocks()
    })
    
    it('Close Navegator', () => {
        
        const trans: TranslationLiteral = {
            home: {
                "text": "Inicio",
                "description": "-"
            },
            user: {
                "text": "-",
                "description": "-",
                "hackaton": "Hackathon Virtual",
                "bachelor": "Bachiller"
            },
            project: {
                "description": "-",
                "text": "Proyectos",
                "sector": [],
                "openCard": "Mostrar más",
                "closeCard": "Mostrar menos",
                "liveText": "En vivo",
                "nameLabel": "Tecnología",
                "sectorLabel": "Rubro",
                "noRecords": "No hay proyectos que coincidan con tu búsqueda"
            },
            skills: {
                "description": "-",
                "text": "Habilidades",
                "experience": "Comparativa de años de experiencia por",
                "proficiency": "Comparativa de años de competencias en formación por",
                "categories": [],
                "table":{
                    "header":[],
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
            },
            contact: {
                "text": "Contáctame",
                "description": "-",
                "snackbard": {
                    "copy": "Copiado!"
                }
            },
            footer:{
                "text": "Todos los derechos reservados",
                "description": "-"
            }
        }
        
        const preference: Preference = {
            lang: 'es',
            dark: true
        }

        render(<NavegatorComponent
                preference={preference}
                translationLiteral ={trans}
                changeLang={vi.fn()}
                changeThemeMode={vi.fn()}
            />);
        
        const button = screen.getByTestId('skills');
        fireEvent.click(button);
        
        const title = screen.getByTestId('title');
        expect(title.textContent).toBe("");
    })
})