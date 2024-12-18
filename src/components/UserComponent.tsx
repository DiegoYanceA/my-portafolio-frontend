import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserProps } from '../props';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';

function UserComponent({ translationLiteral }: UserProps) {
    const trans = translationLiteral.user;

    const goTo = (url: string) => {
        window.open(url, "_blank");
    }
    
    return (
        <>
            <div id="user" className='user section h-screen' data-title={trans?.text}>
                <div className='flex w-full h-full justify-center items-center section-scroll'>
                    <div className='grid grid-cols-1 gap-y-4'>
                        <h2 className='text-center font-bold scroll-text'>{trans.text}</h2>
                        
                        <p className='text-sm lg:text-lg scroll-text' dangerouslySetInnerHTML={{ __html: trans.description }}></p>
                        <div className='mt-4 flex flex-col lg:flex-row justify-center items-center gap-y-5 lg:gap-x-20 flex-wrap lg:flex-nowrap'>
                            <button onClick={() => {goTo("./pdf/hackathon-diego.pdf")}} className='btn growShrink'>
                                <span className='text-base'>{trans.hackaton} &nbsp;</span> 
                                <FontAwesomeIcon className='text-base' icon={faFilePdf}></FontAwesomeIcon>
                            </button>
                            <button onClick={() => {goTo("./pdf/bachiller-diego.pdf")}} className='btn growShrink'>
                                <span className='text-base'>{trans.bachelor} &nbsp;</span> 
                                <FontAwesomeIcon className='text-base' icon={faFilePdf}></FontAwesomeIcon>
                            </button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    );
}

export default UserComponent;