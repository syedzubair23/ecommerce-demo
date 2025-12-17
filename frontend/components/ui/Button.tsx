import React from 'react';
import styles from '@/styles/Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline' | 'danger';
}

export const Button = ({ variant = 'primary', style, className, ...props }: ButtonProps) => {
    const variantClass = styles[variant] || styles.primary;

    return (
        <button
            className={`${styles.btn} ${variantClass} ${className || ''}`}
            style={style}
            {...props}
        />
    );
};
