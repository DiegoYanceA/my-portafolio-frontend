import { faEnvelope, faCopy, faTimes } from "@fortawesome/free-solid-svg-icons"
import { ContactProps } from "../props"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { OptionsObject, SnackbarKey, useSnackbar } from "notistack"
import sideImg from '../assets/side.jpg'

function ContactComponent({ user, trans }: ContactProps) {

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
        enqueueSnackbar(trans.snackbard.copy, options)
      })
      .catch(err => {
        console.error("Error al copiar el texto: ", err);
      });
  }

  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  return (
    <>
      <div id="contact" className="section contact h-screen-fix lg:h-screen justify-center flex" data-title={trans?.text}>
        <div className="section-scroll contact__container h-full w-full grid grid-cols-1 lg:grid-cols-12 py-14 lg:py-10 px-4 lg:px-32">
          <div className="hidden lg:block lg:col-span-5">
            {sideImg != null ?
              <img className="contact__img rounded-l-lg h-full w-full" src={sideImg} alt="Side" /> : ""
            }
          </div>
          <div className="contact__information rounded-r-lg lg:col-span-7 p-3 lg:p-0">
            <div className="grid grid-cols-1 content-center h-full gap-y-5">
              <div>
                <h2 className="font-bold text-center">{trans?.text}</h2>
              </div>
              <div className="grid grid-cols-1 gap-y-6 items-center lg:grid-cols-1 text-center lg:gap-y-4 text-1xl">
                <div className="flex flex-row flex-wrap gap-x-3 lg:gap-y-0 lg:gap-x-5 justify-center">
                  <a href={`mailto:${user.email}`}>
                    <FontAwesomeIcon icon={faEnvelope} /> 
                    <span className=" block"> {user.email}</span>
                  </a>
                  <button className="focus:outline-none p-0 lg:text-base" onClick={() => copyText(user.email)}>
                    <FontAwesomeIcon icon={faCopy} />
                  </button>
                </div>
                <div className="flex flex-row flex-wrap gap-x-3 lg:gap-y-0 lg:gap-x-5 justify-center">
                  <a href={user.linkedin} target="_blank">
                    <FontAwesomeIcon icon={faLinkedin} /> 
                    <span className="truncate w-64 lg:w-full block"> {user.linkedin}</span>
                    
                  </a>
                  <button className="focus:outline-none p-0" onClick={() => copyText(user.linkedin)}>
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
