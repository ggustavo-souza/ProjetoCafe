import { db } from "./connection";
import { produtos } from "./schema";
import { eq } from "drizzle-orm";

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
    public getItem = async (id: number) => {
        if(!id) {
            console.log("Não há id para consultar o produto!");
        }
        try {
            const item = await db.select().from(produtos).where(eq(produtos.id, id));
            return item[0];
        } catch (error) {
            console.error("Erro ao buscar item único no banco de dados!", error)
            throw error;
        }
    }

    public editarItemCardapio = async (dados: any) => {
        if(!dados) {
            console.log("Não existem dados ou eles não são compatíveis!")
        }

        await db.update(produtos)
            .set(dados)
            .where(eq(produtos.id, dados.id))
    }
}

export const cardapioBd = new CardapioDb();

