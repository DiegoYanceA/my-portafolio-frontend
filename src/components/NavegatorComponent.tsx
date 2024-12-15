import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faHome,
    faPhone,
    faLightbulb,
    faBuilding,
    faGear,
    faSun,
    faMoon,
    faTimes,
    faBars
} from '@fortawesome/free-solid-svg-icons'
import { NavegatorProps } from '../props';
import { useRef, useState } from 'react';

function NavegatorComponent({ preference, translationLiteral, changeLang, changeThemeMode }: NavegatorProps) {
    let isDark = preference?.dark;
    let lang = preference?.lang;
    let trans = translationLiteral;

    //State
    const [openLang, setOpenLang] = useState(false)
    const [openMenu, setOpenMenu] = useState(false)

    const itemLangRef = useRef<HTMLLIElement  | null>(null);
    const menuFloatRef = useRef<HTMLDivElement  | null>(null);

    const toggleLang = () => {
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

    const selectLang = (lang: string) => {
        setOpenLang(false);
        changeLang(lang)
    }

    const toggleMenu = () => {
        setOpenLang(false);
        setOpenMenu(open => !open);
    }

    let showMenuDesktop = () => {
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

    return (
        <>
            <nav className={`z-30 menu fixed py-2 w-screen md:hidden ${openMenu?"move-up":"move-down"}`}>
                <div>
                    <a className={"ml-5"} onClick={toggleMenu}>
                        <FontAwesomeIcon icon={faBars} />
                    </a>
                </div>
            </nav>
            <nav className={`z-20 navegator fixed max-h-dvh  md:h-dvh ${showMenuDesktop()}`}>
                <div className='flex flex-col h-full pt-4 pb-10 md:py-4'>
                    <div className='flex-none text-center text-2xl md:hidden mb-3'>
                        <a onClick={toggleMenu}>
                            <FontAwesomeIcon icon={faTimes} />
                        </a>
                    </div>
                    <div className='flex-auto grid content-between '>
                        <ul className="px-1 md:px-3 grid gap-5">

                            <li>
                                <a href="#home">
                                    <div className='icon'>
                                        <FontAwesomeIcon icon={faHome} />
                                    </div>
                                    <div className='title'>
                                        {trans?.home.text || <div className="animate-pulse h-3 bg-slate-700 rounded mx-5 mt-2"></div>}
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#experience">
                                    <div className='icon'>
                                        <FontAwesomeIcon icon={faBuilding} />
                                    </div>
                                    <div className='title'>
                                        {trans?.experience.text || <div className="animate-pulse h-3 bg-slate-700 rounded mx-5 mt-2"></div>}
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#project">
                                    <div className='icon'>
                                        <FontAwesomeIcon icon={faGear} />
                                    </div>
                                    <div className='title'>
                                        {trans?.project.text || <div className="animate-pulse h-3 bg-slate-700 rounded mx-5 mt-2"></div>}
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#skills">
                                    <div className='icon'>
                                        <FontAwesomeIcon icon={faLightbulb} />
                                    </div>
                                    <div className='title'>
                                        {trans?.skill.text || <div className="animate-pulse h-3 bg-slate-700 rounded mx-5 mt-2"></div>}
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#contact">
                                    <div className='icon'>
                                        <FontAwesomeIcon icon={faPhone} />
                                    </div>
                                    <div className='title'>
                                        {trans?.contact.text || <div className="animate-pulse h-3 bg-slate-700 rounded mx-5 mt-2"></div>}
                                    </div>
                                </a>
                            </li>
                        </ul>

                        <ul className="px-1 mt-10 md:mt-0 md:px-3 grid gap-2">
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
                                        <a onClick={() => changeThemeMode(false)}>
                                            <div className='icon'>
                                                <FontAwesomeIcon icon={faSun} />
                                            </div>
                                        </a>
                                        :
                                        <a onClick={() => changeThemeMode(true)}>
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
            <div onClick={toggleMenu} className={`bg-opacity-50 bg-black z-10 fixed h-screen w-full lg:hidden ${openMenu?'block':'hidden'}`} >
                
            </div>
        </>
    );
}

export default NavegatorComponent;