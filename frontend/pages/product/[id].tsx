import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { api } from '@/services/api';
import { Button } from '@/components/ui/Button';

interface Product {
    _id: string;
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
            api.getProductById(id as string)
                .then(data => {
                    setProduct(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) return (
        <>
            <Navbar />
            <div className="container" style={{ marginTop: '2rem' }}>Loading...</div>
        </>
    );

    if (!product) return (
        <>
            <Navbar />
            <div className="container" style={{ marginTop: '2rem' }}>Product not found</div>
        </>
    );

    return (
        <>
            <Navbar />
            <div className="container" style={{ marginTop: '2rem' }}>
                <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
                    <div style={{ flex: '1 1 400px' }}>
                        <img
                            src={product.image}
                            alt={product.name}
                            style={{ width: '100%', height: 'auto', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                        />
                    </div>
                    <div style={{ flex: '1 1 400px' }}>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>{product.name}</h1>
                        <p style={{ fontSize: '1.5rem', color: '#39B54A', fontWeight: '600', marginBottom: '1.5rem' }}>
                            ${product.price ? product.price.toFixed(2) : 'N/A'}
                        </p>

                        <div style={{ marginBottom: '2rem' }}>
                            <span style={{
                                padding: '0.25rem 0.75rem',
                                background: product.availability === 'In Stock' ? '#dcfce7' : '#fee2e2',
                                color: product.availability === 'In Stock' ? '#166534' : '#991b1b',
                                borderRadius: '9999px',
                                fontSize: '0.875rem',
                                fontWeight: '500'
                            }}>
                                {product.availability}
                            </span>
                        </div>

                        <p style={{ fontSize: '1.1rem', color: '#4B5563', lineHeight: '1.6', marginBottom: '2rem' }}>
                            {product.description}
                        </p>

                        <Button
                            disabled={product.availability !== 'In Stock'}
                            style={{
                                fontSize: '1.1rem',
                                padding: '1rem 2rem',
                                opacity: product.availability !== 'In Stock' ? 0.5 : 1
                            }}
                        >
                            {product.availability === 'In Stock' ? 'Add to Cart' : 'Out of Stock'}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
