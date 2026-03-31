import FormOpcoesCardapio from "./FormOpcoesCardapio";
import FormAdicionarCardapio from "./FormAdicionarCardapio"
import { useEffect, useState, useCallback } from "react"
import { useNavigate } from "react-router-dom";
import LoadingCircle from "./Loading";
import DropFiltro from "./DropdownFiltro";
import { getCardapio } from "../services/cardapioService";
import PedidoAtual from "./PedidoAtual";
import ModalMesa from "./ModalMesa";

interface Produto {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    categoria: string;
    imagem: string;
}

interface Usuario {
    type: "administrador" | "usuario";
}

export default function Cardapio({ type }: Usuario) {
    const apiUrl: string = "http://localhost:3000";
    const [loading, setLoading] = useState(false);
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const imagesUrl: string = `${apiUrl}/public/`
    const [filtro, setFiltro] = useState("");
    const navigate = useNavigate();
    const [modalOpcoes, setModalOpcoes] = useState(false);
    const [modalMesa, setModalMesa] = useState(true);
    const [modalAdicionar, setModalAdicionar] = useState(false);
    const [modalType, setModalType] = useState<"editar" | "excluir">("editar");
    const [idItem, setIdItem] = useState(0);

    const abrirModalOpcoes = (type: "editar" | "excluir", idItem: number) => {
        setModalType(type);
        setModalOpcoes(true);
        setIdItem(idItem);
    }

    const abrirModalAdicionar = () => {
        setModalAdicionar(true);
    }

    const carregarCardapio = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getCardapio();
            setProdutos(data);
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error("Erro ao carregar cardápio:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        carregarCardapio();
    }, [carregarCardapio]);

    const produtosFiltrados = filtro
        ? produtos.filter(produto => produto.categoria === filtro)
        : produtos;


    return (
        // retornar a interface do cardápio de acordo com o cargo do usuário que está usando.
        <>
        {type === "usuario" && <ModalMesa isOpen={modalMesa} setClose={() => setModalMesa(false)} />}
            <header className="flex flex-col items-center mx-auto max-w-7xl w-full text-black p-4 mt-5">
                <div className="relative flex w-full max-w-xl items-center justify-center ">
                    {type === "administrador" && (
                        <button
                            onClick={() => navigate(-1)}
                            className="absolute left-0 flex items-center bg-blue-500 hover:bg-blue-600 p-2 px-4 cursor-pointer text-white text-sm font-normal rounded-md transition-colors"
                        >
                            <i className="bi bi-arrow-bar-left me-2"></i>Voltar
                        </button>
                    )}
                    <p className="text-2xl font-bold text-center">
                        {type === "administrador" ? "Editar cardápio" : "Cardápio"}
                    </p>
                </div>
            </header>
            <DropFiltro
                filtroSelecionado={filtro}
                setFiltroSelecionado={setFiltro}
            />
            <main className="mb-7 flex flex-col items-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 gap-6 justify-items-center mx-auto max-w-7xl px-10 w-full">
                    {loading && <LoadingCircle />}
                    {produtosFiltrados.length === 0 && (
                        <div className="col-span-full flex flex-col items-center justify-center">
                            <i className="bi bi-emoji-frown text-6xl text-gray-400"></i>
                            <p className="text-gray-600 text-lg col-span-full text-center mt-5">Nenhum produto encontrado para a categoria selecionada.</p>
                        </div>
                    )}

                    {produtosFiltrados.map((produto: Produto) => (
                        <div key={produto.id} className="shadow-xl w-full max-w-sm rounded-xl transition-all duration-400 hover:scale-105 overflow-hidden flex flex-col items-center text-center">
                            <img
                                className="w-full h-48 object-cover"
                                src={`${imagesUrl}${produto.imagem}`}
                                alt="Foto do produto"
                            />

                            <div className="p-10 grow flex flex-col items-start justify-center w-full">
                                <p className="font-bold text-xl">{produto.id} - {produto.nome}</p>
                                <p className="text-lg text-gray-600">{produto.categoria}</p>
                                <p className="mt-2">{produto.descricao}</p>
                                <p className="font-semibold text-xl text-green-600 mt-3">R${produto.preco}</p>

                                {type === "administrador" && (
                                    <>
                                        <button
                                            className="cursor-pointer hover:bg-blue-600 p-3 bg-blue-500 rounded-md mt-4 w-full text-white flex justify-center items-center"
                                            onClick={() => abrirModalOpcoes("editar", produto.id)}
                                        >
                                            <i className="bi bi-pencil me-3"></i>Editar Item
                                        </button>

                                        <button
                                            className="cursor-pointer transition hover:bg-blue-500 hover:text-white p-3 border-2 border-blue-500 rounded-md mt-4 w-full text-blue-500 flex justify-center items-center"
                                            onClick={() => abrirModalOpcoes("excluir", produto.id)}
                                        >
                                            <i className="bi bi-trash me-3"></i>Excluir Item
                                        </button>
                                    </>
                                )}
                                {type === "usuario" && (
                                    <button
                                        className="cursor-pointer hover:bg-blue-600 p-3 bg-blue-500 rounded-md mt-4 w-full text-white flex justify-center items-center"
                                        onClick={() => alert("Item adicionado ao pedido!")}
                                    >
                                        <i className="bi bi-plus me-3"></i>Pedir Item
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}

                    {type === "administrador" && (
                        <div
                            className="hover:bg-blue-500 transition hover:text-white cursor-pointer shadow-xl w-full max-w-sm rounded-xl overflow-hidden border-2 border-blue-500 text-blue-500 text-center flex flex-col justify-center items-center min-h-100"
                            onClick={() => abrirModalAdicionar()}
                        >
                            <i className="bi bi-plus text-4xl"></i>
                            <p className="font-bold text-xl">Adicionar Item</p>
                        </div>
                    )}
                </div>
            </main>
            <PedidoAtual 
                mesa={localStorage.getItem("mesa")} />
            <FormOpcoesCardapio
                modalOpcoes={modalOpcoes}
                modalType={modalType}
                idItem={idItem}
                setClose={() => setModalOpcoes(false)}
                atualizarLista={carregarCardapio}
            />
            <FormAdicionarCardapio
                modalAdicionar={modalAdicionar}
                setClose={() => setModalAdicionar(false)}
                atualizarLista={carregarCardapio}
            />
        </>
    )
}