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

export const viewCardapio = async (id: number) => {
    const response = await fetch(`${API_URL}/cardapio/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if(!response.ok) {
        throw new Error("Erro ao carregar o item do cardápio");
    }
    return await response.json();
};

export const addCardapio = async (item: any) => {
    const response = await fetch(`${API_URL}/cardapio`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
    });

    if (!response.ok) {
        throw new Error("Erro ao adicionar item ao cardápio");
    }

    return await response.json();
};

export const editCardapio = async (id: number, formdata: any) => {
    const response = await fetch(`${API_URL}/cardapio/${id}`, {
        method: "PUT",
        body: formdata,
    });
    if (!response.ok) {
        throw new Error("Erro ao editar item do cardápio");
    }
    return await response.json();
};

export const deleteCardapio = async (id: number) => {
    const response = await fetch(`${API_URL}/cardapio/${id}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ id }),
    });
    if (!response.ok) {
        throw new Error("Erro ao deletar item do cardápio");
    }
    return await response.json();
};

