import { db } from "./connection";
import { produtos, pedidos, itensPedido } from './schema'

async function seed() {
    console.log("Limpando banco de dados...");
    await db.delete(itensPedido);
    await db.delete(pedidos);
    await db.delete(produtos);

    console.log("Inserindo novos produtos...");
    const inseridos = await db.insert(produtos).values([
        {
            id: 1,
            nome: "Café Expresso",
            descricao: "Café arábica intenso de 30ml",
            preco: 5.50,
            categoria: "bebidas",
            imagem: "https://images.com/expresso.png"
        },
        {
            id: 2,
            nome: "Pão de Queijo",
            descricao: "Tradicional pão de queijo mineiro",
            preco: 4.00,
            categoria: "comidas",
            imagem: "https://images.com/paodequeijo.png"
        },
        {
            id: 3,
            nome: "Capuccino Cremoso",
            descricao: "Café com leite vaporizado e cacau",
            preco: 8.50,
            categoria: "bebidas",
            imagem: "https://images.com/capuccino.png"
        }
    ]).returning();

    console.log(`${inseridos.length} Produtos criados com sucesso!`);
}

seed()
    .then(() => {
        console.log("Seed finalizado!");
        process.exit(0);
    })
    .catch((err) => {
        console.error("Erro ao semear banco!", err);
        process.exit(1);
    });