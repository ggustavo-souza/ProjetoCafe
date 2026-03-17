import FormOpcoesCardapio from "../../components/FormOpcoesCardapio";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";


export default function CardapioEditar() {
    const apiUrl: string = "http://localhost:3000";
    const [produtos, setProdutos] = useState([]);
    const imagesUrl: string = "/images/"
    const navigate = useNavigate();
    const [modalOpcoes, setModalOpcoes] = useState(false);
    const [modalType, setModalType] = useState<"editar" | "excluir">("editar");
    const [idItem, setIdItem] = useState(0);

    const abrirModal = (type: "editar" | "excluir", idItem: number) => {
        setModalType(type);
        setModalOpcoes(true);
        setIdItem(idItem);
    }

    interface Produto {
        id: number;
        nome: string;
        descricao: string;
        preco: number;
        imagem: string;
    }

    useEffect(() => {
        const carregarCardapio = async () => {
            try {
                const response = await fetch(`${apiUrl}/cardapio`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                const data = await response.json();

                console.log("Informações recebidas:", data);
                setProdutos(data);

            } catch (error) {
                console.error("Ocorreu um erro ao tentar conseguir os dados!:", error);
            }
        };
        carregarCardapio();
    }, []);

    return (
        <>
            <header className="relative flex flex-1 flex-col items-center justify-center text-black p-4 text-2xl font-bold mt-5">
                <button
                    onClick={() => navigate(-1)}
                    className="md:absolute left-4 sm:ms-0 md:ms-6 lg:ms-6 bg-blue-500 p-3 sm:mb-2 hover:bg-blue-600 cursor-pointer text-white text-sm font-normal rounded-md"
                >
                    <i className="bi bi-arrow-bar-left me-2"></i>Voltar
                </button>
                <p className="mt-3 sm:mt-0 md:mt-0 lg:mt-0 xl:mt-0 ">Editar cardápio</p>
            </header>
            <main>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 gap-6 justify-items-center mx-auto max-w-7xl px-10">
                    {produtos.map((produto: Produto) => (
                        <div key={produto.id} className="shadow-xl w-full max-w-sm rounded-xl overflow-hidden flex flex-col">
                            <img
                                className="w-full h-48 object-cover"
                                src={`${imagesUrl}${produto.imagem}`}
                                alt="Foto do produto"
                            />
                            <div className="p-10 grow">
                                <p className="font-bold text-xl">{produto.id} - {produto.nome}</p>
                                <p className="mt-2">{produto.descricao}</p>
                                <p className="font-semibold text-xl text-green-600 mt-3">R${produto.preco}</p>
                                <button
                                    className="cursor-pointer hover:bg-blue-600 p-3 bg-blue-500 rounded-md mt-4 w-full text-white"
                                    onClick={() => abrirModal("editar", produto.id)}
                                >
                                    <i className="bi bi-pencil me-3"></i>Editar Item
                                </button>
                                <button
                                    className="cursor-pointer hover:bg-blue-500 hover:text-white p-3 border-2 border-blue-500 rounded-md mt-4 w-full text-blue-500"
                                    onClick={() => abrirModal("excluir", produto.id)}
                                >
                                    <i className="bi bi-trash me-3"></i>Excluir Item
                                </button>
                            </div>
                        </div>
                    ))}

                    <div className="hover:bg-blue-500 hover:text-white cursor-pointer shadow-xl w-full max-w-sm rounded-xl overflow-hidden border-2 border-blue-500 text-blue-500 text-center flex flex-col justify-center items-center min-h-100">
                        <i className="bi bi-plus text-4xl"></i>
                        <p className="font-bold text-xl">Adicionar Item</p>
                    </div>
                </div>
            </main>
            <FormOpcoesCardapio
                modalOpcoes={modalOpcoes}
                modalType={modalType}
                idItem={idItem}
                setClose={() => setModalOpcoes(false)}
            />
        </>
    )
}