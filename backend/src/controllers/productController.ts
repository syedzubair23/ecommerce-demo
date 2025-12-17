import { Request, Response } from 'express';
import { getProductsFromFile, getProductById } from '../models/productModel';

export const getProducts = (req: Request, res: Response) => {
    try {
        const products = getProductsFromFile();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

export const getProduct = (req: Request, res: Response) => {
    try {
        const product = getProductById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

export const addProduct = (req: Request, res: Response) => {
    try {
        const products = getProductsFromFile();
        const newProduct = {
            id: String(products.length + 1),
            ...req.body
        };
        // Ideally write to file here. For mock, we just return it. 
        // Real implementation would be: 
        // products.push(newProduct);
        // fs.writeFileSync(dbPath, JSON.stringify(products, null, 2));

        // Let's actually write it to make it persistent for the demo!
        const fs = require('fs');
        const path = require('path');
        const dbPath = path.join(__dirname, '../../../database/products.json');

        products.push(newProduct);
        fs.writeFileSync(dbPath, JSON.stringify(products, null, 2));

        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
