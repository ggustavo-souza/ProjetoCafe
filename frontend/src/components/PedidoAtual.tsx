import { useState } from "react";
import JanelaPagamento from "./JanelaPagamento";

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
    const [expandir, setExpandir] = useState(false);
    const [janelaPagamento, setJanelaPagamento] = useState(false);
    const total = itens.reduce((total, item) => total + item.preco, 0);

    return (
        <>
            <div
                className={`p-4 fixed bottom-0 left-0 w-full bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] ring-1 ring-gray-300 rounded-t-2xl z-40 transition-transform duration-600 ease-in ${expandir ? "translate-y-full" : "translate-y-0"
                    }`}
            >
                <h2 className="text-xl font-bold mb-2">Pedido Atual</h2>
                <p className="mb-3 text-sm text-gray-600">Mesa: {mesa || "Mesa não selecionada"}</p>

                {itens.length === 0 ? (
                    <p className="text-gray-500 italic pb-2">Nenhum item adicionado ao pedido.</p>
                ) : (
                    <>
                        <button
                            className="mb-4 w-full cursor-pointer text-white py-3 rounded-md bg-blue-500 hover:bg-blue-600 transition-colors font-semibold"
                            onClick={() => setExpandir(true)}
                        >
                            Ver Pedido Completo ({itens.length} itens)
                        </button>

                        <div className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                            <span className="font-bold text-xl">Total:</span>
                            <span className="font-bold text-green-600 text-xl">
                                R$ {total.toFixed(2)}
                            </span>
                        </div>
                    </>
                )}
            </div>
            <div
                className={`fixed inset-0 z-50 bg-white flex flex-col p-6 transition-transform duration-300 ease-in-out ${expandir ? "translate-y-0" : "translate-y-full"
                    }`}
            >
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-3xl font-bold">Resumo do Pedido</h2>
                        <p className="text-gray-600 mt-1">Mesa: {mesa || "Não selecionada"}</p>
                    </div>
                    <button
                        onClick={() => setExpandir(false)}
                        className="text-gray-500 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                        aria-label="Fechar"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto mb-6">
                    <ul className="space-y-4">
                        {itens.map((item, index) => (
                            <li key={index} className="flex justify-between items-center border-b border-gray-200 pb-3">
                                <div>
                                    <p className="font-semibold text-lg">{item.nome}</p>
                                    <p className="text-sm text-gray-500">ID: {item.id}</p>
                                </div>
                                <span className="font-bold text-gray-800">
                                    R$ {item.preco.toFixed(2)}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="mt-auto pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md mb-4">
                        <span className="font-bold text-2xl text-gray-700">Total:</span>
                        <span className="font-bold text-green-600 text-3xl">
                            R$ {total.toFixed(2)}
                        </span>
                    </div>
                    <button
                        className="w-full cursor-pointer text-white py-4 rounded-md bg-green-500 hover:bg-green-600 transition-colors font-bold text-xl shadow-md"
                        onClick={() => {setExpandir(false); setJanelaPagamento(true);}}
                    >
                        Finalizar Compra
                    </button>
                </div>
            </div>
            {janelaPagamento && (
                <JanelaPagamento 
                total={total} 
                setClose={() => setJanelaPagamento(false)} />
            )}
        </>
    );
}