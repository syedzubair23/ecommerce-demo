import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { api } from '@/services/api';
import { Button } from '@/components/ui/Button';
import styles from '@/styles/ProductDetail.module.css';

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
            <div className={`container ${styles.container}`}>Loading...</div>
        </>
    );

    if (!product) return (
        <>
            <Navbar />
            <div className={`container ${styles.container}`}>Product not found</div>
        </>
    );

    const isInStock = product.availability === 'In Stock';

    return (
        <>
            <Navbar />
            <div className={`container ${styles.container}`}>
                <div className={styles.backBtn}>
                    <Button variant="outline" onClick={() => router.push('/')}>&larr; Back to Listing</Button>
                </div>
                <div className={styles.productWrapper}>
                    <div className={styles.imageSection}>
                        <img
                            src={product.image}
                            alt={product.name}
                            className={styles.productImage}
                        />
                    </div>
                    <div className={styles.infoSection}>
                        <h1 className={styles.title}>{product.name}</h1>
                        <p className={styles.price}>
                            ${product.price ? product.price.toFixed(2) : '0.00'}
                        </p>

                        <div className={styles.badgeContainer}>
                            <span className={`${styles.badge} ${isInStock ? styles.inStock : styles.outOfStock}`}>
                                {product.availability}
                            </span>
                        </div>

                        <p className={styles.description}>
                            {product.description}
                        </p>

                        <Button
                            disabled={!isInStock}
                            className={`${styles.buyButton} ${!isInStock ? styles.disabled : ''}`}
                            variant={isInStock ? 'primary' : 'outline'}
                        >
                            {isInStock ? 'Add to Cart' : 'Out of Stock'}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
