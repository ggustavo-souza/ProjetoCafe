import { useNavigate } from "react-router-dom";

export default function useRealizarLogin() {
    const navigate = useNavigate();

    const logar = (type: "administrador" | "usuario") => {
        localStorage.setItem("usuarioLogado", JSON.stringify({
            cargo: type
        }))
        if (type === 'administrador') {
            navigate('/admin')
        } else {
            navigate('/cliente')
        }
    }

    return { logar }

}