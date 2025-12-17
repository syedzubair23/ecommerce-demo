import React from 'react';
import styles from '@/styles/Select.module.css';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    options: { value: string; label: string }[];
}

export const Select = ({ label, options, ...props }: SelectProps) => {
    return (
        <div className={styles.container}>
            {label && (
                <label className={styles.label}>
                    {label}
                </label>
            )}
            <select
                className={styles.select}
                {...props}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};
