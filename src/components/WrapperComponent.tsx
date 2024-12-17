import { useEffect } from "react";
import { WrapperProps } from "../props"
import ContactComponent from "./ContactComponent";
import HomeComponent from "./HomeComponent";
import SkillsComponent from "./SkillsComponent";

function WrapperComponent({ information, translationLiteral, preference }: WrapperProps) {
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
      <section className="wrapper px-2 lg:px-20">
        {
          information != null &&
          <>
            <HomeComponent 
              translationLiteral={translationLiteral}
              user = {information.user}
            />

            <SkillsComponent
              translationLiteral={translationLiteral}
              skills = {information.skills}
              isDark = {preference?.dark}
            />

            <ContactComponent
              user = {information.user}
              translationLiteral={translationLiteral}
            />
          </>
        }
        
        
      </section>
      
    </>
  )
}

export default WrapperComponent
