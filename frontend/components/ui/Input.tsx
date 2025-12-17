import React from 'react';
import styles from '@/styles/Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export const Input = ({ label, ...props }: InputProps) => {
    return (
        <div className={styles.container}>
            {label && (
                <label className={styles.label}>
                    {label}
                </label>
            )}
            <input
                className={styles.input}
                {...props}
            />
        </div>
    );
};
