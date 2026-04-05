interface janelaPagamentoProps {
    total: number;
}



export default function JanelaPagamento({ total }: janelaPagamentoProps) {

    return (
        <div className="fixed inset-0 bg-gray-300 flex items-center justify-center z-50">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Pagamento</h2>
                    <button onClick={() => { }} className="text-gray-400 hover:text-gray-600 transition text-2xl leading-none cursor-pointer">
                        &times;
                    </button>
                </div>
                <div className="flex flex-col gap-4">
                    <p className="text-gray-700 text-lg">Total: R$ {total.toFixed(2)}</p>
                    <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">Pagar</button>
                </div>
            </div>
        </div>
    )
}