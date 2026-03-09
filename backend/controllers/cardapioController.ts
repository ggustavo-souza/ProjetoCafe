class CardapioController {
    public async getCardapio(request: any, reply: any) {
        try {

        }
        catch (error) {
            console.error("Erro ao buscar o cardápio:", error);
            reply.status(500).send({ error: "Erro ao buscar o cardápio" });
        }
    }
}

export const cardapioController = new CardapioController();