const apiUrl = "http://localhost:3000/pedidos";

export async function criarPedido(total: number, metodo: string, itens: {
    id: number;
    nome: string;
    preco: number;
}[], mesa: string | null) {
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ total, metodo, itens, mesa }),
    });
    return await response.json();
}