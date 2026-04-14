import { useState, useEffect } from "react";
import LoadingCircle from "./Loading";
import { createQRcode } from "../services/paymentService";
import { initMercadoPago } from "@mercadopago/sdk-react";
interface DadosPagamentoProps {
    metodo: string;
    total: number;
}

initMercadoPago("TEST-e42304be-7aa3-483e-86b6-5a799d0a26f8");

export default function DadosPagamento({ metodo, total }: DadosPagamentoProps) {

    const [estadoPagamento, setEstadoPagamento] = useState<'idle' | 'gerando' | 'pendente' | 'aprovado' | 'recusado'>('idle');
    const [pixData, setPixData] = useState<{
        qrCodeBase64: string; copiaECola: string; paymentId: string
    } | null>(null);

    useEffect(() => {
        let interval: ReturnType<typeof setTimeout> = setTimeout(() => { });

        if (estadoPagamento === 'pendente' && pixData?.paymentId) {
            interval = setInterval(async () => {
                try {
                    const response = await fetch(`/api/payment_status/${pixData.paymentId}`);
                    const { status: paymentStatus } = await response.json();

                    if (paymentStatus === 'approved') {
                        setEstadoPagamento('aprovado');
                        clearInterval(interval);
                    }
                } catch (error) {
                    console.error("Erro ao checar status", error);
                    setEstadoPagamento('recusado');
                    clearInterval(interval);
                }
            }, 3000);
        }
        return () => clearInterval(interval);
    }, [estadoPagamento, pixData]);

    async function gerarQrcode() {
        try {
            setEstadoPagamento('gerando');
            const response = await createQRcode(total);
            console.log(response)

            if (response.success && response.data) {
                setPixData({
                    qrCodeBase64: response.data.qrCodeBase64,
                    copiaECola: response.data.copiaECola,
                    paymentId: response.data.paymentId
                });
            }
            setEstadoPagamento('pendente')
        } catch (error) {
            console.log(error, "Erro ao gerar QR Code")
            setEstadoPagamento('idle')
        }
    }


    return (
        <>
            {metodo === "Pix" && (
                <div className="justify-center ">
                    <p className="text-gray-800 font-bold text-center">Pagamento via Pix</p>
                    <div className="flex justify-center mt-5">
                        {estadoPagamento === 'idle' && (
                            <button type="submit" className="p-4 bg-blue-500 text-white rounded-lg font-bold cursor-pointer" onClick={gerarQrcode}>Gerar QR Code</button>
                        )}
                        {estadoPagamento === 'gerando' && (
                            <LoadingCircle />
                        )}
                        {estadoPagamento === 'pendente' && (
                            <div className="pix-payment-screen">
                                <h3>Pague via Pix</h3>
                                <p>Escaneie o QR Code abaixo com o aplicativo do seu banco:</p>

                                <img
                                    src={`data:image/jpeg;base64,${pixData?.qrCodeBase64}`}
                                    alt="QR Code Pix"
                                    style={{ width: '200px', height: '200px' }}
                                />

                                <div>
                                    <p>Ou utilize o Pix Copia e Cola:</p>
                                    <input type="text" readOnly value={pixData?.copiaECola} />
                                    <button onClick={() => navigator.clipboard.writeText(pixData?.copiaECola || '')}>
                                        Copiar
                                    </button>
                                </div>

                                <p><em>Aguardando confirmação do pagamento... (Atualização automática)</em></p>
                            </div>
                        )}

                    </div>
                </div>

            )}
        </>
    )
}