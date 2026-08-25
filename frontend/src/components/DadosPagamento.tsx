import { useState, useEffect } from "react";
import LoadingCircle from "./Loading";
import { createQRcode, paymentStatus } from "../services/paymentService";
import { initMercadoPago } from "@mercadopago/sdk-react";
import Temporizador from "./Temporizador";
import { criarPedido } from "../services/pedidosService";

interface DadosPagamentoProps {
    metodo: string;
    total: number;
    itens: {
        id: number;
        nome: string;
        preco: number;
    }[];
    mesa: string | null;
}

initMercadoPago("TEST-e42304be-7aa3-483e-86b6-5a799d0a26f8");

export default function DadosPagamento({ metodo, total, itens, mesa }: DadosPagamentoProps) {

    const [estadoPagamento, setEstadoPagamento] = useState<'idle' | 'gerando' | 'pendente' | 'aprovado' | 'recusado' | 'expirado'>('idle');
    const [pixData, setPixData] = useState<{
        qrCodeBase64: string; paymentId: string
    } | null>(null);
    const [cpf, setCpf] = useState("");
    const [erroCpf, setErroCpf] = useState("");

    const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 11) value = value.slice(0, 11);
        
        if (value.length > 9) {
            value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{1,2})$/, "$1.$2.$3-$4");
        } else if (value.length > 6) {
            value = value.replace(/^(\d{3})(\d{3})(\d{1,3})$/, "$1.$2.$3");
        } else if (value.length > 3) {
            value = value.replace(/^(\d{3})(\d{1,3})$/, "$1.$2");
        }
        setCpf(value);
    };

    useEffect(() => {
        let interval: ReturnType<typeof setTimeout> = setTimeout(() => { });

        if (estadoPagamento === 'pendente' && pixData?.paymentId) {
            interval = setInterval(async () => {
                try {
                    const status = await paymentStatus(pixData.paymentId);
                    console.log(status.data.status)
                    if (status.data.status === 'approved') {
                        setEstadoPagamento('aprovado');
                        try {
                            const response = await criarPedido(total, metodo, itens, mesa);
                        } catch (error) {
                            console.error("Erro ao criar pedido.", error);
                            setEstadoPagamento('recusado');
                        }
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
        setErroCpf("");
        const cleanCpf = cpf.replace(/\D/g, '');
        if (cleanCpf.length !== 11) {
            setErroCpf("O CPF deve conter 11 dígitos.");
            return;
        }

        try {
            setEstadoPagamento('gerando');
            const response = await createQRcode(total, cleanCpf);
            console.log(response)

            if (response.success && response.data) {
                setPixData({
                    qrCodeBase64: response.data.point_of_interaction.transaction_data.qr_code_base64,
                    paymentId: response.data.id.toString()
                });
                setEstadoPagamento('pendente');
            } else {
                setErroCpf(response.message || "Erro ao gerar QR Code. Verifique o CPF.");
                setEstadoPagamento('idle');
            }
        } catch (error) {
            console.log(error, "Erro ao gerar QR Code")
            setErroCpf("Erro interno no servidor ou na conexão.");
            setEstadoPagamento('idle');
        }
    }


    return (
        <>
            {metodo === "Pix" && (
                <div className="justify-center w-full">
                    <div className="flex justify-center mt-5 w-full">
                        {estadoPagamento === 'idle' && (
                            <div className="flex flex-col gap-3 w-full max-w-sm">
                                <label className="text-gray-700 font-bold text-left">Informe seu CPF para o Pix:</label>
                                <input
                                    type="text"
                                    placeholder="000.000.000-00"
                                    value={cpf}
                                    onChange={handleCpfChange}
                                    className="p-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                />
                                {erroCpf && <p className="text-red-500 text-sm font-semibold text-left">{erroCpf}</p>}
                                <button type="submit" className="p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-bold cursor-pointer transition w-full" onClick={gerarQrcode}>Gerar QR Code</button>
                            </div>
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
                        {estadoPagamento === 'aprovado' && (
                            <div className="text-center">
                                <p className="text-green-500 font-bold mb-4">Pagamento aprovado!</p>
                            </div>
                        )}
                        {estadoPagamento === 'recusado' && (
                            <div className="text-center">
                                <p className="text-red-500 font-bold mb-4">Pagamento recusado.</p>
                            </div>
                        )}

                    </div>
                </div >

            )
            }
        </>
    )
}