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
            categoria: "Bebidas",
            imagem: "/images/imagem1.png"
        },
        {
            id: 2,
            nome: "Pão de Queijo",
            descricao: "Tradicional pão de queijo mineiro",
            preco: 4.00,
            categoria: "Comidas",
            imagem: "/images/imagem2.jpg"
        },
        {
            id: 3,
            nome: "Capuccino Cremoso",
            descricao: "Café com leite vaporizado e cacau",
            preco: 8.50,
            categoria: "Bebidas",
            imagem: "/images/imagem3.jpg"
        },
        {
            id: 4,
            nome: "Açaí batido",
            descricao: "Açaí delicioso batido com acompanhamentos",
            preco: 10.00,
            categoria: "Bebidas",
            imagem: "/images/imagem4.jpeg"
        }
    ]).returning();

    const pedidosCriados = await db.insert(pedidos).values([
        {
            id: 1,
            formaPagamento: "Pix",
            mesaNumero: 1,
            total: 10.00,
            criadoEm: new Date(),
        },
        {
            id: 2,
            formaPagamento: "Pix",
            mesaNumero: 2,
            total: 15.00,
            criadoEm: new Date(),
        },
        {
            id: 3,
            formaPagamento: "Pix",
            mesaNumero: 3,
            total: 20.00,
            criadoEm: new Date(),
        }
    ]).returning();

    const itensPedidoCriados = await db.insert(itensPedido).values([
        {
            id: 1,
            pedidoId: 1,
            produtoId: 1,
            quantidade: 1,
            precoUnitario: 5.50,
        },
        {
            id: 2,
            pedidoId: 1,
            produtoId: 2,
            quantidade: 1,
            precoUnitario: 4.00,
        },
        {
            id: 3,
            pedidoId: 2,
            produtoId: 1,
            quantidade: 1,
            precoUnitario: 5.50,
        },
        {
            id: 4,
            pedidoId: 2,
            produtoId: 2,
            quantidade: 1,
            precoUnitario: 4.00,
        },
        {
            id: 5,
            pedidoId: 3,
            produtoId: 1,
            quantidade: 1,
            precoUnitario: 5.50,
        },
        {
            id: 6,
            pedidoId: 3,
            produtoId: 2,
            quantidade: 1,
            precoUnitario: 4.00,
        }
    ]).returning();

    console.log(`${inseridos.length} Produtos criados com sucesso! e ${pedidosCriados.length} Pedidos criados com sucesso! e ${itensPedidoCriados.length} Itens de Pedido criados com sucesso!`);
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