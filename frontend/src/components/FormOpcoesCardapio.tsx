import { useState } from "react"
import AlertErro from "./AlertErro"

interface formProps {
    modalOpcoes: boolean,
    modalType: "editar" | "excluir",
    setClose: () => void;
}

export default function FormOpcoesCardapio({ modalOpcoes, modalType, setClose }: formProps) {

    const [alert, setAlert] = useState({message: "", show: false});

    return (
        <div className="fixed inset-0 bg-gray-300 flex items-center justify-center">
            <div className="bg-white p-10 rounded-lg shadow-lg text-center">

            </div>
            {alert.show && (
                <AlertErro message={alert.message} />
            )}
        </div>

    )
}