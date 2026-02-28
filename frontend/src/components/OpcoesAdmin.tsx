import { useNavigate } from "react-router-dom"

export default function OpcoesAdmin() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-1 mt-6 flex-col items-center justify-center gap-6">
            <div 
            className="text-xl border w-1/4 m-auto text-white mt-4 rounded-lg shadow-md cursor-pointer bg-blue-600 hover:bg-blue-700 text-center xl:p-12 md:p-14 lg:p-12 p-20 flex flex-col items-center justify-center"
            onClick={() => navigate("/admin/cardapio")}
            >
                <p>Configurar Cardápio</p>
                <i className="bi bi-clipboard2-plus text-3xl mt-2"></i>
            </div>
            <div
            className="text-xl border w-1/4 m-auto text-white mt-4 rounded-lg shadow-md cursor-pointer bg-blue-600 hover:bg-blue-700 text-center xl:p-12 md:p-14 lg:p-12 p-20 flex flex-col items-center justify-center"
            onClick={() => navigate("/admin/pedidos")}
            >
                <p>Monitorar Pedidos</p>
                <i className="bi bi-list-check text-3xl mt-2"></i>
            </div>
        </div>
    )
}