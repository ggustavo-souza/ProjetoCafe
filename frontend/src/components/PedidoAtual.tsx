import { useState } from "react";

interface Item {
    id: number;
    nome: string;
    preco: number;
}

interface PedidoAtualProps {
    mesa: string | null;
}

export default function PedidoAtual({ mesa }: PedidoAtualProps) {
    const [itens, setItens] = useState<Item[]>([]);

    return (
        <div className="p-4 fixed bottom-0 w-full bg-white shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Pedido Atual</h2>
            <p>Mesa: {mesa || "Mesa não selecionada"}</p>
            {itens.length === 0 ? (
                <p className="text-gray-500">Nenhum item adicionado ao pedido.</p>
            ) : (
                <ul className="space-y-2">
                    {itens.map((item, index) => (
                        <li key={index} className="flex justify-between items-center bg-gray-100 p-3 rounded-md">
                            <span>{item.nome}</span>
                            <span className="font-semibold">R${item.preco}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}