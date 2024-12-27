import { useEffect, useRef, useState } from "react";
import { TranslationLiteral } from "../types";

export const useNavegator = (changeLang: (lang:string) => void, translationLiteral: TranslationLiteral | undefined) => {
    //State
    const [openLang, setOpenLang] = useState(false)
    const [openMenu, setOpenMenu] = useState(false)
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [title, setTitle] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);

    const itemLangRef = useRef<HTMLLIElement | null>(null);
    const menuFloatRef = useRef<HTMLDivElement | null>(null);

    function toggleLang() {
        setOpenLang(open => {
            if (!open) {
                if (itemLangRef.current != null && menuFloatRef.current != null) {
                    const rect = itemLangRef.current.getBoundingClientRect()
                    const menu = menuFloatRef.current;
                    menu.style.top = rect.y + "px"
                }
            }
            return !open;
        });
    }

    function selectLang(lang: string) {
        setOpenLang(false);
        changeLang(lang)
    }

    function toggleMenu() {
        setOpenLang(false);
        setOpenMenu(open => !open);
    }

    function showMenuDesktop() {
        document.body.classList.remove("no-scroll");
        if (window.innerWidth < 768) {
            if (openMenu) {
                document.body.classList.add("no-scroll");
                return "move-right";
            }

            return "move-left";
        }
        return "";
    }

    function showSection(item: HTMLElement, winHeight: number) {
        const rect = item.getBoundingClientRect();
        if (!item.classList.contains("visible")) {

            if (rect.top <= winHeight) {
                item.classList.add("visible")
            }
        }
    }

    useEffect(() => {
        // Crear un observer para las secciones
        const winHeight = window.innerHeight;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const target = entry.target as HTMLElement;
                        if (target.dataset.title != null) {
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
        const winHeight = window.innerHeight;
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

    return {
        openLang,
        openMenu,
        activeSection,
        title,
        progress,
        menuFloatRef,
        itemLangRef,
        toggleLang,
        showMenuDesktop,
        selectLang,
        toggleMenu
    }
}