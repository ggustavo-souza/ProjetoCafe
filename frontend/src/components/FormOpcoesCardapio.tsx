import React, { useEffect, useState } from "react"
import AlertErro from "./AlertErro"

interface formProps {
    modalOpcoes: boolean,
    modalType: "editar" | "excluir",
    idItem: number,
    setClose: () => void;
    atualizarLista: () => void;
}

interface Item {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    categoria: string;
    imagem: string;
}

export default function FormOpcoesCardapio({ modalOpcoes, modalType, idItem, setClose, atualizarLista }: formProps) {

    const [alert, setAlert] = useState({ message: "", show: false });
    const apiUrl: string = "http://localhost:3000";

    const [item, setItem] = useState<Item | null>(null);

    useEffect(() => {
        if (!idItem || modalType !== 'editar') return;

        const carregarItem = async () => {
            setItem(null);
            try {
                const response = await fetch(`${apiUrl}/cardapio/${idItem}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const data = await response.json();
                setItem(data);
            } catch (error) {
                console.log(error);
            }
        }
        carregarItem();
    }, [idItem, modalType]);

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const dadosAtualizados = {
            nome: formData.get("nome"),
            descricao: formData.get("descricao"),
            preco: Number(formData.get("preco")),
            categoria: formData.get("categoria"),
            imagem: item?.imagem // Se ainda não fez o upload, mantemos a antiga
        };

        try {
            if (modalType === 'editar') {
                const response = await fetch(`${apiUrl}/cardapio/${idItem}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(dadosAtualizados),
                })
                if (response.ok) {
                    atualizarLista();
                    setClose();
                }
            }
        } catch (error) {
            console.log("Erro ao editar formulário!", error);
            setAlert({ message: "Ocorreu um erro ao editar o item...", show: true });
            setTimeout(() => setAlert({ message: "", show: false }), 5000);
        }
    }

    if (!modalOpcoes) return null;
    if (modalType === 'editar' && !item) {
        return (
            <div className="fixed inset-0 bg-gray-300/50 flex items-center justify-center">
                <div className="bg-white p-5 rounded-lg">Carregando dados do produto...</div>
            </div>
        );
    }
    return (
        <>
            {modalType === 'editar' && item && (
                <div className="fixed inset-0 bg-gray-300 flex items-center justify-center z-50">
                    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-800">Editar Produto</h2>
                            <button onClick={setClose} className="text-gray-400 hover:text-gray-600 transition text-2xl leading-none cursor-pointer">
                                &times;
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4" key={item.id}>

                            <div>
                                <label htmlFor="id" className="block text-sm font-semibold text-gray-700 mb-1">ID</label>
                                <input
                                    className="w-full border border-gray-300 bg-gray-100 text-gray-500 p-2.5 rounded-lg cursor-not-allowed focus:outline-none"
                                    type="text" name="id" id="id" value={item.id} readOnly
                                />
                            </div>

                            <div>
                                <label htmlFor="nome" className="block text-sm font-semibold text-gray-700 mb-1">Título do Produto</label>
                                <input
                                    className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                    type="text" name="nome" id="nome" defaultValue={item.nome}
                                />
                            </div>

                            <div>
                                <label htmlFor="descricao" className="block text-sm font-semibold text-gray-700 mb-1">Descrição</label>
                                <input
                                    className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
                                    type="text" name="descricao" id="descricao" defaultValue={item.descricao}
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-1">
                                    <label htmlFor="preco" className="block text-sm font-semibold text-gray-700 mb-1">Preço</label>
                                    <input
                                        className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                        type="text" name="preco" id="preco" defaultValue={item.preco}
                                    />
                                </div>
                                <div className="flex-1">
                                    <label htmlFor="categoria" className="block text-sm font-semibold text-gray-700 mb-1">Categoria</label>
                                    <select
                                        name="categoria" id="categoria" defaultValue={item.categoria}
                                        className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
                                    >
                                        <option value="bebidas">Bebidas</option>
                                        <option value="comidas">Comidas</option>
                                        <option value="sobremesas">Sobremesas</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Imagem Atual</label>
                                <div className="border border-gray-200 rounded-lg p-2 inline-block bg-gray-50">
                                    <img
                                        src={`/images/${item.imagem}`}
                                        alt={`Preview de ${item.nome}`}
                                        className="w-20 h-20 object-cover rounded-md shadow-sm"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={setClose}
                                    className="cursor-pointer px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-200 transition"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="cursor-pointer px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition"
                                >
                                    Salvar Alterações
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            )}

            {modalType === 'excluir' && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-white p-10 rounded-xl">
                        <p>Deseja realmente excluir o item #{idItem}?</p>
                        <button className="bg-red-500 text-white p-2 mt-5 me-2 rounded-lg cursor-pointer hover:bg-red-600">Sim, excluir</button>
                        <button onClick={setClose} className="p-2 border rounded-lg cursor-pointer hover:bg-blue-50">Cancelar</button>
                    </div>
                </div>
            )}

            {alert.show && <AlertErro message={alert.message} />}
        </>
    )
}