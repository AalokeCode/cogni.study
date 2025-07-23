"use client";
import Link from "next/link";
export default function Button({
  backgroundColor,
  textColor,
  clickHandler,
  children,
  isLink,
  url,
  isFullWidth,
}) {
  let background = `bg-${backgroundColor}` || "bg-white";
  return isLink ? (
    <Link
      href={url}
      className={`${background} text-${textColor} px-5 py-2.5 rounded-full cursor-pointer hover:scale-105 transition duration-300 flex items-center gap-3 ${
        isFullWidth ? "w-full" : ""
      }`}
    >
      {children}
    </Link>
  ) : (
    <button
      onClick={clickHandler}
      className={`${background} text-${textColor} px-5 py-2.5 rounded-full cursor-pointer hover:scale-105 transition duration-300 flex items-center gap-3 ${
        isFullWidth ? "w-full" : ""
      }`}
    >
      {children}
    </button>
  );
}
