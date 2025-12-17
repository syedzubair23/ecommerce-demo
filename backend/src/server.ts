import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import productRoutes from './routes/productRoutes';
import authRoutes from './routes/authRoutes';

dotenv.config();

connectDB();

const app = express();
const port = process.env.PORT || 5231;

app.use(cors());
app.use(express.json());

app.use('/products', productRoutes);
app.use('/auth', authRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Ecommerce API is running');
});

// Seed route for testing (optional, remove in prod)
import Product from './models/productModel';
app.get('/api/seed', async (req, res) => {
    try {
        await Product.deleteMany({});
        const products = [
            { name: "Camera", description: "Nice camera", price: 500, availability: "In Stock", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32" },
            { name: "Lens", description: "Pro lens", price: 300, availability: "In Stock", image: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35" },
            { name: "Tripod", description: "Stable tripod", price: 100, availability: "Out of Stock", image: "https://images.unsplash.com/photo-1527011046414-4781f1f94f8c" }
        ];
        await Product.insertMany(products);
        res.send('Seeded');
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
