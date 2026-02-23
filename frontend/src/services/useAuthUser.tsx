import { type ReactNode } from "react";
import { Link } from "react-router-dom";

interface AuthAcessProps {
  children: ReactNode;
}

interface Usuario {
  cargo: string;
}

export default function AuthAcessUser({ children }: AuthAcessProps) {
  const usuarioStorage = localStorage.getItem("usuarioLogado");
  const usuario: Usuario | null = usuarioStorage ? JSON.parse(usuarioStorage) : null

  if (!usuario || usuario.cargo !== "usuario") {
    return (
      <>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-lg shadow-2xl max-w-sm w-full text-center border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Você não é autorizado aqui!</h2>
            <Link to="/"><button className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-colors cursor-pointer">Voltar</button></Link>
          </div>
        </div>
      </>
    );
  }

  return children;
}