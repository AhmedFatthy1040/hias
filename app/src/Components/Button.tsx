import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
    fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    fullWidth = false,
    className = '',
    ...props
}) => {
    const baseStyles = "px-4 py-2 rounded-md font-semibold transition-all duration-200";
    const variantStyles = {
        primary: "bg-gradient-to-r from-[#E052A0] to-[#4F46E5] text-white hover:opacity-90",
        secondary: "bg-[#1E293B] text-gray-300 hover:text-white"
    };
    const widthStyles = fullWidth ? "w-full" : "";

    return (
        <button
            className={`${baseStyles} ${variantStyles[variant]} ${widthStyles} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;