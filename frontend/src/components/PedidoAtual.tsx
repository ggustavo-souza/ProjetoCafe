interface Item {
    id: number;
    nome: string;
    preco: number;
}

interface PedidoAtualProps {
    mesa: string | null;
    itens: Item[];
}

export default function PedidoAtual({ mesa, itens }: PedidoAtualProps) {

    const removerItensPedido = () => {
        // remover os itens do pedido
    }

    return (
        <div className="p-4 fixed bottom-0 w-full bg-white shadow-lg ring-1 ring-gray-300 rounded-t-lg">
            <h2 className="text-2xl font-bold mb-4">Pedido Atual</h2>
            <p className="mb-2">Mesa: {mesa || "Mesa não selecionada"}</p>
            <button 
            className="mb-4 w-full cursor-pointer text-white py-2 rounded-md bg-blue-500 hover:bg-blue-600 transition-colors"
            onClick={() => removerItensPedido()}
            >Limpar Pedido</button>
            {itens.length === 0 ? (
                <p className="text-gray-500">Nenhum item adicionado ao pedido.</p>
            ) : (
                <ul className="space-y-2 max-h-32 overflow-y-auto pr-2">
                    {itens.map((item, index) => (
                        <li key={index} className="flex justify-between items-center bg-gray-100 p-3 rounded-md">
                            <span>{item.nome}</span>
                            <span className="font-semibold text-green-600">R${item.preco}</span>
                        </li>
                    ))}
                    <li className="flex justify-between items-center bg-gray-100 p-3 rounded-md mt-5">
                        <span className="font-bold text-2xl">Total:</span>
                        <span className="font-bold text-green-600 text-2xl">
                            R${itens.reduce((total, item) => total + item.preco, 0)}
                        </span>
                    </li>
                </ul>
            )}
            {itens.length > 0 && (
                <button className="mt-4 w-full cursor-pointer bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors">Finalizar Pedido</button>
            )}
        </div>
    );
}