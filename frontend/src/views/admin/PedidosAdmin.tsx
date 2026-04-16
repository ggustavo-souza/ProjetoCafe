import { useNavigate } from "react-router-dom";
import MostrarPedidos from "../../components/MostrarPedidos";

export default function PedidosAdmin() {

    const navigate = useNavigate();
    return (
        <>
            <header className="flex flex-col items-center mx-auto max-w-7xl w-full text-black p-4 mt-5">
                <div className="relative flex w-full max-w-xl items-center justify-center ">
                    <button
                        onClick={() => navigate(-1)}
                        className="absolute left-0 flex items-center bg-blue-500 hover:bg-blue-600 p-2 px-4 cursor-pointer text-white text-sm font-normal rounded-md transition-colors"
                    >
                        <i className="bi bi-arrow-bar-left me-2"></i>Voltar
                    </button>
                    <p className="text-2xl font-bold text-center">
                        Pedidos
                    </p>
                </div>
            </header>
            <main>
                <MostrarPedidos />
            </main>
        </>
    );
}   