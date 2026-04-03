import { useState } from 'react';

interface DropFiltroProps {
    filtroSelecionado: string;
    setFiltroSelecionado: (filtro: string) => void;
}

export default function DropFiltro({ filtroSelecionado, setFiltroSelecionado }: DropFiltroProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (opcao: string) => {
        setFiltroSelecionado(opcao);
        setIsOpen(false);
    };

    return (
        <div className="flex flex-col mx-auto max-w-6xl w-full text-black p-4">
            <div className="relative w-full">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-blue-500 font-semibold w-full justify-center p-2 px-4 text-white rounded-md cursor-pointer hover:bg-blue-600 flex items-center gap-2 transition-colors"
                >
                    <i className="bi bi-funnel"></i>
                    {filtroSelecionado ? filtroSelecionado : "Filtrar"}
                </button>
                {isOpen && (
                    <div className="absolute left-0 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10">
                        <ul className="py-1 flex flex-col">
                            {['Comidas', 'Bebidas', 'Sobremesas'].map((opcao) => (
                                <li
                                    key={opcao}
                                    onClick={() => handleSelect(opcao)}
                                    className="px-6 py-4 font-semibold hover:bg-gray-100 cursor-pointer text-md"
                                >
                                    {opcao}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            {filtroSelecionado && (
                <div className="mt-4 text-sm text-gray-600">
                    Filtro aplicado: <span className="font-semibold">{filtroSelecionado}</span>
                    <button
                        onClick={() => setFiltroSelecionado('')}
                        className="ml-5 p-3 font-semibold rounded-md bg-blue-500 text-white hover:bg-blue-700 cursor-pointer"
                    >
                        Remover Filtro
                    </button>
                </div>
            )}
        </div>
    );
}