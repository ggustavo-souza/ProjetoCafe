import FormCrudCardapio from "../../../components/FormCrudCardapio"

export default function CardapioEditar() {
    return (
        <>
            <header className="text-black p-4 text-2xl font-bold text-center mt-7">
                <p>Editar Item do Cardápio</p>
            </header>
            <main>
                <FormCrudCardapio type="edit" />
            </main>
        </>
    )
}