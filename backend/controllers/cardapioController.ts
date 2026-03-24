import { cardapioBd } from "../database/cardapioBd";
import fs from 'node:fs';
import { pipeline } from 'node:stream/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
        if (!request.isMultipart()) {
            return reply.status(400).send({ error: "Envio inválido. Use FormData." });
        }

        const data = await request.file();

        const id = data.fields.id.value;
        const nome = data.fields.nome?.value;
        const descricao = data.fields.descricao?.value;
        const preco = parseFloat(data.fields.preco?.value);
        const categoria = data.fields.categoria?.value;

        if (data.filename !== "") {
            const nomeArquivo = `${Date.now()}-${data.filename}`;
            const caminhoArquivo = path.join(__dirname, '../public/images', nomeArquivo);
            await pipeline(data.file, fs.createWriteStream(caminhoArquivo));

            const dadosParaBanco = {
                id,
                nome,
                descricao,
                preco,
                categoria,
                imagem: `/images/${nomeArquivo}`
            };
            mandarQueryEditar(dadosParaBanco);
        } else {
            const dadosParaBanco = {
                id,
                nome,
                descricao,
                preco,
                categoria
            }
            mandarQueryEditar(dadosParaBanco)
        }

        async function mandarQueryEditar(dadosParaBanco: any) {
            try {
                await cardapioBd.editarItemCardapio(dadosParaBanco);
                reply.status(200).send({ success: "O item foi editado!" });
            } catch (error) {
                reply.status(500).send({ error: `Erro ao editar no banco: ${error} ` });
            }
        }
    }

    public async criarItem(request: any, reply: any) {
        if (!request.isMultipart()) {
            return reply.status(400).send({ error: "Envio inválido. Use FormData." });
        }

        const data = await request.file();

        const nome = data.fields.nome.value;
        const descricao = data.fields.descricao.value;
        const preco = parseFloat(data.fields.preco.value);
        const categoria = data.fields.categoria.value;

        const nomeArquivo = `${Date.now()}-${data.filename}`;
        const caminhoArquivo = path.join(__dirname, '../public/images', nomeArquivo);

        await pipeline(data.file, fs.createWriteStream(caminhoArquivo));

        const dadosParaBanco = {
            nome,
            descricao,
            preco,
            categoria,
            imagem: `/images/${nomeArquivo}`
        };

        try {
            await cardapioBd.criarItemCardapio(dadosParaBanco);
            reply.status(200).send({ success: "O item foi adicionado!" });
        } catch (error) {
            reply.status(500).send({ error: `Erro ao salvar no banco: ${error} ` });
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