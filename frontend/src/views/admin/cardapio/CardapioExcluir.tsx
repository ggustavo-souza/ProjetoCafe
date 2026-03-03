import { useNavigate } from "react-router-dom";

export default function CardapioExcluir() {

    const navigate = useNavigate();
    return (
        <>
            <header className="relative flex flex-1 flex-col items-center justify-center text-black p-4 text-2xl font-bold mt-5">
                <button
                    onClick={() => navigate(-1)}
                    className="md:absolute left-4 bg-gray-500 p-3 sm:mb-2 hover:bg-gray-600 cursor-pointer text-white text-sm font-normal rounded-md"
                >
                    Voltar
                </button>
                <p>Excluir Item do Cardápio</p>
            </header>
        </>
    )
}