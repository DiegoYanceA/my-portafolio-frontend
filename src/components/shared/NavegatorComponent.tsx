import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faHome,
    faPhone,
    faLightbulb,
    faGear,
    faSun,
    faMoon,
    faTimes,
    faBars,
    faUserNinja
} from '@fortawesome/free-solid-svg-icons'
import { NavegatorProps } from '../../props';
import { useEffect, useRef, useState } from 'react';

function NavegatorComponent({ preference, translationLiteral, changeLang, changeThemeMode }: Readonly<NavegatorProps>) {
    let isDark = preference?.dark;
    let lang = preference?.lang;
    let trans = translationLiteral;

    const winHeight = window.innerHeight;

    //State
    const [openLang, setOpenLang] = useState(false)
    const [openMenu, setOpenMenu] = useState(false)
    const [activeSection, setActiveSection] = useState<string  | null>(null);
    const [title, setTitle] = useState<string  | null>(null);
    const [progress, setProgress] = useState(0);

    const itemLangRef = useRef<HTMLLIElement  | null>(null);
    const menuFloatRef = useRef<HTMLDivElement  | null>(null);

    function toggleLang() {
        setOpenLang(open => {
            if(!open) {
                if(itemLangRef.current != null && menuFloatRef.current != null){
                    const rect = itemLangRef.current.getBoundingClientRect()
                    const menu = menuFloatRef.current;
                    menu.style.top = rect.y + "px"
                }   
            }
            return !open;
        });
    }

    function selectLang (lang: string) {
        setOpenLang(false);
        changeLang(lang)
    }

    function toggleMenu() {
        setOpenLang(false);
        setOpenMenu(open => !open);
    }

    function showMenuDesktop() {
        document.body.classList.remove("no-scroll");
        if(window.innerWidth < 768){
            if(openMenu) {
                document.body.classList.add("no-scroll");
                return "move-right";
            }

            return "move-left";
        }
        return "";
    }

    function showSection(item: HTMLElement, winHeight:number) {
        const rect = item.getBoundingClientRect();
        if(!item.classList.contains("visible")){
            
            if(rect.top <= winHeight){
                item.classList.add("visible")
            }
        }
    }

    useEffect(() => {
        // Crear un observer para las secciones
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const target = entry.target as HTMLElement;
                        if(target.dataset.title != null){
                            setTitle(target.dataset.title);
                        }
                        
                        setActiveSection(target.id);

                        const item = entry.target as HTMLElement;
                        const find = item.firstChild as HTMLElement
                        showSection(find, winHeight)
                    }
                });
            },
            {
                threshold: 0.2,
            }
        );

        // Seleccionar todas las secciones para observar
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => observer.observe(section));

        return () => {
            observer.disconnect();
        }
    }, [translationLiteral])
    

    useEffect(() => {
        const docHeight = document.documentElement.scrollHeight;
        const handleScroll = () => {
            const scrollTop = window.scrollY; 
            
            if (docHeight <= winHeight) {
                setProgress(100);
                return;
            }

            const scrollProgress = (scrollTop / (docHeight - winHeight)) * 100;
            setProgress(scrollProgress); 
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    return (
        <>
            <div className={"progress-bar top-0 fixed h-0.5 overflow-hidden z-40 w-full"}>
                <div className={"progress-bar__loading flex flex-col overflow-hidden transition duration-500 w-full h-full"} style={{width: `${progress}%`}}></div>
            </div>
            
            <nav className={`z-30 menu fixed py-2 w-screen md:hidden ${openMenu?"move-up":"move-down"}`}>
                <div className='px-5'>
                    <a className={"truncate block max-w-full" } onClick={toggleMenu}>
                        <FontAwesomeIcon icon={faBars} /> {title}
                    </a>
                </div>
            </nav>
            <nav className={`z-20 navegator fixed h-dvh max-h-vh md:h-dvh ${showMenuDesktop()}`}>
                <div className='h-full'>
                    <div className='h-full grid grids-cols-1 content-between '>
                        <ul className="px-1 md:px-3 grid">
                            <li className='text-center text-2xl md:hidden'>
                                <a onClick={toggleMenu}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </a>
                            </li>
                            <li>
                                <a href="#home" className={activeSection === 'home' ? '--active' : ''}>
                                    <div className='icon'>
                                        <FontAwesomeIcon icon={faHome} />
                                    </div>
                                    <div className='title'>
                                        {trans?.home.text || <div className="animate-pulse h-3 bg-slate-700 rounded mx-5 mt-2"></div>}
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#user" className={activeSection === 'user' ? '--active' : ''}>
                                    <div className='icon'>
                                        <FontAwesomeIcon icon={faUserNinja} />
                                    </div>
                                    <div className='title'>
                                        {trans?.user.text || <div className="animate-pulse h-3 bg-slate-700 rounded mx-5 mt-2"></div>}
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#project" className={activeSection === 'project' ? '--active' : ''}>
                                    <div className='icon'>
                                        <FontAwesomeIcon icon={faGear} />
                                    </div>
                                    <div className='title'>
                                        {trans?.project.text || <div className="animate-pulse h-3 bg-slate-700 rounded mx-5 mt-2"></div>}
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#skills" className={activeSection === 'skills' ? '--active' : ''}>
                                    <div className='icon'>
                                        <FontAwesomeIcon icon={faLightbulb} />
                                    </div>
                                    <div className='title'>
                                        {trans?.skills.text || <div className="animate-pulse h-3 bg-slate-700 rounded mx-5 mt-2"></div>}
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#contact" className={activeSection === 'contact' ? '--active' : ''}>
                                    <div className='icon'>
                                        <FontAwesomeIcon icon={faPhone} />
                                    </div>
                                    <div className='title'>
                                        {trans?.contact.text || <div className="animate-pulse h-3 bg-slate-700 rounded mx-5 mt-2"></div>}
                                    </div>
                                </a>
                            </li>
                        </ul>

                        <ul className="px-1 md:mt-0 md:px-3 grid">
                            <li ref={itemLangRef}>
                                <a className={openLang ? '--active' : ''} onClick={toggleLang}>
                                    <div className='title--lang'>
                                        {lang?.toUpperCase() || "N/A"}
                                    </div>
                                </a>

                            </li>
                            <li>
                                {
                                    isDark ?
                                        <a id="changeMode" onClick={() => changeThemeMode(false)}>
                                            <div className='icon'>
                                                <FontAwesomeIcon icon={faSun} />
                                            </div>
                                        </a>
                                        :
                                        <a id="changeMode" onClick={() => changeThemeMode(true)}>
                                            <div className='icon'>
                                                <FontAwesomeIcon icon={faMoon} />
                                            </div>
                                        </a>
                                }

                            </li>
                        </ul>
                    </div>

                </div>

            </nav>
            <div className='z-30 fixed' ref={menuFloatRef}> 
                {
                    openLang &&
                    <ul className='absolute lang gap-1 py-2 '>
                        <li>
                            <a className={`font-normal ${preference?.lang == 'en' ? '--active' : ''}`} onClick={() => selectLang('en')}>
                                EN (Enlgish)
                            </a>
                        </li>
                        <li>
                            <a className={`font-normal ${preference?.lang == 'es' ? '--active' : ''}`} onClick={() => selectLang('es')}>
                                ES (Español)
                            </a>
                        </li>
                    </ul>
                }
            </div>
            <div onClick={toggleMenu} className={`top-0 bg-opacity-50 bg-black z-10 fixed h-screen w-full lg:hidden ${openMenu?'block':'hidden'}`} >
                
            </div>
        </>
    );
}

export default NavegatorComponent;