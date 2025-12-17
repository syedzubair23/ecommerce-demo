import request from 'supertest'; // Tool to test HTTP requests
import express from 'express';
import { getProducts } from '../controllers/productController';
import Product from '../models/productModel';

jest.mock('../models/productModel');

const app = express();
app.get('/products', getProducts);

describe('Product API Tests', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('GET /products should return a list of products', async () => {
        const fakeProducts = [
            { name: 'Laptop', price: 1000 },
            { name: 'Phone', price: 500 }
        ];

        const mockFindChain = {
            limit: jest.fn().mockReturnThis(),
            skip: jest.fn().mockResolvedValue(fakeProducts)
        };

        (Product.find as jest.Mock).mockReturnValue(mockFindChain);

        (Product.countDocuments as jest.Mock).mockResolvedValue(2);

        const response = await request(app).get('/products');
        expect(response.statusCode).toBe(200);

        expect(response.body.products.length).toBe(2);
        expect(response.body.products[0].name).toBe('Laptop');
        expect(response.body.products[1].name).toBe('Phone');
    });
});
