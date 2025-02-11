import { ReactNode } from "react";

interface ButtonProps {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    color?: "blue" | "red" | "green";
    children: ReactNode;
}

export default function Button({ onClick, color = "blue", children }: ButtonProps) {

    let style: string = "";
    if (color === "blue") style = "bg-blue-400";
    else if (color === "red") style = "bg-red-400";
    else style = "bg-green-400";
    return (
        <button type="button" onClick={onClick}
            className={`px-4 py-2 rounded ${style} text-white`}
        >
            {children}
        </button>
    )
}