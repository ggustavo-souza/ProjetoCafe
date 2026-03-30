import { useState } from "react";
import AlertErro from "./AlertErro";
import { addCardapio } from "../services/cardapioService";

interface formProps {
    modalAdicionar: boolean;
    setClose: () => void;
    atualizarLista: () => void;
}

export default function FormAdicionarCardapio({ modalAdicionar, setClose, atualizarLista }: formProps) {

    const [alert, setAlert] = useState({ message: "", show: false });
    const [previewUrl, setPreviewUrl] = useState(String);

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        try {
            const response = await addCardapio(formData);
            if (response.ok) {
                atualizarLista();
                setClose();
            }
        } catch (error) {
            setAlert({ message: `Ocorreu um erro: ${error}`, show: true })
            setTimeout(() => setAlert({ message: "", show: false }), 5000)
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreviewUrl(imageUrl);
        }
    };

    if (!modalAdicionar) return null;
    return (
        <>
            <div className="fixed inset-0 bg-gray-300 flex items-center justify-center z-50">
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-800">Adicionar Produto</h2>
                        <button onClick={setClose} className="text-gray-400 hover:text-gray-600 transition text-2xl leading-none cursor-pointer">
                            &times;
                        </button>
                    </div>
                    <form className="" onSubmit={handleSubmit}>
                        <label htmlFor="nome" className="block text-sm font-semibold text-gray-700 mb-1" >Nome do produto</label>
                        <input type="text" name="nome" id="nome" className="w-full p-2 border border-gray-300 rounded-lg mt-1 mb-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />

                        <label htmlFor="descricao" className="block text-sm font-semibold text-gray-700 mb-1">Insira a descrição do produto</label>
                        <input type="text" name="descricao" id="descricao" className="w-full p-2 border border-gray-300 rounded-lg mt-1 mb-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />

                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1">
                                <label htmlFor="preco" className="block text-sm font-semibold text-gray-700 mb-1">Preço</label>
                                <input
                                    className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                    type="text" name="preco" id="preco"
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="categoria" className="block text-sm font-semibold text-gray-700 mb-1">Categoria</label>
                                <select
                                    name="categoria" id="categoria"
                                    className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
                                >
                                    <option value="bebidas">Bebidas</option>
                                    <option value="comidas">Comidas</option>
                                    <option value="sobremesas">Sobremesas</option>
                                </select>
                            </div>
                        </div>
                        <label htmlFor="imagem" className="block text-sm font-semibold text-gray-700 mb-1">Imagem</label>
                        <input
                            type="file"
                            formEncType="multipart/form-data"
                            name="imagem"
                            id="imagem"
                            onChange={handleImageChange}
                            className="w-full p-2 border border-gray-300 cursor-pointer rounded-lg mt-1 mb-3 outline-none hover:ring-2 hover:ring-blue-500 hover:border-blue-500"
                        />

                        <label className="block text-sm font-semibold text-gray-700 mb-2">Imagem Atual</label>
                        <div className="border border-gray-200 rounded-lg p-2 inline-block bg-gray-50">
                            <img
                                src={previewUrl}
                                alt={"Preview da imagem"}
                                className="w-20 h-20 object-cover rounded-md shadow-sm"
                            />
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
            {alert.show && <AlertErro message={alert.message} />}
        </>
    )
}