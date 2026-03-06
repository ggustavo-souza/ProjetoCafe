import { useNavigate } from "react-router-dom";

interface CardapioAdminProps {
    type: string;
}


export default function CardapioAdmin({ type }: CardapioAdminProps) {
    const navigate = useNavigate();

    return (
        <>
            {type === 'add' ? (
                <>
                    <header className="relative flex flex-1 flex-col items-center justify-center text-black p-4 text-2xl font-bold mt-5">
                        <button
                            onClick={() => navigate(-1)}
                            className="md:absolute left-4 bg-gray-500 p-3 sm:mb-2 hover:bg-gray-600 cursor-pointer text-white text-sm font-normal rounded-md"
                        >
                            Voltar
                        </button>
                        <p>Adicionar Item ao Cardápio</p>
                    </header>
                    <main>
                        <div className="max-w-md mx-auto bg-gray-200 p-6 rounded-lg shadow-lg m-8">
                            <form className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md text-center" encType="multipart/form-data">
                                <label htmlFor="nome">Nome do Item:</label>
                                <input className="border mt-2 mb-2 border-gray-300 rounded-md p-2 w-full" type="text" id="nome" name="nome" required />

                                <label htmlFor="descricao">Descrição do Item:</label>
                                <input className="h-30 mt-2 mb-2 border border-gray-300 rounded-md p-2 w-full" id="descricao" name="descricao" required></input>

                                <label htmlFor="preco">Preço do Item:</label>
                                <input className="border mt-2 mb-2 border-gray-300 rounded-md p-2 w-full" type="number" id="preco" name="preco" required />

                                <label htmlFor="categoria">Categoria do Item:</label>
                                <select className="border mt-2 mb-2 border-gray-300 rounded-md p-2 w-full" id="categoria" name="categoria" required>
                                    <option value="">Selecione uma categoria</option>
                                    <option value="entrada">Entrada</option>
                                    <option value="prato_principal">Prato Principal</option>
                                    <option value="sobremesa">Sobremesa</option>
                                    <option value="bebida">Bebida</option>
                                </select>

                                <label htmlFor="imagem">Adicionar imagem</label>
                                <input className="border mt-2 mb-2 border-gray-300 rounded-md p-2 w-full" type="file" id="imagem" name="imagem" accept="image/*" multiple />

                                <button className="bg-green-500 text-white px-4 py-2 rounded-md mt-4" type="submit">Adicionar Item</button>
                            </form>
                        </div>
                    </main>
                </>
            ) : (
                <>
                    <header className="relative flex flex-1 flex-col items-center justify-center text-black p-4 text-2xl font-bold mt-5">
                        <button
                            onClick={() => navigate(-1)}
                            className="md:absolute left-4 bg-gray-500 p-3 sm:mb-2 hover:bg-gray-600 cursor-pointer text-white text-sm font-normal rounded-md"
                        >
                            Voltar
                        </button>
                        <p>Editar Cardápio</p>
                    </header>
                    <main>
                        <div className="max-w-md mx-auto bg-gray-200 p-6 rounded-lg shadow-lg m-8">
                            <form className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md text-center" encType="multipart/form-data">
                                <label htmlFor="nome">Nome do Item:</label>
                                <input className="border mt-2 mb-2 border-gray-300 rounded-md p-2 w-full" type="text" id="nome" name="nome" required />

                                <label htmlFor="descricao">Descrição do Item:</label>
                                <input className="h-30 mt-2 mb-2 border border-gray-300 rounded-md p-2 w-full" id="descricao" name="descricao" required></input>

                                <label htmlFor="preco">Preço do Item:</label>
                                <input className="border mt-2 mb-2 border-gray-300 rounded-md p-2 w-full" type="number" id="preco" name="preco" required />

                                <label htmlFor="categoria">Categoria do Item:</label>
                                <select className="border mt-2 mb-2 border-gray-300 rounded-md p-2 w-full" id="categoria" name="categoria" required>
                                    <option value="">Selecione uma categoria</option>
                                    <option value="entrada">Entrada</option>
                                    <option value="prato_principal">Prato Principal</option>
                                    <option value="sobremesa">Sobremesa</option>
                                    <option value="bebida">Bebida</option>
                                </select>

                                <label htmlFor="imagem">Adicionar imagem</label>
                                <input className="border mt-2 mb-2 border-gray-300 rounded-md p-2 w-full" type="file" id="imagem" name="imagem" accept="image/*" multiple />
                                <img className="w-full h-30 object-cover border mt-2 mb-2" src="https://via.placeholder.com/150" alt="Imagem do Item" />

                                <button className="bg-green-500 text-white px-4 py-2 rounded-md mt-4" type="submit">Adicionar Item</button>
                            </form>
                        </div>
                    </main>
                </>
            )}
        </>
    )
}