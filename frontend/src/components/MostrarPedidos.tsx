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
            <div>
                {pedidos.length === 0 ? (
                    <p>Nenhum pedido encontrado</p>
                ) : (
                    pedidos.map((pedido) => (
                        <div key={pedido.id}>
                            <p>{pedido.total}</p>
                            <p>{pedido.metodo}</p>
                            <p>{pedido.mesa}</p>
                            <p>{pedido.itens.map((item) => item.nome).join(", ")}</p>
                        </div>
                    )))}
            </div>
        </>
    );
}       