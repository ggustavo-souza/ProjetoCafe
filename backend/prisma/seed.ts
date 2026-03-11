import { PrismaClient } from '../generated/prisma/client';

const prisma = new PrismaClient();

async function databaseSeed() {
    const expresso = await prisma.produto.create({
        data: {
            nome: 'Expresso',
            descricao: 'Café expresso tradicional',
            preco: 5.00,
            categoria: 'Bebida',
            imagem: 'https://example.com/images/expresso.jpg'
        }
    });
    const cappuccino = await prisma.produto.create({
        data: {
            nome: 'Cappuccino',
            descricao: 'Café cappuccino com leite e espuma',
            preco: 7.00,
            categoria: 'Bebida',
            imagem: 'https://example.com/images/cappuccino.jpg'
        }
    });
}

databaseSeed()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
    });



