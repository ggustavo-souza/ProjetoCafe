import { PrismaClient } from '../generated/prisma/client';

const prisma = new PrismaClient();

async function main() {
    const expresso = await prisma.produto.create({
        data: {
            nome: 'Expresso',
            descricao: 'Café expresso tradicional',
            preco: 5.00,
            categoria: 'Bebida',
            imagem: 'https://example.com/images/expresso.jpg'
        }
    });
}