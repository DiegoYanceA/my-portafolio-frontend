import { UserProps } from "../props"
import Home from "./Home";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUikit
} from '@fortawesome/free-brands-svg-icons'
import {
  faDatabase,
  faGamepad,
  faCloud,
  faLaptopCode
} from '@fortawesome/free-solid-svg-icons'

function Wrapper({ user, translationLiteral }: UserProps) {

  return (
    <>
      <section className="wrapper">
        <Home 
          translationLiteral={translationLiteral}
          user = {user}
        />
        <div id="experience" className="px-20 py-7">
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
          
        </div>
        <div id="skills" className="px-20 py-7">
          <div className="w-full">
            <h2 className="font-bold">Habilidades</h2>
          </div>
          
          <div className="flex gap-4">
            <div>
              <div className="skill-card flex justify-center items-center">
                <div className="text-center">
                  <div>
                    <FontAwesomeIcon icon={faUikit} />
                  </div>
                  <h6 className="font-bold">Frontend</h6>
                </div>
              </div>
            </div>

            <div>
              <div className="skill-card flex justify-center items-center">
                <div className="text-center">
                  <div>
                    <FontAwesomeIcon icon={faLaptopCode } />
                  </div>
                  <h6 className="font-bold">Backend</h6>
                </div>
              </div>
            </div>

            <div>
              <div className="skill-card flex justify-center items-center">
                <div className="text-center">
                  <div>
                    <FontAwesomeIcon icon={faDatabase} />
                  </div>
                  <h6 className="font-bold">Base de datos</h6>
                </div>
              </div>
            </div>

            <div>
              <div className="skill-card flex justify-center items-center">
                <div className="text-center">
                  <div>
                    <FontAwesomeIcon icon={faCloud} />
                  </div>
                  <h6 className="font-bold">Computación en la Nube</h6>
                </div>
              </div>
            </div>

            <div>
              <div className="skill-card flex justify-center items-center">
                <div className="text-center">
                  <div>
                    <FontAwesomeIcon icon={faGamepad} />
                  </div>
                  <h6 className="font-bold">Videojuegos</h6>
                </div>
              </div>
            </div>
          </div>
          
        </div>
        
      </section>
      
    </>
  )
}

export default Wrapper
