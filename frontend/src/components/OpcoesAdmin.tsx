import { useNavigate } from "react-router-dom"
import { listarPedidos } from "../services/pedidosService";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function OpcoesAdmin() {
    const navigate = useNavigate();

    const gerarRelatorioPDF = async () => {
        try {
            const pedidos = await listarPedidos();
            const pedidosProntos = pedidos.filter((pedido: any) => pedido.status === "PRONTO");

            const doc = new jsPDF();
            doc.text("Relatório de Pedidos do dia", 14, 15);

            const tableData = pedidosProntos.map((pedido: any) => [
                pedido.id,
                pedido.metodo || pedido.formaPagamento || "Não informado",
                `R$ ${Number(pedido.total).toFixed(2)}`,
                pedido.dataCriacao ? new Date(pedido.dataCriacao).toLocaleDateString() : new Date().toLocaleDateString()
            ]);

            autoTable(doc, {
                startY: 20,
                head: [['ID', 'Forma de Pagamento', 'Total', 'Data']],
                body: tableData,
            });

            doc.save("pedidos_prontos.pdf");
        } catch (error) {
            console.error("Erro ao gerar relatório:", error);
            alert("Erro ao gerar relatório PDF.");
        }
    };

    return (
        <div className="flex flex-1 mt-6 flex-col items-center justify-center gap-6">
            <div
                className="text-xl border w-1/4 m-auto text-white mt-4 rounded-lg shadow-md cursor-pointer bg-blue-600 hover:bg-blue-700 text-center xl:p-12 md:p-14 lg:p-12 p-20 flex flex-col items-center justify-center"
                onClick={() => navigate("/admin/cardapio")}
            >
                <p>Configurar Cardápio</p>
                <i className="bi bi-clipboard2-plus text-3xl mt-2"></i>
            </div>
            <div
                className="text-xl border w-1/4 m-auto text-white mt-4 rounded-lg shadow-md cursor-pointer bg-blue-600 hover:bg-blue-700 text-center xl:p-12 md:p-14 lg:p-12 p-20 flex flex-col items-center justify-center"
                onClick={() => navigate("/admin/pedidos")}
            >
                <p>Monitorar Pedidos</p>
                <i className="bi bi-list-check text-3xl mt-2"></i>
            </div>
            <div
                className="text-xl border w-1/4 m-auto text-white mt-4 rounded-lg shadow-md cursor-pointer bg-green-600 hover:bg-green-700 text-center xl:p-12 md:p-14 lg:p-12 p-20 flex flex-col items-center justify-center"
                onClick={gerarRelatorioPDF}
            >
                <p>Gerar Relatório (PDF)</p>
                <i className="bi bi-file-earmark-pdf text-3xl mt-2"></i>
            </div>
        </div>
    )
}