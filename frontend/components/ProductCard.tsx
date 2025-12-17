import styles from '@/styles/ProductCard.module.css';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

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

export default function ProductCard({ product, onViewDetails }: ProductCardProps) {
    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <img src={product.image} alt={product.name} className={styles.image} />
            </div>
            <div className={styles.content}>
                <Link href={`/product/${product.id}`} className={styles.titleLink}>
                    <h3 className={styles.title}>{product.name}</h3>
                </Link>
                <p className={styles.price}>${product.price.toFixed(2)}</p>
                <div className={styles.actions}>
                    <Button
                        variant="outline"
                        className={styles.viewBtn}
                        onClick={() => onViewDetails(product)}
                    >
                        View Details
                    </Button>
                </div>
            </div>
        </div>
    );
}
