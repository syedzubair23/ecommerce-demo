import { Request, Response } from 'express';
import Product from '../models/productModel';

export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 9;
        const skip = (page - 1) * limit;

        const count = await Product.countDocuments();
        const products = await Product.find({})
            .limit(limit)
            .skip(skip);

        res.json({
            products,
            page,
            pages: Math.ceil(count / limit),
            total: count
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, description, price, availability, image } = req.body;

        const product = await Product.create({
            name,
            description,
            price,
            availability,
            image,
        });

        res.status(201).json(product);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
