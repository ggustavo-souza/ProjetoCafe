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

    public async listarPedidos() {
        try {
            const result = await db.query.pedidos.findMany({
                with: {
                    itens: {
                        with: {
                            produto: true
                        }
                    }
                },
                orderBy: (pedidos, { asc }) => [asc(pedidos.id)]
            });

            return result.map(pedido => ({
                id: pedido.id,
                total: pedido.total,
                metodo: pedido.formaPagamento,
                mesa: "Mesa " + pedido.mesaNumero,
                status: pedido.status,
                criadoEm: pedido.criadoEm,
                itens: pedido.itens.map(item => ({
                    id: item.produto.id,
                    nome: item.produto.nome,
                    preco: item.precoUnitario,
                    quantidade: item.quantidade
                }))
            }));
        } catch (error) {
            console.error("Erro ao listar pedidos no banco:", error);
            return [];
        }
    }
}

export const pedidosBd = new PedidosBd();