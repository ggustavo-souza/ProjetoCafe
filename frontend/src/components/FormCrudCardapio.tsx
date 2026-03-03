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
                    <header className="text-black p-4 text-2xl font-bold mt-7 text-center">
                        <button onClick={() => navigate(-1)} className="bg-gray-500 p-3 hover:bg-gray-600 cursor-pointer text-white rounded-md">Voltar</button>
                        <p className="inline-block ml-4">Adicionar Item ao Cardápio</p>
                    </header>
                    <main>
                        <div className="max-w-md mx-auto bg-gray-200 p-6 rounded-lg shadow-lg m-8">
                            <form className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md" encType="multipart/form-data">
                                <label htmlFor="nome">Nome do Item:</label>
                                <input className="border border-gray-300 rounded-md p-2 w-full" type="text" id="nome" name="nome" required />

                                <label htmlFor="descricao">Descrição do Item:</label>
                                <input className="h-30 border border-gray-300 rounded-md p-2 w-full" id="descricao" name="descricao" required></input>

                                <label htmlFor="preco">Preço do Item:</label>
                                <input className="border border-gray-300 rounded-md p-2 w-full" type="number" id="preco" name="preco" required />

                                <label htmlFor="categoria">Categoria do Item:</label>
                                <select className="border border-gray-300 rounded-md p-2 w-full" id="categoria" name="categoria" required>
                                    <option value="">Selecione uma categoria</option>
                                    <option value="entrada">Entrada</option>
                                    <option value="prato_principal">Prato Principal</option>
                                    <option value="sobremesa">Sobremesa</option>
                                    <option value="bebida">Bebida</option>
                                </select>

                                <label htmlFor="imagem">Adicione imagens ao item</label>
                                <input className="border border-gray-300 rounded-md p-2 w-full" type="file" id="imagem" name="imagem" accept="image/*" multiple />

                                <button className="bg-green-500 text-white px-4 py-2 rounded-md mt-4" type="submit">Adicionar Item</button>
                            </form>
                        </div>
                    </main>
                </>
            ) : (
                <>
                    <header className="text-black p-4 text-2xl font-bold text-center mt-7">
                        <p>Editar Item do Cardápio</p>
                    </header>
                    <main>
                        <form>

                        </form>
                    </main>
                </>
            )}
        </>
    )
}