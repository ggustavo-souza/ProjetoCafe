import React, { useEffect, useState } from "react"
import AlertErro from "./AlertErro"

interface formProps {
    modalOpcoes: boolean,
    modalType: "editar" | "excluir",
    idItem: number,
    setClose: () => void;
}

export default function FormOpcoesCardapio({ modalOpcoes, modalType, idItem, setClose }: formProps) {

    const [alert, setAlert] = useState({ message: "", show: false });
    const apiUrl: string = "http://localhost:3000";

    interface Item {
        id: number;
        nome: string;
        descricao: string;
        preco: number;
        categoria: string;
        imagem: string;
    }

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
                if(response.ok) {
                    setClose();
                    window.location.reload();
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
                    <div className="bg-white p-10 rounded-lg shadow-lg">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-3" key={item.id}>
                            <label htmlFor="id">ID</label>
                            <input className="border p-2" type="text" name="id" id="id" value={item.id} readOnly></input>

                            <label htmlFor="nome">Título do Produto</label>
                            <input className="border p-2" type="text" name="nome" id="nome" defaultValue={item.nome} />

                            <label htmlFor="descricao">Descrição</label>
                            <input className="border p-2" type="text" name="descricao" id="descricao" defaultValue={item.descricao} />

                            <label htmlFor="preco">Preço</label>
                            <input className="border p-2" type="number" step="0.01" name="preco" id="preco" defaultValue={item.preco} />

                            <label htmlFor="categoria">Categoria</label>
                            <select name="categoria" id="categoria" defaultValue={item.categoria} className="border p-2">
                                <option value="bebidas">Bebidas</option>
                                <option value="comidas">Comidas</option>
                                <option value="sobremesas">Sobremesas</option>
                            </select>

                            <label>Imagem Atual</label>
                            <img src={`/images/${item.imagem}`} alt="Preview" className="w-20 h-20 object-cover" />

                            <button type="submit" className="bg-green-600 text-white p-2 rounded mt-4">Salvar Alterações</button>
                        </form>
                        <button onClick={setClose} className="mt-4 text-red-500 underline">Cancelar</button>
                    </div>
                </div>
            )}

            {modalType === 'excluir' && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-white p-10 rounded-lg">
                        <p>Deseja realmente excluir o item #{idItem}?</p>
                        <button className="bg-red-500 text-white p-2 m-2">Sim, excluir</button>
                        <button onClick={setClose} className="p-2 border">Cancelar</button>
                    </div>
                </div>
            )}

            {alert.show && <AlertErro message={alert.message} />}
        </>
    )
}