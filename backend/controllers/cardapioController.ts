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

    public async getItem(request: any, reply: any) {
        try {
            const { id } = request.params;
            const itemCardapio = await cardapioBd.getItem(Number(id));

            if (!itemCardapio) {
                return reply.status(404).send({ error: "Produto não encontrado!" });
            }

            reply.status(200).send(itemCardapio)
        } catch (error) {
            console.error("Erro ao buscar item no cardápio:", error);
            return reply.status(500).send({ error: "Erro interno do servidor" });
        }
    }

    public async editarItem(request: any, reply: any) {
        try {
            const { id } = request.params;
            const dados = {
                id: Number(id),
                nome: request.body.nome,
                descricao: request.body.descricao,
                preco: request.body.preco,
                categoria: request.body.categoria,
                imagem: request.body.imagem
            }

            await cardapioBd.editarItemCardapio(dados);
            reply.status(200).send({ success: "A edição ocorreu com sucesso!" });
        } catch (error) {
            console.error("Erro ao editar item do cardápio:", error);
            return reply.status(500).send({ error: "Erro no controller" });
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
            reply.status(200).send({ success: "O item foi adicionado!" })
        } catch (error) {
            console.error("Erro ao criar item no cardápio.")
            reply.status(500).send({ error: "Erro ao criar item no cardápio." })
        }
    }

    public async deletarItem(request: any, reply: any) {
        try {
            const { id } = request.params;
            const dados = {
                id: id
            }
            await cardapioBd.deletarItemCardapio(dados);
        } catch (error) {

        }

    }
}

export const cardapioController = new CardapioController();