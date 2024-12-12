import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faHome,
    faPhone,
    faLightbulb,
    faBuilding,
    faGear,
    faSun,
    faMoon,
    faTimes
} from '@fortawesome/free-solid-svg-icons'
import { NavegatorProps } from '../props';
import { useState } from 'react';

function Navigator({ preference, translationLiteral, changeLang, changeThemeMode }: NavegatorProps) {
    let isDark = preference?.dark;
    let lang = preference?.lang;
    let trans = translationLiteral;

    //State
    const [openLang, setOpenLang] = useState(false)

    function toggleLang() {
        setOpenLang(open => !open);
    }

    return (
        <>
            <nav className="navegator fixed py-4 h-dvh">
                <div className='flex flex-col h-full'>
                    <div className='flex-none text-center text-2xl md:hidden'>
                        <a href="#">
                            <FontAwesomeIcon icon={faTimes} />
                        </a>
                    </div>
                    <div className='flex-auto grid content-between'>
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
                        <ul className="px-1 md:px-3 relative grid gap-2">
                            <li>
                                <a className={openLang ? '--active' : ''} onClick={toggleLang}>
                                    <div className='title--lang'>
                                        {lang?.toUpperCase() || "N/A"}
                                    </div>
                                </a>
                                {
                                    openLang &&
                                    <ul className='absolute lang gap-1 py-2 '>
                                        <li>
                                            <a className={`font-normal ${preference?.lang == 'en' ? '--active' : ''}`} onClick={() => changeLang('en')}>
                                                EN (Enlgish)
                                            </a>
                                        </li>
                                        <li>
                                            <a className={`font-normal ${preference?.lang == 'es' ? '--active' : ''}`} onClick={() => changeLang('es')}>
                                                ES (Español)
                                            </a>
                                        </li>
                                    </ul>
                                }

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
        </>
    );
}

export default Navigator;