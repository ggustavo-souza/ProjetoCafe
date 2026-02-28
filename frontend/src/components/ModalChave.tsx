import { useState } from "react"
import useRealizarLogin from "../services/Auth"
import AlertErro from "../components/AlertErro";

interface ModalProps {
    isOpen: boolean
    type: "administrador" | "usuario"
    setClose: () => void
}

export default function Modal({ isOpen, type, setClose }: ModalProps) {
    const [form, setForm] = useState({ chave: "" });
    const [alert, setAlert] = useState({message: "", show: false});
    const apiUrl: string = "http://localhost:3000";
    const { logar } = useRealizarLogin()
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log("form enviado com a chave:", form.chave, "e tipo:", type);
        try {
            if (type === "administrador") {
                await fetch(`${apiUrl}/administrador/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ chave: form.chave }),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log("Resposta do servidor:", data);
                        if (data.success) {
                            logar(type);
                        } else {
                            setAlert({message: "A chave digitada está incorreta.", show: true});
                            setTimeout(() => setAlert({ message: "", show: false }), 10000);
                        }
                    })
            } else {
                await fetch(`${apiUrl}/usuario/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ chaveUsuario: form.chave }),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log("Resposta do servidor:", data);
                        if (data.success) {
                            logar(type);
                        } else {
                            setAlert({message: "A chave digitada está incorreta.", show: true});
                            setTimeout(() => setAlert({ message: "", show: false }), 10000);
                        }
                    })
            }

        } catch (error) {
            console.error("Erro ao enviar o formulário:", error);
            setAlert({message: "Ocorreu um erro no login, tente novamente mais tarde.", show: true});
            setTimeout(() => setAlert({ message: "", show: false }), 10000);
        }
    }

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-gray-300 flex items-center justify-center">
            <div className="bg-white p-10 rounded-lg shadow-lg text-center">
                <h2 className="text-xl font-semibold mb-4">
                    {type === "administrador" ? "Login Administrador" : "Login Usuário"}
                </h2>
                {/* aqui ta o formulário da chave */}
                <form onSubmit={handleSubmit}>
                    <label className="block mb-2" htmlFor="chave">Digite a chave para entrar:</label>
                    <input
                        type="password"
                        name="chave"
                        placeholder="Chave"
                        className="p-2 rounded w-full mb-4 mt-3 border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
                        onChange={handleChange}
                    />
                    <button
                        className="w-full mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer"
                        type="submit"
                    >
                        Entrar
                    </button>
                </form>
                <button
                    className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
                    onClick={setClose}

                >
                    Fechar
                </button>
            </div>
            {alert.show && (
                <AlertErro message={alert.message} />
            )}
            
        </div>
    );
}