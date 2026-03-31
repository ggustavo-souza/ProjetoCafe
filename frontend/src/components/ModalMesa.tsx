interface ModalMesaProps {
    isOpen: boolean
    setClose: () => void
}

export default function ModalMesa({ isOpen, setClose }: ModalMesaProps) {
    const mesas = [1, 2, 3, 4, 5, 6, 7, 8];

    async function registrarMesa(mesa: string) {
        localStorage.setItem("mesa", mesa);
        setClose();
    }

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-gray-300 flex items-center justify-center">
            <div className="bg-white p-10 rounded-lg shadow-lg text-center">
                {/* aqui ta o formulário da chave */}
                <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const mesa = formData.get("mesa") as string;
                    registrarMesa(mesa);
                }}>
                    <label className="block mb-2" htmlFor="chave">Selecione a mesa:</label>
                    <select
                        name="mesa"
                        className="p-2 rounded w-full mb-4 mt-3 border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
                    >
                        {mesas.map(mesa => (
                            <option key={mesa} value={mesa}>Mesa {mesa}</option>
                        ))}
                    </select>
                    <button
                        className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
                        type="submit"
                    >
                        Confirmar
                    </button>
                </form>
            </div>
        </div>
    );
}