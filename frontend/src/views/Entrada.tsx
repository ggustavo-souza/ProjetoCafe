import { useState } from "react";

export default function Entrada() {

  const [form, setForm] = useState({ user: "", senha: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      const resposta = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });
      const dados = await resposta.json();
      console.log({dados});
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
    }
  }

  return (
    <>
      <main className="">
        <div className="border-2 shadow-xl rounded-xl my-20 py-8 px-4 flex flex-col gap-8 max-w-sm mx-auto">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Entrada</h1>
          </div>
          <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit} >
            <input
              type="text"
              placeholder="Usuário"
              className="p-3 m-2 border-2 border-indigo-400 shadow-md rounded-xl"
              id="user"
              name="user"
              required
              value={form.user}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Senha"
              className="p-3 m-2 border-2 border-indigo-400 shadow-md rounded-xl"
              id="senha"
              name="senha"
              required
              value={form.senha}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="shadow-md bg-blue-500 mt-2 text-white p-3 rounded-xl hover:bg-blue-600 transition cursor-pointer"
            >
              Entrar
            </button>
          </form>
        </div>
      </main>
    </>
  )
}