import fs from 'fs';
import path from 'path';

const dbPath = path.join(__dirname, '../../../database/users.json');

export interface User {
    id: string;
    email: string;
    password: string; // Plaintext for mock demonstration
    role: 'admin' | 'customer';
    name: string;
}

export const getUsersFromFile = (): User[] => {
    try {
        const data = fs.readFileSync(dbPath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading users file:", error);
        return [];
    }
};

export const findUserByEmail = (email: string): User | undefined => {
    const users = getUsersFromFile();
    return users.find(u => u.email === email);
};
