import { faEnvelope, faCopy, faTimes } from "@fortawesome/free-solid-svg-icons"
import { ContactProps } from "../props"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { OptionsObject, SnackbarKey, useSnackbar } from "notistack"
import sideImg from '../assets/side.jpg'

function ContactComponent({ user, translationLiteral }: ContactProps) {

  const action = (snackbarId: SnackbarKey) => (
    <>
      <button className="focus:outline-none" onClick={() => { closeSnackbar(snackbarId) }}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </>
  );

  const options: OptionsObject = {
    style: {
      color: 'white',
      textAlign: 'center'
    },
    anchorOrigin: {
      horizontal: "center",
      vertical: "bottom"
    },
    autoHideDuration: 1500,
    variant: 'success',
    action: action
  }

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        enqueueSnackbar('Copiado!', options)
      })
      .catch(err => {
        console.error("Error al copiar el texto: ", err);
      });
  }

  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  return (
    <>
      <div id="contact" className="contact h-screen">
        <div className="h-full w-full grid grid-cols-1 lg:grid-cols-2 py-40 lg:py-10 px-4 lg:px-32">
          <div className="hidden lg:block">
            {sideImg != null ?
              <img className="contact__img rounded-l-lg h-full w-full" src={sideImg} alt="Side" /> : ""
            }
          </div>
          <div className="contact__information rounded-r-lg ">
            <div className="grid grid-cols-1 content-center h-full gap-y-5">
              <div>
                <h2 className="font-bold text-center">{translationLiteral.contact?.text}</h2>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-1 text-center lg:gap-y-4">
                <div className="grid grid-cols-1 gap-y-5 lg:gap-y-0 lg:gap-x-5 lg:flex justify-center">
                  <a href={`mailto:${user.email}`} className="text-5xl lg:text-base">
                    <FontAwesomeIcon icon={faEnvelope} /> 
                    <span className="hidden lg:block"> {user.email}</span>
                  </a>
                  <button className="focus:outline-none p-0 text-2xl lg:text-base" onClick={() => copyText(user.email)}>
                    <FontAwesomeIcon icon={faCopy} />
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-y-5 lg:gap-y-0 lg:gap-x-5 lg:flex justify-center">
                  <a href={user.linkedin} target="_blank" className="text-5xl lg:text-base">
                    <FontAwesomeIcon icon={faLinkedin} /> 
                    <span className="hidden lg:block"> {user.linkedin}</span>
                    
                  </a>
                  <button className="focus:outline-none p-0 text-2xl lg:text-base" onClick={() => copyText(user.linkedin)}>
                    <FontAwesomeIcon icon={faCopy} />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>





      </div>
    </>
  )
}

export default ContactComponent
