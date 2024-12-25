import { useEffect } from "react";
import { WrapperProps } from "../../props"
import ContactComponent from "./components/contact/ContactComponent";
import HomeComponent from "./components/home/HomeComponent";
import SkillsComponent from "./components/skills/SkillsComponent";
import UserComponent from "./components/user/UserComponent";
import ProjectsComponent from "./components/projects/ProjectsComponent";

function HomePage({ information, translationLiteral, preference }: WrapperProps) {
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const hash = window.location.hash; 
    if(hash != null){
      const cleanHash = window.location.hash.slice(1);
      const element = document.getElementById(cleanHash);
      if(element != null){
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      
    }
  }, [])
  return (
    <>
      <section className="wrapper px-4 lg:px-20">
        {
          information != null &&
          <>
            <HomeComponent 
              trans={translationLiteral.home}
              user = {information.user}
            />

            <UserComponent
              trans={translationLiteral.user}
            >
            </UserComponent>

            <ProjectsComponent
              trans={translationLiteral.project}
              projects={information.projects}
            ></ProjectsComponent>

            <SkillsComponent
              trans={translationLiteral.skills}
              skills = {information.skills}
              isDark = {preference?.dark}
            />

            <ContactComponent
              user = {information.user}
              trans={translationLiteral.contact}
            />
          </>
        }
        
        
      </section>
      <footer>
        <div className="px-5 lg:px-20 pt-2 lg:pt-5 pb-8 lg:pb-14">
          <div className="line"></div>
          <p className="text-sm lg:text-base px-4 lg:px-0">
            © {currentYear} {information.user.title}. {translationLiteral.footer.text}
          </p>
        </div>
      </footer>
      
    </>
  )
}

export default HomePage
