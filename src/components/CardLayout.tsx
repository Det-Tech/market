const CardLayout = ({title, children, description}) => {
    return (
        <div className="bg-white rounded-lg h-[20vh] w-full p-8 flex flex-col items-start justify-between">
            <h1 className="text-[#666666]">{title}</h1>
            <h1 className="text-4xl font-bold">{description}</h1>
            {children}
        </div>
    )
}

export default CardLayout;