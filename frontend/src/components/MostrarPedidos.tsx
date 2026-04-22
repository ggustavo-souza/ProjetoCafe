import { useEffect, useState } from "react";
import { listarPedidos } from "../services/pedidosService";

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
}

export default function MostrarPedidos() {
    const [pedidos, setPedidos] = useState<Pedido[]>([]);

    const carregarPedidos = async () => {
        try {
            const data = await listarPedidos();
            setPedidos(data);
        } catch (error) {
            console.error("Erro ao carregar pedidos:", error);
        }
    };

    useEffect(() => {
        carregarPedidos();
    }, []);

    return (
        <>
            <div className="flex flex-col justify-center items-center w-full p-5">
                {pedidos.length === 0 ? (
                    <p>Nenhum pedido encontrado</p>
                ) : (
                    pedidos.map((pedido) => (
                        <div className="ring-2 ring-blue-500 rounded-xl p-5 w-1/2 m-2" key={pedido.id}>
                            <p className="text-xl text-green-600 font-bold">{"Total: R$ " + pedido.total}</p>
                            <p className="font-semibold">Método de pagamento: {pedido.metodo}</p>
                            <p className="font-semibold">Número da mesa: {pedido.mesa}</p>
                            <p className="font-semibold">Itens pedidos: {pedido.itens.map((item) => item.nome).join(", ")}</p>
                        </div>
                    )))}
            </div>
        </>
    );
}       