import { type ReactNode } from "react";
import { Link } from "react-router-dom";

interface AuthAcessProps {
  children: ReactNode;
}

interface Usuario {
  cargo: string;
}

export default function AuthAcess({ children }: AuthAcessProps) {
  const usuarioStorage = localStorage.getItem("usuarioLogado");
  const usuario: Usuario | null = usuarioStorage ? JSON.parse(usuarioStorage) : null

  if (!usuario || usuario.cargo !== "administrador") {
    return (
      <>
        <div className="card mt-5 container col-md-5 col-6" style={{ backgroundColor: "#503325" }}>
          <div className="card-body shadow shadow-5">
            <h3 style={{ color: "#FFD230" }}>Você não é autorizado aqui!</h3>
            <Link to="/"><button className="btn btn-danger col-3 align-self-center">Voltar</button> </Link>
          </div>
        </div>
      </>
    );
  }

  return children;
}