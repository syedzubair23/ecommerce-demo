import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    availability: string;
    image: string;
}

export default function ProductDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products/${id}`)
                .then((res) => {
                    if (!res.ok) throw new Error("Not found");
                    return res.json();
                })
                .then((data) => {
                    setProduct(data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) return <div className="container" style={{ marginTop: '2rem' }}>Loading...</div>;
    if (!product) return <div className="container" style={{ marginTop: '2rem' }}>Product not found. <Link href="/">Go Back</Link></div>;

    return (
        <>
            <Navbar />
            <div className="container" style={{ marginTop: '2rem', maxWidth: '800px' }}>
                <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                    <div style={{ height: '400px', background: '#f3f4f6', borderRadius: '8px', overflow: 'Hidden', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={product.image} alt={product.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                    </div>

                    <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>{product.name}</h1>

                    <p style={{ fontSize: '1.25rem', color: '#39B54A', fontWeight: 'bold', marginBottom: '1rem' }}>
                        ${product.price.toFixed(2)}
                    </p>

                    <p style={{ color: '#4b5563', lineHeight: '1.6', marginBottom: '2rem' }}>
                        {product.description}
                    </p>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button className="btn btn-primary" style={{ flex: 1 }}>Add to Cart</button>
                        <Link href="/" className="btn btn-outline" style={{ flex: 1, textDecoration: 'none' }}>Back to Products</Link>
                    </div>
                </div>
            </div>
        </>
    );
}
