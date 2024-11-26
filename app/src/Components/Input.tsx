import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const Input: React.FC<InputProps> = ({
    label,
    error,
    className = '',
    ...props
}) => {
    return (
        <div className="space-y-1">
            {label && (
                <label className="block text-sm font-medium text-gray-300">
                    {label}
                </label>
            )}
            <input
                className={`w-full px-3 py-2 bg-[#1E293B] border border-[#2D3B4E] rounded-md text-white placeholder-gray-400 
        focus:outline-none focus:ring-2 focus:ring-[#E052A0] focus:border-transparent
        ${error ? 'border-red-500' : ''} 
        ${className}`}
                {...props}
            />
            {error && (
                <p className="text-sm text-red-500">{error}</p>
            )}
        </div>
    );
};

export default Input;