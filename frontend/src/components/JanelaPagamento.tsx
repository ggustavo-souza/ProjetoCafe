import EscolhaMetodo from "./EscolhaMetodo";
import { useState } from "react";
import DadosPagamento from "./DadosPagamento";

interface janelaPagamentoProps {
    total: number,
    itens: {
        id: number;
        nome: string;
        preco: number;
    }[];
    setClose: () => void;
    mesa: string | null;
}

export default function JanelaPagamento({ total, itens, setClose, mesa }: janelaPagamentoProps) {

    const [metodo, setMetodo] = useState("");

    return (
        <div className="fixed inset-0 bg-gray-300 flex items-center justify-center z-50">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center border-b-2 pb-3 border-gray-200">
                    <h2 className="text-xl font-bold text-gray-800">{metodo === "" ? "Pagamento" : "Pagamento via " + metodo}</h2>
                    <button onClick={() => setClose()} className="text-gray-400 hover:text-gray-600 transition text-4xl leading-none cursor-pointer">
                        &times;
                    </button>
                </div>
                <div className="flex flex-col gap-4">
                    {metodo === "" && (
                        <EscolhaMetodo
                            setMetodo={setMetodo}
                        />)}
                    {metodo !== "" && (
                        <DadosPagamento metodo={metodo} total={total} itens={itens} mesa={mesa} />
                    )}
                </div>
            </div>
        </div>
    )
}