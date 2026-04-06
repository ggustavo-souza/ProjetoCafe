interface escolhaMetodoProps {
    setMetodo: (metodo: string) => void;
}

export default function EscolhaMetodo({ setMetodo }: escolhaMetodoProps) {
    return (
        <>
            <p className="text-gray-800 font-bold text-center">Escolha o método de pagamento</p>
            <div className="flex flex-1 gap-5">
                {["Pix", "Débito", "Crédito"].map((metodo) => (
                    <button
                        key={metodo}
                        className="w-full font-semibold cursor-pointer bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition p-2 px-4 flex flex-col"
                        onClick={() => setMetodo(metodo)}
                    >
                        {metodo} {metodo === "Débito" || metodo === "Crédito" ? <i className="bi bi-credit-card-2-back-fill"></i> : <i className="bi bi-qr-code"></i>}
                    </button>
                ))}
            </div>
        </>
    )
}