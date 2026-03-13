import { db } from "./connection";
import { produtos } from "./schema";

export const getCardapio = async () => {
    try {
        const itens = await db.select().from(produtos);
        return itens;
    } catch (error) {
        console.error("Erro ao buscar o cardápio:", error);
        throw new Error("Erro ao buscar o cardápio");
    }
}

