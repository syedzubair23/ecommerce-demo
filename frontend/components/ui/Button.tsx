import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline' | 'danger';
}

export const Button = ({ variant = 'primary', style, ...props }: ButtonProps) => {
    let baseStyle: React.CSSProperties = {
        padding: '0.75rem 1.5rem',
        borderRadius: '6px',
        fontWeight: 600,
        cursor: 'pointer',
        border: 'none',
        display: 'inline-block',
        textAlign: 'center',
        transition: 'background-color 0.2s',
        fontSize: '1rem',
    };

    if (variant === 'primary') {
        baseStyle = { ...baseStyle, backgroundColor: '#39B54A', color: 'white' };
    } else if (variant === 'outline') {
        baseStyle = { ...baseStyle, backgroundColor: 'white', border: '1px solid #E5E7EB', color: '#1F2937' };
    } else if (variant === 'danger') {
        baseStyle = { ...baseStyle, backgroundColor: '#DC2626', color: 'white' };
    }

    return <button style={{ ...baseStyle, ...style }} {...props} />;
};
