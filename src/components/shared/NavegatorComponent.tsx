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
import { useNavegator } from '../../hooks/useNavegator';

function NavegatorComponent({ preference, translationLiteral, changeLang, changeThemeMode }: Readonly<NavegatorProps>) {
    let isDark = preference?.dark;
    let lang = preference?.lang;
    let trans = translationLiteral;

    const {
        openLang,
        openMenu,
        activeSection,
        title,
        progress,
        itemLangRef,
        menuFloatRef,
        toggleLang,
        showMenuDesktop,
        selectLang,
        toggleMenu
    } = useNavegator(changeLang, translationLiteral)


    return (
        <>
            <div className={"progress-bar top-0 fixed h-0.5 overflow-hidden z-40 w-full"}>
                <div className={"progress-bar__loading flex flex-col overflow-hidden transition duration-500 w-full h-full"} style={{width: `${progress}%`}}></div>
            </div>
            
            <nav className={`z-30 menu fixed py-2 w-screen md:hidden ${openMenu?"move-up":"move-down"}`}>
                <div className='px-5'>
                    <button className={"truncate block max-w-full" } onClick={toggleMenu}>
                        <FontAwesomeIcon icon={faBars} /> <span data-testid="title" className='ml-2'>{title}</span>
                    </button>
                </div>
            </nav>
            <nav className={`z-20 navegator fixed h-dvh max-h-vh md:h-dvh ${showMenuDesktop()}`}>
                <div className='h-full'>
                    <div className='h-full grid grids-cols-1 content-between '>
                        <ul className="px-1 md:px-3 grid">
                            <li className='text-center text-2xl md:hidden'>
                                <button onClick={toggleMenu}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                            </li>
                            <li>
                                <a href="#home" className={activeSection === 'home' ? '--active' : ''}>
                                    <div className='icon'>
                                        <FontAwesomeIcon icon={faHome} />
                                    </div>
                                    <div className='title'>
                                        {trans?.home.text??<div className="animate-pulse h-3 bg-slate-700 rounded mx-5 mt-2"></div>}
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#user" className={activeSection === 'user' ? '--active' : ''}>
                                    <div className='icon'>
                                        <FontAwesomeIcon icon={faUserNinja} />
                                    </div>
                                    <div className='title'>
                                        {trans?.user.text??<div className="animate-pulse h-3 bg-slate-700 rounded mx-5 mt-2"></div>}
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#project" className={activeSection === 'project' ? '--active' : ''}>
                                    <div className='icon'>
                                        <FontAwesomeIcon icon={faGear} />
                                    </div>
                                    <div className='title'>
                                        {trans?.project.text??<div className="animate-pulse h-3 bg-slate-700 rounded mx-5 mt-2"></div>}
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a data-testid="skills" href="#skills" className={activeSection === 'skills' ? '--active' : ''}>
                                    <div className='icon'>
                                        <FontAwesomeIcon icon={faLightbulb} />
                                    </div>
                                    <div className='title'>
                                        {trans?.skills.text??<div className="animate-pulse h-3 bg-slate-700 rounded mx-5 mt-2"></div>}
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#contact" className={activeSection === 'contact' ? '--active' : ''}>
                                    <div className='icon'>
                                        <FontAwesomeIcon icon={faPhone} />
                                    </div>
                                    <div className='title'>
                                        {trans?.contact.text??<div className="animate-pulse h-3 bg-slate-700 rounded mx-5 mt-2"></div>}
                                    </div>
                                </a>
                            </li>
                        </ul>

                        <ul className="px-1 md:mt-0 md:px-3 grid">
                            <li ref={itemLangRef}>
                                <button className={openLang ? '--active' : ''} onClick={toggleLang}>
                                    <div className='title--lang'>
                                        {lang?.toUpperCase() ??"N/A"}
                                    </div>
                                </button>

                            </li>
                            <li>
                                {
                                    isDark ?
                                        <button data-testid="changeMode" onClick={() => changeThemeMode(false)}>
                                            <div className='icon'>
                                                <FontAwesomeIcon icon={faSun} />
                                            </div>
                                        </button>
                                        :
                                        <button data-testid="changeMode" onClick={() => changeThemeMode(true)}>
                                            <div className='icon'>
                                                <FontAwesomeIcon icon={faMoon} />
                                            </div>
                                        </button>
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
                            <button className={`font-normal ${preference?.lang == 'en' ? '--active' : ''}`} onClick={() => selectLang('en')}>
                                EN (Enlgish)
                            </button>
                        </li>
                        <li>
                            <button className={`font-normal ${preference?.lang == 'es' ? '--active' : ''}`} onClick={() => selectLang('es')}>
                                ES (Español)
                            </button>
                        </li>
                    </ul>
                }
            </div>
            <div onTouchStart={toggleMenu} className={`top-0 bg-opacity-50 bg-black z-10 fixed h-screen w-full lg:hidden ${openMenu?'block':'hidden'}`} >
                
            </div>
        </>
    );
}

export default NavegatorComponent;
