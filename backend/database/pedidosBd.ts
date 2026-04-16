import { db } from "./connection";
import { pedidos, itensPedido } from "./schema";
import { eq } from "drizzle-orm";

class PedidosBd {
    public async createPedido(dados: any, itens: any[]) {
        if (!dados) {
            console.log("Não existem dados ou eles não são compatíveis!")
            return false;
        }
        
        try {
            const [novoPedido] = await db.insert(pedidos).values(dados).returning();

            if (novoPedido && itens && itens.length > 0) {
                const itemCounts: Record<number, { preco: number, quantidade: number }> = {};
                for (const item of itens) {
                    if (!itemCounts[item.id]) {
                        itemCounts[item.id] = { preco: item.preco, quantidade: 0 };
                    }
                    itemCounts[item.id].quantidade += 1;
                }

                const itensToInsert = Object.keys(itemCounts).map(idStr => {
                    const id = Number(idStr);
                    return {
                        pedidoId: novoPedido.id,
                        produtoId: id,
                        quantidade: itemCounts[id].quantidade,
                        precoUnitario: itemCounts[id].preco
                    };
                });

                await db.insert(itensPedido).values(itensToInsert);
            }

            return true;
        } catch (error) {
            console.error("Erro ao criar pedido no banco:", error);
            return false;
        }
    }
}

export const pedidosBd = new PedidosBd();