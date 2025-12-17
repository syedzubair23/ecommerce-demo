import styles from '@/styles/ProductCard.module.css';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    availability: string;
    image: string;
}

interface ProductCardProps {
    product: Product;
    onViewDetails: (product: Product) => void;
}

import Link from 'next/link';

// ... (interfaces)

export default function ProductCard({ product, onViewDetails }: ProductCardProps) {
    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <img src={product.image} alt={product.name} className={styles.image} />
            </div>
            <div className={styles.content}>
                <Link href={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h3 className={styles.title} style={{ cursor: 'pointer' }}>{product.name}</h3>
                </Link>
                <p className={styles.price}>${product.price.toFixed(2)}</p>
                <div className={styles.actions}>
                    <button
                        className="btn btn-outline"
                        style={{ width: '100%' }}
                        onClick={() => onViewDetails(product)}
                    >
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
}
