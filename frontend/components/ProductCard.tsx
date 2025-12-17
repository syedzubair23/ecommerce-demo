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

export default function ProductCard({ product, onViewDetails }: ProductCardProps) {
    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                {/* Using standard img for simplicity with external URLs, could use Next/Image */}
                <img src={product.image} alt={product.name} className={styles.image} />
            </div>
            <div className={styles.content}>
                <h3 className={styles.title}>{product.name}</h3>
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
