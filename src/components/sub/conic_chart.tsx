

const ConicChart = () => {
    return (
        <div className="relative bg-gray-300 rounded-full">
            <div className="absolute w-48 h-48 inset-4 bg-gray-900 rounded-full flex flex-col items-center justify-center border-red-600 border-4">
                <span className="text-xl font-bold text-red-600">500</span>
                <span className="text-base text-red-500">250</span>
            </div>
        </div>
    )
}

export default ConicChart