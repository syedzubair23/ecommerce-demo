import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/productModel';
import connectDB from './config/db';

dotenv.config();

const products = [
    {
        name: "Wireless Headphones",
        description: "Premium noise-cancelling headphones with long battery life.",
        price: 199.99,
        availability: "In Stock",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60"
    },
    {
        name: "Smart Watch",
        description: "Fitness tracker with heart rate monitor and GPS.",
        price: 149.50,
        availability: "In Stock",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60"
    },
    {
        name: "Laptop Backpack",
        description: "Water-resistant backpack with dedicated laptop compartment.",
        price: 49.99,
        availability: "In Stock",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60"
    },
    {
        name: "Mechanical Keyboard",
        description: "RGB backlit mechanical keyboard with blue switches.",
        price: 89.99,
        availability: "Out of Stock",
        image: "https://images.unsplash.com/photo-1587829741301-dc798b91a05c?w=500&auto=format&fit=crop&q=60"
    },
    {
        name: "Gaming Mouse",
        description: "High precision gaming mouse with programmable buttons.",
        price: 59.99,
        availability: "In Stock",
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&auto=format&fit=crop&q=60"
    },
    {
        name: "4K Monitor",
        description: "27-inch 4K IPS monitor for professional color accuracy.",
        price: 349.00,
        availability: "In Stock",
        image: "https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?w=500&auto=format&fit=crop&q=60"
    },
    {
        name: "Bluetooth Speaker",
        description: "Portable waterproof speaker with 360-degree sound.",
        price: 79.99,
        availability: "In Stock",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop&q=60"
    },
    {
        name: "Mirrorless Camera",
        description: "Compact mirrorless camera with 4K video recording.",
        price: 899.99,
        availability: "In Stock",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=60"
    },
    {
        name: "Camera Lens",
        description: "50mm f/1.8 prime lens for portrait photography.",
        price: 129.99,
        availability: "Out of Stock",
        image: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=500&auto=format&fit=crop&q=60"
    },
    {
        name: "Tripod",
        description: "Lightweight carbon fiber tripod for travel.",
        price: 159.00,
        availability: "In Stock",
        image: "https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?w=500&auto=format&fit=crop&q=60"
    },
    {
        name: "Desk Lamp",
        description: "LED desk lamp with adjustable color temperature.",
        price: 39.99,
        availability: "In Stock",
        image: "https://images.unsplash.com/photo-1534073828943-f801091a7d58?w=500&auto=format&fit=crop&q=60"
    },
    {
        name: "Ergonomic Chair",
        description: "Office chair with lumbar support and mesh back.",
        price: 249.99,
        availability: "In Stock",
        image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=500&auto=format&fit=crop&q=60"
    },
    {
        name: "Wooden Desk",
        description: "Solid oak standing desk with electric height adjustment.",
        price: 599.00,
        availability: "In Stock",
        image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=500&auto=format&fit=crop&q=60"
    },
    {
        name: "Coffee Maker",
        description: "Programmable drip coffee maker 12-cup capacity.",
        price: 45.00,
        availability: "In Stock",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&auto=format&fit=crop&q=60"
    },
    {
        name: "Electric Kettle",
        description: "Fast-boiling electric kettle with temperature control.",
        price: 35.99,
        availability: "In Stock",
        image: "https://images.unsplash.com/photo-1585220177021-d50d535e6931?w=500&auto=format&fit=crop&q=60"
    },
    {
        name: "Running Shoes",
        description: "Lightweight running shoes with superior cushioning.",
        price: 119.99,
        availability: "In Stock",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60"
    },
    {
        name: "Yoga Mat",
        description: "Non-slip eco-friendly yoga mat.",
        price: 25.00,
        availability: "In Stock",
        image: "https://images.unsplash.com/photo-1592432678016-e910b452f9a9?w=500&auto=format&fit=crop&q=60"
    },
    {
        name: "Dumbbell Set",
        description: "Adjustable dumbbell set for home workouts.",
        price: 199.00,
        availability: "Out of Stock",
        image: "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=500&auto=format&fit=crop&q=60"
    },
    {
        name: "Water Bottle",
        description: "Stainless steel vacuum insulated water bottle.",
        price: 19.99,
        availability: "In Stock",
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop&q=60"
    },
    {
        name: "Sunglasses",
        description: "Polarized classic style sunglasses.",
        price: 149.00,
        availability: "In Stock",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&auto=format&fit=crop&q=60"
    }
];

const seedData = async () => {
    try {
        await connectDB();

        await Product.deleteMany({});
        console.log('Products cleared');

        await Product.insertMany(products);
        console.log('20 Products imported!');

        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

seedData();
