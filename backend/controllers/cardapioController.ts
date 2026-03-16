import { cardapioBd } from "../database/cardapioBd";

class CardapioController {
    public async getCardapio(request: any, reply: any) {
        try {
            const cardapio = await cardapioBd.getCardapio();
            reply.status(200).send(cardapio);
        }
        catch (error) {
            console.error("Erro ao buscar o cardápio:", error);
            reply.status(500).send({ error: "Erro ao buscar o cardápio" });
        }
    }
    public async criarItem(request: any, reply: any) {
        try {
            const dados = {
                nome: request.body.nome,
                descricao: request.body.descricao,
                preco: request.body.preco,
                categoria: request.body.categoria,
                imagem: request.body.imagem
            }
            await cardapioBd.criarItemCardapio(dados);
            reply.status(200).send({success: "O item foi adicionado!" })
        } catch (error) {
            console.error("Erro ao criar item no cardápio.")
            reply.status(500).send({ error: "Erro ao criar item no cardápio."})
        }
    }
}

export const cardapioController = new CardapioController();