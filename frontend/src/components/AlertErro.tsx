import { useState } from "react";

interface AlertProps {
    message: string;
}

export default function AlertErro({ message }: AlertProps) {
    const [showModal, setShowModal] = useState(true);

    return (
        <>
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

                    <div className="bg-white p-8 rounded-lg shadow-2xl max-w-sm w-full text-center border border-gray-200"> 
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">{message}</h2>

                        <button
                            className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-colors cursor-pointer"
                            onClick={() => { setShowModal(false); }}
                        >
                            Voltar
                        </button>
                    </div>

                </div>
            )}
        </>

    );
}