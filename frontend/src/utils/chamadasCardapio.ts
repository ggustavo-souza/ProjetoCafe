class ChamadasCardapio {
    public async getCardapio() {
        const url = "http://localhost:3000/cardapio";
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Erro ao buscar o cardápio");
            }
            return await response.json();
        } catch (error) {
            console.error("Erro ao buscar o cardápio:", error);
            throw error;
        }
    }
}

export const chamadasCardapio = new ChamadasCardapio();