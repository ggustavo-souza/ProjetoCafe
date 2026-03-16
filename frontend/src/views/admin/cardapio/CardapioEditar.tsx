import FormCrudCardapio from "../../../components/FormCrudCardapio"
import { useEffect, useState } from "react"

export default function CardapioEditar() {
    const apiUrl: string = "http://localhost:3000";
    const [produtos, setProdutos] = useState([]);
    useEffect(() => {
        const carregarCardapio = async () => {
            try {
                const response = await fetch(`${apiUrl}/cardapio`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                const data = await response.json(); 
                
                console.log("Informações recebidas:", data);
                setProdutos(data);

            } catch (error) {
                console.error("Ocorreu um erro ao tentar conseguir os dados!:", error);
            }
        };

        carregarCardapio();
    }, []);

    return (
        <>
            <main>
                <ul>
                    {produtos.map((produto: any) => (
                        <li key={produto.id}>{produto.nome}{produto.descricao}</li>
                    ))}
                </ul>

                {/* <FormCrudCardapio type="edit" />  */}
            </main>
        </>
    )
}