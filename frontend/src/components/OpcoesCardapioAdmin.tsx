import { useNavigate } from "react-router-dom"

export default function OpcoesCardapioAdmin() {

    const navigate = useNavigate()
    return (
        <main>
            <div className="flex flex-1 items-center justify-center gap-3 mt-10">
                <button
                    className="flex flex-col cursor-pointer w-60 bg-blue-500 text-white p-10 rounded hover:bg-blue-600 transition-colors"
                    onClick={() => navigate('/admin/cardapio/adicionar')}>
                    Adicionar Item <i className="bi bi-plus-circle"></i>
                </button>
                <button
                    className="flex flex-col cursor-pointer w-60 bg-blue-500 text-white p-10 rounded hover:bg-blue-600 transition-colors"
                    onClick={() => navigate('/admin/cardapio/editar')}>
                    Editar Item <i className="bi bi-pencil"></i>
                </button>
                <button className="flex flex-col cursor-pointer w-60 bg-blue-500 text-white p-10 rounded hover:bg-blue-600 transition-colors "
                    onClick={() => navigate('/admin/cardapio/excluir')}>
                    Remover Item <i className="bi bi-trash"></i>
                </button>
            </div>
        </main>
    )
}