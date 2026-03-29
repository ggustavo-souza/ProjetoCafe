const apiUrl = "http://localhost:3000";

export const realizarLogin = async (type: "administrador" | "usuario", chave: string) => {
    const endpoint = type === "administrador" ? "/administrador/login" : "/usuario/login";
    const body = type === "administrador" ? { chave } : { chaveUsuario: chave };

    const response = await fetch(`${apiUrl}${endpoint}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        throw new Error("Erro ao realizar login");
    }
    return await response.json();
};