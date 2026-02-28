import OpcoesCardapioAdmin from "../../components/OpcoesCardapioAdmin";
import { useNavigate } from "react-router-dom";

export default function CardapioAdmin() {

    const navigate = useNavigate();
    return (
        <>
            <header className="text-black p-4 text-2xl font-bold text-center mt-7">
                <p>Editar Cardápio</p>
            </header>
            <main className="flex flex-col items-center justify-center">
                <OpcoesCardapioAdmin />
                <button 
                    className="bg-red-500 text-white p-3 rounded mt-8 cursor-pointer hover:bg-red-600 transition-colors duration-300"
                    onClick={() => navigate(-1)}>
                        <i className="bi bi-arrow-left me-2">
                    </i>Voltar
                </button>
            </main>
        </>
    )
}