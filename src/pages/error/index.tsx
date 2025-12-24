import { Link } from "react-router"

export function ErrorPage(){
    return(
        <main className="w-full h-screen flex flex-col items-center justify-center bg-violet-400">
            <h1 className="text-9xl mt-10 font-bold italic text-white">
                404!
            </h1>

            <h4 className="mt-4 text-2xl font-bold text-white italic">
                Página não existe
            </h4>

            <Link 
                className="mt-4 px-6 py-2 rounded font-bold bg-white"
                to="/"
            >
                Voltar para inicio
            </Link>
        </main>
    )
}