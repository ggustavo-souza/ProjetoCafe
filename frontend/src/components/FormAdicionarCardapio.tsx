import { useState } from "react";
import AlertErro from "./AlertErro";

interface formProps {
    modalAdicionar: boolean;
    setClose: () => void;
    atualizarLista: () => void;
}

export default function FormAdicionarCardapio({ modalAdicionar, setClose, atualizarLista }: formProps) {

    const [alert, setAlert] = useState({ message: "", show: false });
    const apiUrl: string = "http://localhost:3000";

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const dados = {
            nome: formData.get("nome"),
            descricao: formData.get("descricao"),
            preco: Number(formData.get("preco")),
            categoria: formData.get("categoria"),
            imagem: formData.get("imagem"),
        }

        try {
            const response = await fetch(`${apiUrl}/cardapio`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dados)
            })
            if (response.ok) {
                atualizarLista();
                setClose();
            }
        } catch (error) {
            setAlert({ message: `Ocorreu um erro: ${error}`, show: true })
            setTimeout(() => setAlert({ message: "", show: false }), 5000)
        }
    }

    if(!modalAdicionar) return null;
    return (
        <>
            <div className="fixed inset-0 bg-gray-300 flex items-center justify-center z-50">
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                    <h1>Adicionar produto</h1>
                    <form className="" onSubmit={handleSubmit}>
                        <label htmlFor="nome">Nome do produto</label>
                        <input type="text" name="nome" id="nome" className="" />

                        <label htmlFor="nome">Insira a descrição do produto</label>
                        <input type="text" name="nome" id="nome" className="" />

                        <label htmlFor="preco">Insira o preço do produto</label>
                        <input type="text" name="preco" id="preco" className="" />

                        <label htmlFor="categoria">Escolha a categoria do produto</label>
                        <select
                            name="categoria"
                            id="categoria"
                            className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
                        >
                            <option value="bebidas">Bebidas</option>
                            <option value="comidas">Comidas</option>
                            <option value="sobremesas">Sobremesas</option>
                        </select>

                        <label className="block text-sm font-semibold text-gray-700 mb-2">Imagem Atual</label>
                        <div className="border border-gray-200 rounded-lg p-2 inline-block bg-gray-50">
                            <img
                                //src={`/images/${item.imagem}`}
                                //alt={`Preview de ${item.nome}`}
                                className="w-20 h-20 object-cover rounded-md shadow-sm"
                            />
                        </div>
                    </form>
                </div>
            </div>
            {alert.show && <AlertErro message={alert.message} />}
        </>
    )
}