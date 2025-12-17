import fs from 'fs';
import path from 'path';

const dbPath = path.join(__dirname, '../../../database/products.json');

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    availability: string;
    image: string;
}

export const getProductsFromFile = (): Product[] => {
    try {
        const data = fs.readFileSync(dbPath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading products file:", error);
        return [];
    }
};

export const getProductById = (id: string): Product | undefined => {
    const products = getProductsFromFile();
    return products.find(p => p.id === id);
};
