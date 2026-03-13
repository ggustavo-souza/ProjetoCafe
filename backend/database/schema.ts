import { serial, text, integer, pgTable, decimal, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const produtos = pgTable("produtos", {
    id: serial("id").primaryKey(),
    nome: text("nome").notNull(),
    descricao: text("descricao").notNull(),
    preco: decimal('preco', { precision: 5, scale: 2, mode: 'number' }).notNull(),
    categoria: text("categoria").notNull(),
    imagem: text("imagem").notNull(),
});

export const pedidos = pgTable("pedidos", {
    id: serial("id").primaryKey(),
    mesaNumero: integer("mesa_numero").notNull(),
    total: decimal('total', { precision: 5, scale: 2, mode: 'number' }).notNull(),
    criadoEm: timestamp("criado_em").defaultNow().notNull(),
});

export const itensPedido = pgTable("itens_pedido", {
    id: serial("id").primaryKey(),
    pedidoId: integer("pedido_id").notNull().references(() => pedidos.id),
    produtoId: integer("produto_id").notNull().references(() => produtos.id),
    quantidade: integer("quantidade").notNull(),
    precoUnitario: decimal('preco_unitario', { precision: 5, scale: 2, mode: 'number' }).notNull(),
});

export const pedidosRelations = relations(pedidos, ({ many }) => ({
    itens: many(itensPedido),
}));

export const itensPedidoRelations = relations(itensPedido, ({ one }) => ({
    pedido: one(pedidos, {
        fields: [itensPedido.pedidoId],
        references: [pedidos.id],
    }),
    produto: one(produtos, {
        fields: [itensPedido.produtoId],
        references: [produtos.id],
    }),
}));

