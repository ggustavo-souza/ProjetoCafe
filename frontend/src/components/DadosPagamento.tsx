import { useState, useEffect } from "react";
import LoadingCircle from "./Loading";
import { createQRcode } from "../services/paymentService";
import { initMercadoPago } from "@mercadopago/sdk-react";
import Temporizador from "./Temporizador";
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
            }, 180000);
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
                    qrCodeBase64: response.data.point_of_interaction.transaction_data.qr_code_base64,
                    copiaECola: response.data.point_of_interaction.transaction_data.qr_code,
                    paymentId: response.data.id.toString()
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
                    <div className="flex justify-center mt-5">
                        {estadoPagamento === 'idle' && (
                            <button type="submit" className="p-4 bg-blue-500 text-white rounded-lg font-bold cursor-pointer" onClick={gerarQrcode}>Gerar QR Code</button>
                        )}
                        {estadoPagamento === 'gerando' && (
                            <LoadingCircle />
                        )}
                        {estadoPagamento === 'pendente' && (
                            <div className="text-center">
                                <p>Escaneie o QR Code abaixo com o aplicativo do seu banco:</p>
                                <div className="flex justify-center my-3 ">
                                    <img
                                        src={`data:image/jpeg;base64,${pixData?.qrCodeBase64}`}
                                        alt="QR Code Pix"
                                        style={{ width: '200px', height: '200px' }}
                                    />
                                </div>

                                <div className="">
                                    <p>Clique para copiar o código:</p>
                                    <input type="text" className="ring-2 ring-blue-500 rounded-lg p-4 bg-gray-100 my-3" onClick={() => navigator.clipboard.writeText(pixData?.copiaECola || '')} readOnly value={pixData?.copiaECola} />
                                </div>
                                <div><h2>{<Temporizador initialMinutes={5} initialSeconds={0} />}</h2></div>
                                <p className="text-gray-800 font-bold"><em>Aguardando confirmação do pagamento...</em></p>
                            </div>
                        )}

                    </div>
                </div >

            )
            }
        </>
    )
}