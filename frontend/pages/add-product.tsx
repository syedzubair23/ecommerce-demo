import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/router';
import { api } from '@/services/api';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import styles from '@/styles/AddProduct.module.css';

export default function AddProduct() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        availability: 'In Stock',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop'
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user.role !== 'admin') {
            router.push('/');
        }
    }, []);

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await api.addProduct({
                ...formData,
                price: parseFloat(formData.price)
            });

            if (res.ok) {
                alert('Product added!');
                router.push('/');
            } else {
                alert('Failed to add product');
            }
        } catch (err) {
            console.error(err);
            alert('Error occurred');
        }
    };

    return (
        <>
            <Navbar />
            <div className={`container ${styles.container}`}>
                <div className={styles.backBtn}>
                    <Button variant="outline" onClick={() => router.push('/')}>&larr; Back to Home</Button>
                </div>
                <h1 className={styles.title}>Add New Product</h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <Input
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <div className={styles.textareaContainer}>
                        <label className={styles.label}>Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className={styles.textarea}
                        />
                    </div>
                    <Input
                        label="Price ($)"
                        name="price"
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Image URL"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        required
                    />
                    <Select
                        label="Availability"
                        name="availability"
                        value={formData.availability}
                        onChange={handleChange}
                        options={[
                            { value: 'In Stock', label: 'In Stock' },
                            { value: 'Out of Stock', label: 'Out of Stock' }
                        ]}
                    />
                    <Button type="submit">Add Product</Button>
                </form>
            </div>
        </>
    );
}
