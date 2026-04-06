import { initMercadoPago } from "@mercadopago/sdk-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface janelaPagamentoProps {
    total: number,
    setClose: () => void;
}

export default function JanelaPagamento({ total, setClose }: janelaPagamentoProps) {

    initMercadoPago("TEST-e42304be-7aa3-483e-86b6-5a799d0a26f8");

    return (
        <div className="fixed inset-0 bg-gray-300 flex items-center justify-center z-50">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Pagamento</h2>
                    <button onClick={() => setClose()} className="text-gray-400 hover:text-gray-600 transition text-4xl leading-none cursor-pointer">
                        &times;
                    </button>
                </div>
                <div className="flex flex-col gap-4">
                    <p className="text-gray-800 font-bold">Escolha o método de pagamento</p>
                    <div className="flex flex-1 gap-5">
                        {["Pix", "Débito", "Crédito"].map((metodo) => (
                            <button
                                key={metodo}
                                className="w-full font-semibold cursor-pointer bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition p-2 px-4 flex flex-col"
                            >
                                {metodo} {metodo === "Débito" || metodo === "Crédito" ? <i className="bi bi-credit-card-2-back-fill"></i> : <FontAwesomeIcon icon="pix" size="2x" />} 
                            </button>
                        ))}
                    </div>
                    <p className="text-gray-900 text-lg"><b>Total:</b> R$ {total.toFixed(2)}</p>
                </div>
            </div>
        </div>
    )
}