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
    QRCODE: "/payment/qrcode"  // POST /payment/qrcode
  }
};