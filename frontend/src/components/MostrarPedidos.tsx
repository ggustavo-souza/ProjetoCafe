import { useEffect, useState } from "react";
import { listarPedidos, atualizarStatusPedido } from "../services/pedidosService";
import LoadingCircle from "./Loading";

interface Pedido {
    id: number;
    total: number;
    metodo: string;
    mesa: string;
    itens: {
        id: number;
        nome: string;
        preco: number;
    }[];
    status: string;
}

export default function MostrarPedidos() {
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [loading, setLoading] = useState(true);

    const carregarPedidos = async () => {
        try {
            const data = await listarPedidos();
            setPedidos(data);
            setLoading(false);
        } catch (error) {
            console.error("Erro ao carregar pedidos:", error);
        }
    };

    useEffect(() => {
        carregarPedidos();
    }, []);

    async function marcarComoPronto(id: number) {
        setPedidos((prevPedidos) =>
            prevPedidos.map((pedido) =>
                pedido.id === id ? { ...pedido, status: "PRONTO" } : pedido
            )
        );

        try {
            await atualizarStatusPedido(id, "PRONTO");
        } catch (error) {
            console.error("Erro ao atualizar status:", error);
            carregarPedidos();
        }
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center w-full p-5">
                {loading ? <LoadingCircle /> : pedidos.length === 0 ? (
                    <p className="text-xl">Nenhum pedido pendente</p>
                ) : (
                    pedidos.map((pedido) => (
                        <div className="ring-2 shadow-md ring-blue-500 rounded-xl p-8 w-1/2 m-2" key={pedido.id}>
                            <p className="text-xl text-green-600 font-bold">{"Total: R$ " + pedido.total}</p>
                            <p className="font-semibold">Método de pagamento: {pedido.metodo}</p>
                            <p className="font-semibold">Número da mesa: {pedido.mesa}</p>
                            <p className="font-semibold">Itens pedidos: {pedido.itens.map((item) => item.nome).join(", ")}</p>
                            <button onClick={() => marcarComoPronto(pedido.id)} className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white px-6 py-4 rounded-lg mx-auto mt-2">
                                {pedido.status}
                            </button>
                        </div>
                    )))}
            </div>
        </>
    );
}       