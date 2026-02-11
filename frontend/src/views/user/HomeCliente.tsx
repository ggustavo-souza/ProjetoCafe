import useAuthUser from "../../services/AuthUser"

export default function HomeCliente() {
    const {verificarUsuarioLogado} = useAuthUser();
    verificarUsuarioLogado();

    return (
        <>
            <p>aaaaaaaaaaaaaaaaaaaaaaaaa</p>
        </>
    )
}