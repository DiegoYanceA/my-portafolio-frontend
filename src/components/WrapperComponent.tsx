import { WrapperProps } from "../props"
import ContactComponent from "./ContactComponent";
import HomeComponent from "./HomeComponent";
import SkillsComponent from "./SkillsComponent";

function WrapperComponent({ information, translationLiteral, preference }: WrapperProps) {

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
            />
          </>
        }
        
        
      </section>
      
    </>
  )
}

export default WrapperComponent
