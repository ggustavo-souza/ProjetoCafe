interface CardapioAdminProps {
    type: string;
}


export default function CardapioAdmin({ type }: CardapioAdminProps) {
    return (
        <>
            {type === 'add' ? (
                <>
                    <header className="text-black p-4 text-2xl font-bold text-center mt-7">
                        <p>Adicionar Item ao Cardápio</p>
                    </header>
                    <main>
                        <form>
                            <label htmlFor="nome">Nome do Item:</label>
                            <input className="border border-gray-300 rounded-md p-2 w-full" type="text" id="nome" name="nome" required />

                            <label htmlFor="descricao">Descrição do Item:</label>
                            <input className="border border-gray-300 rounded-md p-2 w-full" id="descricao" name="descricao" required></input>

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