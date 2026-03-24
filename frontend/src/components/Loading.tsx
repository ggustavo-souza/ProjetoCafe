// interface loadingProps {
//     tipoLoading: string
// }

export default function LoadingCircle() {
    return (
        <>
            <div className="flex justify-center items-center">
                <div className="w-12 h-12 rounded-full animate-spin border-4 border-solid border-blue-500 border-t-transparent"> </div>
            </div>
            <p className="text-blue-500">Carregando...</p>
        </>

    )
}