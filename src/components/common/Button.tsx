import React from "react";

interface ButtonProps {
    children : React.ReactNode;
    onClick? : () => void;
    disabled? : boolean;
    className? : string;
}

const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    disabled = false,
    className = ""
}) => {
    return (
        <button onClick={onClick} disabled={disabled}
        className={`bg-primary text-24-bold text-white rounded-full ${className}`} >
        {children}
        </button>
    )
}

export default Button;