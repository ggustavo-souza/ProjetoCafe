import { useState, useEffect } from "react";
import LoadingCircle from "./Loading";
import { createQRcode, paymentStatus } from "../services/paymentService";
import { initMercadoPago } from "@mercadopago/sdk-react";
import Temporizador from "./Temporizador";
interface DadosPagamentoProps {
    metodo: string;
    total: number;
}

initMercadoPago("TEST-e42304be-7aa3-483e-86b6-5a799d0a26f8");

export default function DadosPagamento({ metodo, total }: DadosPagamentoProps) {

    const [estadoPagamento, setEstadoPagamento] = useState<'idle' | 'gerando' | 'pendente' | 'aprovado' | 'recusado' | 'expirado'>('idle');
    const [pixData, setPixData] = useState<{
        qrCodeBase64: string; paymentId: string
    } | null>(null);

    useEffect(() => {
        let interval: ReturnType<typeof setTimeout> = setTimeout(() => { });

        if (estadoPagamento === 'pendente' && pixData?.paymentId) {
            interval = setInterval(async () => {
                try {
                    const status = await paymentStatus(pixData.paymentId);
                    console.log(status.data.status)
                    if (status.data.status === 'approved') {
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
                    qrCodeBase64: response.data.point_of_interaction.transaction_data.qr_code_base64,
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
                                <div><h2>{<Temporizador initialMinutes={3} initialSeconds={0} expirando={() => setEstadoPagamento('expirado')} />}</h2></div>
                                <p className="text-gray-800 font-bold"><em>Aguardando confirmação do pagamento...</em></p>
                            </div>
                        )}
                        {estadoPagamento === 'expirado' && (
                            <div className="text-center">
                                <p className="text-red-500 font-bold mb-4">O tempo limite para pagamento expirou.</p>
                                <button type="button" className="p-4 bg-blue-500 text-white rounded-lg font-bold cursor-pointer" onClick={gerarQrcode}>Gerar Novo QR Code</button>
                            </div>
                        )}

                    </div>
                </div >

            )
            }
        </>
    )
}