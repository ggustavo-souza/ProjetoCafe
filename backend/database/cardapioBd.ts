import { db } from "./connection";
import { produtos } from "./schema";

class CardapioDb {
    public getCardapio = async () => {
        try {
            const itens = await db.select().from(produtos);
            return itens;
        } catch (error) {
            console.error("Erro ao buscar o cardápio:", error);
            throw new Error("Erro ao buscar o cardápio");
        }
    }
    public criarItemCardapio = async (dados: any) => {
        if(!dados) {
            console.log("Não existem dados ou eles não são compatíveis!")
        }
        await db.insert(produtos).values(dados);
    }
}

export const cardapioBd = new CardapioDb();

