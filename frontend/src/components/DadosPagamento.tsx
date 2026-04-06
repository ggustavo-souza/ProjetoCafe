import { initMercadoPago } from "@mercadopago/sdk-react";

interface DadosPagamentoProps {
    metodo: string;
}

initMercadoPago("TEST-e42304be-7aa3-483e-86b6-5a799d0a26f8");


export default function DadosPagamento({ metodo }: DadosPagamentoProps) {
    return (
        <>
            {metodo === "Pix" && (
                <div>
                    <p className="text-gray-800 font-bold text-center">Pagamento via Pix</p>
                    <p className="text-gray-600 text-center">Escaneie o código QR para concluir o pagamento</p>
                </div>
            )}
        </>
    )
}