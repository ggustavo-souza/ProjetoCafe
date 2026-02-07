import { useState } from "react"

interface ModalProps {
    isOpen: boolean
    type: "administrador" | "usuario"
    setClose: () => void
}

export default function Modal({ isOpen, type, setClose }: ModalProps) {
    const [form, setForm] = useState({ chave: "" });
    const apiUrl: string = "http://localhost:3000";
    console.log(type);
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
                            alert("Login de administrador bem-sucedido!");
                        } else {
                            alert("Chave de administrador inválida.");
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
                            alert("Login de usuário bem-sucedido!");
                        } else {
                            alert("Chave de usuário inválida.");
                        }
                    })
            }
        
        } catch (error) {
            console.error("Erro ao enviar o formulário:", error);
            alert("Ocorreu um erro ao tentar fazer login. Por favor, tente novamente.");
        }
    }

        if (!isOpen) return null;
        return (
            <div className="fixed inset-0 bg-gray-300 flex items-center justify-center">
                <div className="bg-white p-10 rounded-lg shadow-lg text-center">
                    <h2 className="text-xl font-semibold mb-4">
                        {type === "administrador" ? "Login Administrador" : "Login Usuário"}
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <label className="block mb-2" htmlFor="chave">Digite a chave para entrar:</label>
                        <input
                            type="text"
                            name="chave"
                            placeholder="Chave"
                            className="border p-2 rounded w-full mb-4"
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
            </div>
        );

    }