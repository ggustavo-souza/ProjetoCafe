export default function Cardapio() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Cardápio</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <h3 className="text-xl font-semibold mb-2">Pizza Margherita</h3>
                    <p className="text-gray-600 mb-4">Massa fina, molho de tomate, queijo mozzarella e manjericão.</p>
                    <span className="text-green-500 font-bold">R$ 25,00</span>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4">
                    <h3 className="text-xl font-semibold mb-2">Pizza Margherita</h3>
                    <p className="text-gray-600 mb-4">Massa fina, molho de tomate, queijo mozzarella e manjericão.</p>
                    <span className="text-green-500 font-bold">R$ 25,00</span>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4">
                    <h3 className="text-xl font-semibold mb-2">Pizza Margherita</h3>
                    <p className="text-gray-600 mb-4">Massa fina, molho de tomate, queijo mozzarella e manjericão.</p>
                    <span className="text-green-500 font-bold">R$ 25,00</span>
                </div>  
            </div>
        </div>

    )
}