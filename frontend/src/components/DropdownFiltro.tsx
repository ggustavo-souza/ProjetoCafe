import { useState } from 'react';

export default function DropFiltro() {
    const [isOpen, setIsOpen] = useState(false);
    const [filtroSelecionado, setFiltroSelecionado] = useState('');

    const handleSelect = (opcao) => {
        setFiltroSelecionado(opcao);
        setIsOpen(false); 
        console.log("Filtro aplicado:", opcao); // futura funcao de filtrar
    };

    return (
        <div className="flex flex-col mx-auto max-w-6xl w-full text-black p-4">
            <div className="relative w-full">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-blue-500 w-full justify-center p-2 px-4 text-white rounded-md cursor-pointer hover:bg-blue-600 flex items-center gap-2 transition-colors"
                >
                    <i className="bi bi-funnel"></i>
                    {filtroSelecionado ? filtroSelecionado : "Filtrar"}
                </button>

                {isOpen && (
                    <div className="absolute left-0 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10">
                        <ul className="py-1 flex flex-col">
                            <li
                                onClick={() => handleSelect('Comidas')}
                                className="px-6 py-4 hover:bg-gray-100 cursor-pointer text-md"
                            >
                                Comidas
                            </li>
                            <li
                                onClick={() => handleSelect('Bebidas')}
                                className="px-6 py-4 hover:bg-gray-100 cursor-pointer text-md"
                            >
                                Bebidas
                            </li>
                            <li
                                onClick={() => handleSelect('Sobremesas')}
                                className="px-6 py-4 hover:bg-gray-100 cursor-pointer text-md"
                            >
                                Sobremesas
                            </li>
                        </ul>
                    </div>
                )}
            </div>
            {filtroSelecionado && (
                <div className="mt-4 text-sm text-gray-600">
                    Filtro aplicado: <span className="font-semibold">{filtroSelecionado}</span>
                    <button 
                        onClick={() => setFiltroSelecionado('')}
                        className="ml-5 p-3 rounded-md bg-blue-500 text-white hover:bg-blue-700 cursor-pointer"
                    >
                        Remover Filtro
                    </button>
                </div>
            )}
        </div>
    );
}