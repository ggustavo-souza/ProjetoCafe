import { db } from "./connection";
import { pedidos } from "./schema";
import { eq } from "drizzle-orm";

class PedidosBd {
    public async createPedido(dados: any) {
        if (!dados) {
            console.log("Não existem dados ou eles não são compatíveis!")
        }
        const response = await db.insert(pedidos).values(dados);
        if (response) {
            return true;
        }
        return false;
    }
}

export const pedidosBd = new PedidosBd();