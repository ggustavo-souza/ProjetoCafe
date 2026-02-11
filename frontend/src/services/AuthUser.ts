import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useAuthUser() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("")
  const [logou, setLogou] = useState(false)

  interface Usuario {
    cargo: string;
  }

  const verificarUsuarioLogado = () => {
    const usuarioStorage = localStorage.getItem("usuarioLogado");

    if (!usuarioStorage) {
      console.log("não está logado")
      setLogou(false);
      navigate("/")
      return;
    }

    try {
      const usuarioLogado: Usuario = JSON.parse(usuarioStorage);

      if (usuarioLogado.cargo !== "usuario") {
        console.log("não é usuário e está tentando entrar na área do usuário")
        setLogou(false)
        navigate("/");
      } else {
        setLogou(true);
        setUsuario(usuarioLogado.cargo);
      }
    } catch (error) {
      console.error("Erro ao ler o usuário do localStorage", error);
      setLogou(false);
      navigate("/");
    }
  }

  return { verificarUsuarioLogado }
}