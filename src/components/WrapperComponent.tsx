import { WrapperProps } from "../props"
import HomeComponent from "./HomeComponent";
import SkillsComponent from "./SkillsComponent";

function WrapperComponent({ information, translationLiteral, preference }: WrapperProps) {

  return (
    <>
      <section className="wrapper px-2 lg:px-20 lg:py-7">
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
          </>
        }
        
        {/* <div id="experience" className="px-20 py-7">
          <div className="w-full">
            <h2 className="text-center font-bold">Experiencia laboral</h2>
          </div>
          <div className="grid grid-cols-4 gap-4">
            
          <div>
            <img className="w-24 h-24 mb-3" src='./business/Santillana.png' alt="Santillana"/>
            <div>
              
            </div>
          </div>
          
          

          </div>
          
        </div> */}
        
        
      </section>
      
    </>
  )
}

export default WrapperComponent
