Resumo:
    Projeto desenvolvido em Typescript usando React.js no Front-end e Fasfity no Back-end (além do PostgreSQL no banco de dados). O projeto consiste num sistema para uma cafeteria, que necessitava de funções como exibição e edição de um cardápio, monitoramento de pedidos, sistema de pagamentos e geração de relatórios de vendas (em PDF).

Arquitetura: 
    Código:
        A arquitetura do código por parte do servidor é um MVC porém sem os Models (estrutura essencial que os dados devem seguir). 

        Cada objeto tratado na aplicação possuí seu arquivo de rotas, seu controller e seu responsável por operações dentro do banco de dados. A estrutura é demonstrada no diagrama a seguir junto da lista de cada objeto e sua correspondência real:

        Lista de objetos:
            Cardapio -> É o objeto responsável por tratar do cardápio da aplicação. Manipular o cardápio e realizar operações relacionadas ao mesmo.
            Pedidos -> Referencia os pedidos feitos na aplicação, que são criados a partir do momento que o usuário paga o pedido e o servidor processa esse pagamento. Pedidos possuem o atributo "status" que poderá ser definido como "pentente" ou "pronto".
            Payment -> É responsável por lidar com a lógica de pagamento, processamento e validação dos dados fornecidos pelo usuário, geração do QRcode e logo, em geral, comunicação com a API do MercadoPago.
            User -> Representa o usuário na aplicação, é responsável por ratar se o usuário é Admin ou User normal.

        cardapioRoutes -> cardapioController -> cardapioBd
        pedidosRoutes -> pedidosController -> pedidosBd

        As exceções estão listadas a seguir:

        paymentRoutes -> paymentController
        userRoutes -> userController
    Imagens:
        O processamento de imagens é feito pela API de arquivos do Node.js processando a imagem e transferindo-a para a pasta /public/images.
    Pagamentos: 
        A funcionalidade de pagamentos é feita utilizando o SDK e o gateway de pagamentos do MercadoPago, disponibilizando apenas o pagamento por Pix com QRcode.
    Geração de relatórios:
        Os relatórios são feitos utilizando a biblioteca jsPDF, pegando todos os pedidos prontos registrados e gerando a partir da biblioteca jsPDF, um arquivo PDF com todos esses pedidos.
    
Tecnologias Utilizadas:
    Front-End -> React Vite com Typescript -> MercadoPagoSDK / TailwindCSS / Bootstrap Icons / jsPDF / React Router 
    Back-End -> Node.js -> Fastify / Drizzle.js / jsPDF 
    Banco de Dados -> PostgreSQL
    DevOps -> Git/GitHub e Docker
    





