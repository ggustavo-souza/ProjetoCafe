const API_URL = "http://localhost:3000";

export const getCardapio = async () => {
    const response = await fetch(`${API_URL}/cardapio`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Erro ao carregar o cardápio");
    }

    return await response.json();
};