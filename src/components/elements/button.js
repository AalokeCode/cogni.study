export default function Button({ backgroundColor, textColor, clickHandler, children }) {
    let background = `bg-${backgroundColor}` || "bg-white"
    return (
        <button onClick={clickHandler} className={`${background} text-${textColor} px-5 py-2.5 rounded-full cursor-pointer`}>
            {children}
        </button>
    )
}