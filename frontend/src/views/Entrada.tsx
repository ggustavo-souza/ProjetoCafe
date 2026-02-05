import Modal from "../components/Modal";
import { useState } from "react";

export default function Entrada() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"administrador" | "usuario">("usuario");

  const openModal = (type: "administrador" | "usuario") => {
    setModalType(type);
    setIsModalOpen(true);
  }

  return (
    <>
      <main className="">
        <div className="border-2 shadow-xl rounded-xl my-20 py-12 px-10 flex flex-col gap-8 max-w-sm mx-auto">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Entrada</h1>
          </div>
          <div>
            <button
              className="shadow-md bg-blue-500 mt-2 text-white p-3 rounded-xl hover:bg-blue-600 transition cursor-pointer w-full"
              onClick={() => {
                openModal("administrador");
              }}>
              Entrar como administrador
            </button>
          </div>
          <div>
            <button
              className="shadow-md bg-green-500 mt-2 text-white p-3 rounded-xl hover:bg-green-600 transition cursor-pointer w-full"
              onClick={() => {
                openModal("usuario");
              }}>
              Entrar como usuário
            </button>
          </div>
        </div>
      </main>
      <Modal
        isOpen={isModalOpen}
        type={modalType}
        setClose={() => setIsModalOpen(false)}
      />
    </>
  )
}