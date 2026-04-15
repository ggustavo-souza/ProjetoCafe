export const ROUTES = {
  ADMIN: {
    LOGIN: "/administrador/login",
  },
  USER: {
    LOGIN: "/usuario/login",
  },
  CARDAPIO: {
    LIST: "/cardapio",          // GET /cardapio
    VIEW: "/cardapio/:id",     // GET /cardapio/15
    CREATE: "/cardapio",        // POST /cardapio 
    DELETE: "/cardapio/:id",    // DELETE /cardapio/15
    EDIT: "/cardapio/:id"       // PUT /cardapio/15
  },
  PAYMENT: {
    CREATE: "/payment",        // POST /payment 
    QRCODE: "/payment/qrcode",  // POST /payment/qrcode
    STATUS: "/payment/status/:paymentId" // GET /payment/status/123456789
  },
  PEDIDOS: {
    CREATE: "/pedidos",        // POST /pedidos 
    LIST: "/pedidos",          // GET /pedidos
    VIEW: "/pedidos/:id",     // GET /pedidos/15
    DELETE: "/pedidos/:id",    // DELETE /pedidos/15
    EDIT: "/pedidos/:id"       // PUT /pedidos/15 
  }
};