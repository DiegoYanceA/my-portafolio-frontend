import { HomeProps } from "../props"
import perfilImg from '../assets/perfil.jpg'

function HomeComponent({ user, translationLiteral }: HomeProps) {
    let trans = translationLiteral;

    return (
        <>
            <div id="home" className="h-screen">
                <div className="w-full h-full font-bold flex justify-center items-center">
                    <div className="grid gap-3 text-center">
                        <div className="block m-auto">
                            <div className="avatar">
                                {perfilImg != null ?
                                    <img className="avatar__image" src={perfilImg} alt="Perfil" /> :
                                    <div className="avatar__image animate-pulse h-full bg-slate-700 rounded"></div>
                                }

                            </div>
                        </div>
                        <h1>
                            {
                                user?.title != null ?
                                    user?.title :
                                    <div className="animate-pulse w-96 h-7 my-12 bg-slate-700 rounded"></div>
                            }
                        </h1>
                        <p>
                            {trans?.home.description}
                        </p>
                        <div className="flex justify-around w-full">
                            <a className="underline" target="_blank" href={user?.linkedin}>Linkedin</a>
                            <a className="underline" target="_blank" href={user?.github}>Github</a>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default HomeComponent
