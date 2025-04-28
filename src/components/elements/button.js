import Link from "next/link";
export default function Button({ backgroundColor, textColor, clickHandler, children, isLink, url }) {
    let background = `bg-${backgroundColor}` || "bg-white"
    return (
        isLink ? <Link href={url} className={`${background} text-${textColor} px-5 py-2.5 rounded-full cursor-pointer hover:scale-105 transition duration-300 flex items-center`}>{children}</Link> :
        (<button onClick={clickHandler} className={`${background} text-${textColor} px-5 py-2.5 rounded-full cursor-pointer hover:scale-105 transition duration-300`}>
            {children}
        </button>)
    )
}