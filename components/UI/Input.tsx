import { ReactNode } from "react";

interface InputProps {
    type: 'text' | 'password' | 'email';
    name?: string;
    placeholder?: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    children?: ReactNode;
}

export default function Input({ type, name, placeholder, value, onChange, children }: InputProps) {
    return (
        <label className="flex flex-col">
            {children}
            <input onChange={onChange} type={type} name={name} placeholder={placeholder} value={value}
                className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:border-gray-500"
            />
        </label>
    )
}