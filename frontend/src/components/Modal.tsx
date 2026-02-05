interface ModalProps {
    isOpen: boolean
    type: "administrador" | "usuario"
    setClose: () => void
}

export default function Modal({isOpen, type, setClose}: ModalProps) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-gray-300 flex items-center justify-center">
            <div className="bg-white p-10 rounded-lg shadow-lg text-center">
                <h2 className="text-xl font-semibold mb-4">
                    {type === "administrador" ? "Login Administrador" : "Login Usuário"}
                </h2>
                <form>
                    <label className="block mb-2" htmlFor="chave">Digite a chave para entrar:</label>
                    <input 
                    type="text"
                    name="chave"
                    placeholder="Chave"
                    className="border p-2 rounded w-full mb-4"
                    />
                </form>
                <button 
                className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={setClose}
                >
                    Fechar
                </button>
            </div>
        </div>
    );

}