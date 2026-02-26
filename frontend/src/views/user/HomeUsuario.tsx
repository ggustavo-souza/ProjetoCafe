import Cardapio from "../../components/Cardapio";

export default function HomeUsuario() {

    return (
        <>
        <header>
            <h1 className="text-3xl font-bold text-center mt-10">Bem-vindo, Usuário!</h1>
        </header>
            <main>
                <Cardapio />
            </main>
        </>
    )
}